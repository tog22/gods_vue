<template>
	<div class="game_world">
		<table class="board">
			<tr v-for="(row, row_index) in sotw" :key="'r'+row_index">
				<Square 
					v-for="(square, col_index) in row" 
						:key="'c'+col_index"
						:square="square"
						:row="row_index"
						:col="col_index"
						:is_selected="sotw[row_index][col_index].is_selected"
						@square_click_emission="square_click"
				/>
			</tr>
		</table>
		<div id="bottom_zone">
			<div id="info_bar">
				<div id="item_flex_container">
					<div class="current_player s_item">
						<span v-html="current_player_image"></span>
					</div>
					<div class="next_turn s_item s_text_only" @click="end_turn">
						<div class="s_text">
							End Turn
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
// import $ from 'jquery'
import '@/assets/styles.css';
import tog from '@/libraries/tog.js'
import { bus } from '@/main'

import Square from './Square.vue';

export default {
	components: {
		Square
	},
	props: {
		online_screen: {
			required: true,
			type: Number
		},
		online: {
			type: Object
		}
	},
	methods: {
		/***************************
		****************************
		**						  **
		**	 BASE CLICK HANDLER   **
		**						  **
		****************************
		***************************/
		square_click(row, col) {
			
			if (this.waiting_online()) {
				alert('Waiting for other player');
				return;
			}
			
			let clicked = this.sotw[row][col];
			
			let is_something_selected;
			if (this.selected_row !== null && this.selected_col !== null) {
				is_something_selected = true;
			} else {
				is_something_selected = false;
			}
			
			// 1) SELECTING PIECES
			if (!is_something_selected) {
				
				// Check if the active side has a piece to select
				
				if (clicked.occupant === null) {
					return;
				}
				
				if (clicked.side !== this.current_player) {
					alert ("It's not this player's turn");
					// ↑ Ideally make the turn indicator flash red instead
					return;
				}
				
				// Check if the relevant thing (a mortal/angel, or divine inspiration) hasn't moved yet
				
				if (clicked.divinely_inspired && this.inspiration_has_moved) {
					return;
				}
				
				if (!clicked.divinely_inspired && this.piece_has_moved) {
					return;
				}
				
				// If conditions above are met, make the selection
				
				this.selected_row = row;
				this.selected_col = col;
				
				this.sotw[row][col].is_selected = 'selected ';
				
			// 2) MOVING SELECTED PIECES
			} else if (is_something_selected) {
				
				let to_row = row;
				let to_col = col;
				let from_row = this.selected_row;
				let from_col = this.selected_col;
				
				// Re-clicking the selected piece, to unselect it
				
				if (to_row === from_row && to_col === from_col) {
					this.unselect_piece();
				}
				
				
				// Check if it's a valid move
				// ...starting by calculating the deltas for later use
				if (to_row > from_row) {
					this.row_delta = to_row - from_row;
				} else {
					this.row_delta = from_row - to_row;
				}
				if (to_col > from_col) {
					this.col_delta = to_col - from_col;
				} else {
					this.col_delta = from_col - to_col;
				}
				
				let selected = this.sotw[from_row][from_col];
				
				if (this.is_valid_move(this.selected_row, this.selected_col, to_row, to_col)) {
					
					// Make the move
					
					if (selected.divinely_inspired) {
						
						this.inspiration_has_moved = true
						selected.divinely_inspired = false
						clicked.divinely_inspired = true
						this.check_for_trap(this.selected_row, this.selected_col)
						this.check_for_reaching_heartland(clicked)
						
					} else if (selected.occupant === 'mortal') {
						
						this.piece_has_moved = true
						selected.occupant = null
						selected.side = null
						clicked.occupant = 'mortal'
						clicked.side = this.current_player
						this.check_for_trap(to_row, to_col)
						
					} else if (selected.occupant === 'angel'){
						this.piece_has_moved = true
						selected.occupant = null
						selected.side = null
						clicked.occupant = 'angel'
						clicked.side = this.current_player
						this.check_for_trap(to_row, to_col)
						
					}
					this.unselect_piece()
					
					// End turn/switch to the other player if appropriate
					
					if (this.piece_has_moved && this.inspiration_has_moved) {
						this.end_turn();
					}
				
				} else {
					alert("Not a valid move");
				}
				
			}
		},
		/***************************
		****************************
		**						  **
		**	 IS THE MOVE VALID?   **
		**						  **
		****************************
		***************************/
		is_valid_move(from_row, from_col, to_row, to_col) {
			
			let selected = this.sotw[from_row][from_col];
			let dest = this.sotw[to_row][to_col];
			
			// Don't count clicks on the same square, to make logic simpler
			
			if ((from_row === to_row) && (from_col === to_col)) {
				return false;
			}
			
			//  1) MOVING MORTALS & ANGELS
			
			if (!selected.divinely_inspired && !this.piece_has_moved) {
				if (dest.occupant !== null) {
					return false;
				}
				if (selected.occupant === 'mortal') {
					if (this.is_adjacent()) {
						return true;
					}
					if (this.is_adjacent_diagonally()) {
						return true;
					}
					if (this.is_hop(from_row, from_col, to_row, to_col)) {
						return true;
					} 
				} else if (selected.occupant === 'angel') {
					if (this.is_along_clear_straight_line(from_row, from_col, to_row, to_col)) {
						return true;
					}
					if (this.is_hop(from_row, from_col, to_row, to_col)) {
						return true;
					} 
				}
			}
			
			//  2) MOVING DIVINE INSPIRATION
			
			if (selected.divinely_inspired && !this.inspiration_has_moved) {
				if (!dest.side === this.current_player) {
					return false;
				}
				if (this.is_along_an_inspiration_path(from_row, from_col, to_row, to_col)) {
					return true;
				}
			}
		},
		is_adjacent_diagonally() {
			if (this.row_delta === 1 && this.col_delta === 1) {
				return true;
			} else {
				return false;
			}
		},
		is_adjacent() {
			if (this.row_delta === 1 && this.col_delta === 0) {
				return true;
			} else if (this.row_delta === 0 && this.col_delta === 1) {
				return true;
			} else {
				return false;
			}
		},
		is_along_clear_straight_line(from_row, from_col, to_row, to_col) {
			// Check if it's not a straight line
			if (this.row_delta !== 0 && this.col_delta !== 0) {
				return false;
			}
			// Check for pieces in between
			if (this.row_delta > 0) {
				let lowest_intermediate;
				let highest_intermediate;
				if (to_row > (from_row+1)) {
					highest_intermediate = to_row - 1;
					lowest_intermediate = from_row + 1;
				} else if (from_row > (to_row+1)) {
					highest_intermediate = from_row - 1;
					lowest_intermediate = to_row + 1;
				} else { // It's just moving 1 square
					return true;
				}
				for (
					let intermediate = lowest_intermediate;
					intermediate <= highest_intermediate;
					intermediate++
				) {
					let intermediate_square = this.sotw[intermediate][from_col];
					if (intermediate_square.occupant) {
						return false;
					}
				}
				return true;
			} else if (this.col_delta > 0) {
				let lowest_intermediate;
				let highest_intermediate;
				if (to_col > (from_col+1)) {
					highest_intermediate = to_col - 1;
					lowest_intermediate = from_col + 1;
				} else if (from_col > (to_col+1)) {
					highest_intermediate = from_col - 1;
					lowest_intermediate = to_col + 1;
				} else { // It's just moving 1 square
					return true;
				}
				for (
					let intermediate = lowest_intermediate;
					intermediate <= highest_intermediate;
					intermediate++
				) {
					let intermediate_square = this.sotw[from_row][intermediate];
					if (intermediate_square.occupant) {
						return false;
					}
				}
				return true;
			}
		},
		is_along_solid_straight_line(from_row, from_col, to_row, to_col) {
			// Check if it's not a straight line
			if (this.row_delta !== 0 && this.col_delta !== 0) {
				return false;
			}
			// Check for pieces in between
			if (this.row_delta > 0) {
				let lowest_intermediate;
				let highest_intermediate;
				if (to_row > (from_row+1)) {
					highest_intermediate = to_row - 1;
					lowest_intermediate = from_row + 1;
				} else if (from_row > (to_row+1)) {
					highest_intermediate = from_row - 1;
					lowest_intermediate = to_row + 1;
				} else { // It's just moving 1 square
					return true;
				}
				for (
					let intermediate = lowest_intermediate;
					intermediate <= highest_intermediate;
					intermediate++
				) {
					let intermediate_square = this.sotw[intermediate][from_col];
					if (!intermediate_square.occupant) {
						return false;
					}
				}
				return true;
			} else if (this.col_delta > 0) {
				let lowest_intermediate;
				let highest_intermediate;
				if (to_col > (from_col+1)) {
					highest_intermediate = to_col - 1;
					lowest_intermediate = from_col + 1;
				} else if (from_col > (to_col+1)) {
					highest_intermediate = from_col - 1;
					lowest_intermediate = to_col + 1;
				} else { // It's just moving 1 square
					return true;
				}
				for (
					let intermediate = lowest_intermediate;
					intermediate <= highest_intermediate;
					intermediate++
				) {
					let intermediate_square = this.sotw[from_row][intermediate];
					if (!intermediate_square.occupant) {
						return false;
					}
				}
				return true;
			}
		},
		
		is_along_an_inspiration_path(from_row, from_col, to_row, to_col) {
			
			let path_trace_tracker = {}
			
			// Create tracker for visited places
			
			let visited = []
			for (var row = 0; row <= 8; row++) {
				visited[row] = []
				for (var col = 0; col <= 5; col++) {
					visited[row][col] = false
				}
			}
			path_trace_tracker.visited = visited
			
			// Start from to row and trace all possible courses, until we're either done or have reached divine inspiration
			
			path_trace_tracker.reached_inspiration = false
			this.trace_adjacent_cells(to_row, to_col, path_trace_tracker)
			
			if (path_trace_tracker.reached_inspiration) {
				return true
			} else {
				return false
			}
			
		},
		
		trace_adjacent_cells(row, col, path_trace_tracker) {
			
			let adjacent_cells = this.get_adjacent_cells(row, col)
			
			// l('____ TRACE ADJACENT TO '+row+'-'+col)
			
			for (var adj of adjacent_cells) {
				
				// l('__IN LOOP FOR '+row+'-'+col)
				// l('checking '+adj.row+'-'+adj.col)
				if (path_trace_tracker.visited[adj.row][adj.col]) { // f1
					// l('…visited')
					continue
				}
				path_trace_tracker.visited[adj.row][adj.col] = true
				
				if (this.sotw[adj.row][adj.col].side !== this.current_player) { // f2
					// l('…empty')
					continue
				}
				
				if (this.sotw[adj.row][adj.col].divinely_inspired) {
					path_trace_tracker.reached_inspiration = true
					// l('••• DIVINE INSPIRATION FOUND •••')
				}
				
				// Otherwise…
				// l('…neither visited nor empty, so starting subtrace')
				this.trace_adjacent_cells(adj.row, adj.col, path_trace_tracker)
				
			}
		},
		
		get_adjacent_cells(row, col) {
			let adjacent_cells = []
			
			if (row !== 0) {
				adjacent_cells.push(
					{
						row: row - 1,
						col: col
					}
				)
			}
			
			if (row !== 8) {
				adjacent_cells.push(
					{
						row: row + 1,
						col: col
					}
				)
			}
			
			if (col !== 0) {
				adjacent_cells.push(
					{
						row: row,
						col: col - 1
					}
				)
			}
			
			if (col !== 5) {
				adjacent_cells.push(
					{
						row: row,
						col: col + 1
					}
				)
			}
						
			return adjacent_cells
			
		},
		
		is_hop(from_row, from_col, to_row, to_col) {
			
			if (this.row_delta > 0 && this.col_delta > 0) {
				return false
			}
			
			var intermediate_piece
			var is_along_column
			var col_direction
			
			if (this.row_delta === 2) {
				var intermediate_row
				if (to_row > from_row) {
					intermediate_row = to_row - 1;
				} else {
					intermediate_row = from_row - 1;
				}
				intermediate_piece = this.sotw[intermediate_row][from_col]
			} else if (this.col_delta === 2) {
				is_along_column = true
				var intermediate_col
				if (to_col > from_col) {
					intermediate_col = to_col - 1;
					col_direction = 'down'
				} else {
					intermediate_col = from_col - 1;
					col_direction = 'up'
				}
				intermediate_piece = this.sotw[from_row][intermediate_col]
			} else {
				return false
			}
			
			if (intermediate_piece.divinely_inspired) {
				return false;
			}
			
			switch (this.current_player) {
				
				case 1:
					if (is_along_column && col_direction === 'up') {
						return false
					}
					if (intermediate_piece.side === 2) {
						return true
					} else {
						return false
					}
				case 2:
				default:
					if (is_along_column && col_direction === 'down') {
						return false
					}
					if (intermediate_piece.side === 1) {
						return true
					} else {
						return false
					}
			}
			
		},
		/***************************
		****************************
		**						  **
		**	   POST-TURN STUFF    **
		**						  **
		****************************
		***************************/
		unselect_piece() {
			// Deselect the square moved from
			this.sotw[this.selected_row][this.selected_col].is_selected = '';
			
			// AFTER all other deselection steps, unset the world's selected_row/col state
			
			this.selected_row = null;
			this.selected_col = null;
			
			// Reset the deltas for neatness
			this.row_delta = null;
			this.col_delta = null;
		},
		check_for_reaching_heartland(moved_to) {
			if (moved_to.heartland === undefined) {
				return
			}
			switch (moved_to.heartland) {
				case 1:
					if (this.current_player === 2) {
						this.winner = 2
						this.win_type = 'Heartland reached'
						bus.$emit('Winner', {
							winner: 2,
							win_type: 'Heartland reached'
						})
					}
					break;
				case 2:
					if (this.current_player === 1) {
						this.winner = 1
						this.win_type = 'Heartland reached'
						bus.$emit('Winner', {
							winner: 1,
							win_type: 'Heartland reached'
						})
					}
					break;
			}
		},
		check_for_trap(to_row, to_col) {
			
			let squares_to_check_for_trap = this.squares_to_check_for_trap(to_row, to_col)
			
			let self = this.current_player
			var opponent
			if (self === 1) {
				opponent = 2
			} else {
				opponent = 1
			}
			for (var square of squares_to_check_for_trap) {
				if (this.sotw[square.adj_row][square.adj_col].side === opponent) {
					
					if (this.sotw[square.next_row][square.next_col].side === self && !this.sotw[square.next_row][square.next_col].divinely_inspired) {
						
						this.sotw[square.adj_row][square.adj_col].occupant = null
						this.sotw[square.adj_row][square.adj_col].side = null
						
						if (this.sotw[square.adj_row][square.adj_col].divinely_inspired) {
							this.winner = this.current_player
							this.win_type = 'Faith extinguished'
							this.sotw[square.adj_row][square.adj_col].divinely_inspired = false
							bus.$emit('Winner', {
								winner: this.current_player,
								win_type: 'Faith extinguished'
							})
						}
						
					}
					
				}
			}
			
		},
		squares_to_check_for_trap(row, col) {
			
			var at_top = false
			var at_bottom = false
			var at_left = false
			var at_right = false
			
			if (row === 0 || row === 1) {
				at_top = true
			}
			if (row === 8 || row === 7) {
				at_bottom = true
			}
			if (col === 5 || col === 4) {
				at_right = true
			}
			if (col === 0 || col  === 1) {
				at_left = true
			}
			
			let squares_to_check_for_trap = []
			// TODO - match new rules
			if (!at_top) {
				squares_to_check_for_trap.push({
					direction: 'row',
					adj_row: row - 1,
					adj_col: col,
					next_row: row - 2,
					next_col: col
				})
			}
			if (!at_bottom) {
				squares_to_check_for_trap.push({
					direction: 'row',
					adj_row: row + 1,
					adj_col: col,
					next_row: row +2, 
					next_col: col
				})
			}
			if (!at_left) {
				squares_to_check_for_trap.push({
					direction: 'col',
					adj_row: row,
					adj_col: col - 1,
					next_row: row,
					next_col: col - 2
				})
			}
			if (!at_right) {
				squares_to_check_for_trap.push({
					direction: 'col',
					adj_row: row,
					adj_col: col + 1,
					next_row: row,
					next_col: col + 2
				})
			}
			
			return squares_to_check_for_trap
			
		},
		
		end_turn() {
			
			switch (this.current_player) {
				case 1:
					this.current_player = 2;
					break;
				case 2:
					this.current_player = 1;
					break;
			}
			l(this.turn)
			this.turn++;
			this.piece_has_moved = false;
			this.inspiration_has_moved = false;
			if (this.selected_row && this.selected_col) {
				this.sotw[this.selected_row][this.selected_col].is_selected = '';
			}
			this.selected_row = null;
			this.selected_col = null;
			this.row_delta = null;
			this.col_delta = null;
			// Pulse animation is added in computed property current_player_image 
			/// (Adding it with jQuery here doesn't work as it then gets overridden there)
			
			if (this.online_game) {
				
				var server_request = new XMLHttpRequest()
				
				let get_url = 'http://gods.philosofiles.com/sync/?action=update&game='+this.online.game_id+'&pw='+this.online.game_pass+'&turn='+this.turn+'&current_player='+this.current_player+'&winner='+this.winner+'&win_type='+this.win_type+'&sotw='+JSON.stringify(this.sotw);
				
				server_request.open("GET", get_url, false) // false = synchronous
				server_request.send()
				
			}
		},
		
		waiting_online() {
			
			if (!this.online_game) {
				return false
			}
			
			if (
				(this.current_player === 1 && this.online.side === 2)
				||
				(this.current_player === 2 && this.online.side === 1)
			) {
				return true
			} else {
				return false
			}
			
		}
		
	},
	data() {
		{
			
			var turn
			var sotw
			var current_player
			
			if (this.online_screen) {
				
				var server_request = new XMLHttpRequest()
					
				let get_url = 'http://gods.philosofiles.com/sync/?action=get&game='+this.online.game_id+'&pw='+this.online.game_pass
				
				server_request.open("GET", get_url, false) // false = synchronous
				server_request.send()
				
				const response = JSON.parse(server_request.responseText)				
				
				turn = response.turn
				current_player = response.current_player
				sotw = response.sotw
				
				
			} else if (!this.online_screen) {
				
				turn = 1
				current_player = 1
				sotw =
				[
					[
						{
							occupant: null,
							side: null,
							divinely_inspired: false,
							is_selected: '',
							heartland: 1
						},
						{
							occupant: 'angel',
							side: 1,
							divinely_inspired: false,
							is_selected: '',
							heartland: 1
						},
						{
							occupant: 'angel',
							side: 1,
							divinely_inspired: true,
							is_selected: '',
							heartland: 1
						},
						{
							occupant: 'angel',
							side: 1,
							divinely_inspired: false,
							is_selected: '',
							heartland: 1
						},
						{
							occupant: 'angel',
							side: 1,
							divinely_inspired: false,
							is_selected: '',
							heartland: 1
						},
						{
							occupant: null,
							side: null,
							divinely_inspired: false,
							is_selected: '',
							heartland: 1
						},
					],
					[
						{
							occupant: null,
							side: null,
							divinely_inspired: false,
							is_selected: ''
						},
						{
							occupant: 'mortal',
							side: 1,
							divinely_inspired: false,
							is_selected: ''
						},
						{
							occupant: 'mortal',
							side: 1,
							divinely_inspired: false,
							is_selected: ''
						},
						{
							occupant: 'mortal',
							side: 1,
							divinely_inspired: false,
							is_selected: ''
						},
						{
							occupant: 'mortal',
							side: 1,
							divinely_inspired: false,
							is_selected: ''
						},
						{
							occupant: null,
							side: null,
							divinely_inspired: false,
							is_selected: ''
						},
					],
					[
						{
							occupant: null,
							side: null,
							divinely_inspired: false,
							is_selected: ''
						},
						{
							occupant: null,
							side: null,
							divinely_inspired: false,
							is_selected: ''
						},
						{
							occupant: null,
							side: null,
							divinely_inspired: false,
							is_selected: ''
						},
						{
							occupant: null,
							side: null,
							divinely_inspired: false,
							is_selected: ''
						},
						{
							occupant: null,
							side: null,
							divinely_inspired: false,
							is_selected: ''
						},
						{
							occupant: null,
							side: null,
							divinely_inspired: false,
							is_selected: ''
						},
					],
					[
						{
							occupant: null,
							side: null,
							divinely_inspired: false,
							is_selected: ''
						},
						{
							occupant: null,
							side: null,
							divinely_inspired: false,
							is_selected: ''
						},
						{
							occupant: null,
							side: null,
							divinely_inspired: false,
							is_selected: ''
						},
						{
							occupant: null,
							side: null,
							divinely_inspired: false,
							is_selected: ''
						},
						{
							occupant: null,
							side: null,
							divinely_inspired: false,
							is_selected: ''
						},
						{
							occupant: null,
							side: null,
							divinely_inspired: false,
							is_selected: ''
						},
					],
					[
						{
							occupant: null,
							side: null,
							divinely_inspired: false,
							is_selected: ''
						},
						{
							occupant: null,
							side: null,
							divinely_inspired: false,
							is_selected: ''
						},
						{
							occupant: null,
							side: null,
							divinely_inspired: false,
							is_selected: ''
						},
						{
							occupant: null,
							side: null,
							divinely_inspired: false,
							is_selected: ''
						},
						{
							occupant: null,
							side: null,
							divinely_inspired: false,
							is_selected: ''
						},
						{
							occupant: null,
							side: null,
							divinely_inspired: false,
							is_selected: ''
						},
					],
					[
						{
							occupant: null,
							side: null,
							divinely_inspired: false,
							is_selected: ''
						},
						{
							occupant: null,
							side: null,
							divinely_inspired: false,
							is_selected: ''
						},
						{
							occupant: null,
							side: null,
							divinely_inspired: false,
							is_selected: ''
						},
						{
							occupant: null,
							side: null,
							divinely_inspired: false,
							is_selected: ''
						},
						{
							occupant: null,
							side: null,
							divinely_inspired: false,
							is_selected: ''
						},
						{
							occupant: null,
							side: null,
							divinely_inspired: false,
							is_selected: ''
						},
					],
					[
						{
							occupant: null,
							side: null,
							divinely_inspired: false,
							is_selected: ''
						},
						{
							occupant: null,
							side: null,
							divinely_inspired: false,
							is_selected: ''
						},
						{
							occupant: null,
							side: null,
							divinely_inspired: false,
							is_selected: ''
						},
						{
							occupant: null,
							side: null,
							divinely_inspired: false,
							is_selected: ''
						},
						{
							occupant: null,
							side: null,
							divinely_inspired: false,
							is_selected: ''
						},
						{
							occupant: null,
							side: null,
							divinely_inspired: false,
							is_selected: ''
						},
					],
					[
						{
							occupant: null,
							side: null,
							divinely_inspired: false,
							is_selected: ''
						},
						{
							occupant: 'mortal',
							side: 2,
							divinely_inspired: false,
							is_selected: ''
						},
						{
							occupant: 'mortal',
							side: 2,
							divinely_inspired: false,
							is_selected: ''
						},
						{
							occupant: 'mortal',
							side: 2,
							divinely_inspired: false,
							is_selected: ''
						},
						{
							occupant: 'mortal',
							side: 2,
							divinely_inspired: false,
							is_selected: ''
						},
						{
							occupant: null,
							side: null,
							divinely_inspired: false,
							is_selected: ''
						},
					],
					[
						{
							occupant: null,
							side: null,
							divinely_inspired: false,
							is_selected: '',
							heartland: 2
						},
						{
							occupant: 'angel',
							side: 2,
							divinely_inspired: false,
							is_selected: '',
							heartland: 2
						},
						{
							occupant: 'angel',
							side: 2,
							divinely_inspired: false,
							is_selected: '',
							heartland: 2
						},
						{
							occupant: 'angel',
							side: 2,
							divinely_inspired: true,
							is_selected: '',
							heartland: 2
						},
						{
							occupant: 'angel',
							side: 2,
							divinely_inspired: false,
							is_selected: '',
							heartland: 2
						},
						{
							occupant: null,
							side: null,
							divinely_inspired: false,
							is_selected: '',
							heartland: 2
						}
					]
				]
				/*
				//
				// Default start =
				//
				
				[
					[
						{
							occupant: null,
							side: null,
							divinely_inspired: false,
							is_selected: '',
							heartland: 1
						},
						{
							occupant: 'angel',
							side: 1,
							divinely_inspired: false,
							is_selected: '',
							heartland: 1
						},
						{
							occupant: 'angel',
							side: 1,
							divinely_inspired: true,
							is_selected: '',
							heartland: 1
						},
						{
							occupant: 'angel',
							side: 1,
							divinely_inspired: false,
							is_selected: '',
							heartland: 1
						},
						{
							occupant: 'angel',
							side: 1,
							divinely_inspired: false,
							is_selected: '',
							heartland: 1
						},
						{
							occupant: null,
							side: null,
							divinely_inspired: false,
							is_selected: '',
							heartland: 1
						},
					],
					[
						{
							occupant: null,
							side: null,
							divinely_inspired: false,
							is_selected: ''
						},
						{
							occupant: 'mortal',
							side: 1,
							divinely_inspired: false,
							is_selected: ''
						},
						{
							occupant: 'mortal',
							side: 1,
							divinely_inspired: false,
							is_selected: ''
						},
						{
							occupant: 'mortal',
							side: 1,
							divinely_inspired: false,
							is_selected: ''
						},
						{
							occupant: 'mortal',
							side: 1,
							divinely_inspired: false,
							is_selected: ''
						},
						{
							occupant: null,
							side: null,
							divinely_inspired: false,
							is_selected: ''
						},
					],
					[
						{
							occupant: null,
							side: null,
							divinely_inspired: false,
							is_selected: ''
						},
						{
							occupant: null,
							side: null,
							divinely_inspired: false,
							is_selected: ''
						},
						{
							occupant: null,
							side: null,
							divinely_inspired: false,
							is_selected: ''
						},
						{
							occupant: null,
							side: null,
							divinely_inspired: false,
							is_selected: ''
						},
						{
							occupant: null,
							side: null,
							divinely_inspired: false,
							is_selected: ''
						},
						{
							occupant: null,
							side: null,
							divinely_inspired: false,
							is_selected: ''
						},
					],
					[
						{
							occupant: null,
							side: null,
							divinely_inspired: false,
							is_selected: ''
						},
						{
							occupant: null,
							side: null,
							divinely_inspired: false,
							is_selected: ''
						},
						{
							occupant: null,
							side: null,
							divinely_inspired: false,
							is_selected: ''
						},
						{
							occupant: null,
							side: null,
							divinely_inspired: false,
							is_selected: ''
						},
						{
							occupant: null,
							side: null,
							divinely_inspired: false,
							is_selected: ''
						},
						{
							occupant: null,
							side: null,
							divinely_inspired: false,
							is_selected: ''
						},
					],
					[
						{
							occupant: null,
							side: null,
							divinely_inspired: false,
							is_selected: ''
						},
						{
							occupant: null,
							side: null,
							divinely_inspired: false,
							is_selected: ''
						},
						{
							occupant: null,
							side: null,
							divinely_inspired: false,
							is_selected: ''
						},
						{
							occupant: null,
							side: null,
							divinely_inspired: false,
							is_selected: ''
						},
						{
							occupant: null,
							side: null,
							divinely_inspired: false,
							is_selected: ''
						},
						{
							occupant: null,
							side: null,
							divinely_inspired: false,
							is_selected: ''
						},
					],
					[
						{
							occupant: null,
							side: null,
							divinely_inspired: false,
							is_selected: ''
						},
						{
							occupant: null,
							side: null,
							divinely_inspired: false,
							is_selected: ''
						},
						{
							occupant: null,
							side: null,
							divinely_inspired: false,
							is_selected: ''
						},
						{
							occupant: null,
							side: null,
							divinely_inspired: false,
							is_selected: ''
						},
						{
							occupant: null,
							side: null,
							divinely_inspired: false,
							is_selected: ''
						},
						{
							occupant: null,
							side: null,
							divinely_inspired: false,
							is_selected: ''
						},
					],
					[
						{
							occupant: null,
							side: null,
							divinely_inspired: false,
							is_selected: ''
						},
						{
							occupant: null,
							side: null,
							divinely_inspired: false,
							is_selected: ''
						},
						{
							occupant: null,
							side: null,
							divinely_inspired: false,
							is_selected: ''
						},
						{
							occupant: null,
							side: null,
							divinely_inspired: false,
							is_selected: ''
						},
						{
							occupant: null,
							side: null,
							divinely_inspired: false,
							is_selected: ''
						},
						{
							occupant: null,
							side: null,
							divinely_inspired: false,
							is_selected: ''
						},
					],
					[
						{
							occupant: null,
							side: null,
							divinely_inspired: false,
							is_selected: ''
						},
						{
							occupant: 'mortal',
							side: 2,
							divinely_inspired: false,
							is_selected: ''
						},
						{
							occupant: 'mortal',
							side: 2,
							divinely_inspired: false,
							is_selected: ''
						},
						{
							occupant: 'mortal',
							side: 2,
							divinely_inspired: false,
							is_selected: ''
						},
						{
							occupant: 'mortal',
							side: 2,
							divinely_inspired: false,
							is_selected: ''
						},
						{
							occupant: null,
							side: null,
							divinely_inspired: false,
							is_selected: ''
						},
					],
					[
						{
							occupant: null,
							side: null,
							divinely_inspired: false,
							is_selected: '',
							heartland: 2
						},
						{
							occupant: 'angel',
							side: 2,
							divinely_inspired: false,
							is_selected: '',
							heartland: 2
						},
						{
							occupant: 'angel',
							side: 2,
							divinely_inspired: false,
							is_selected: '',
							heartland: 2
						},
						{
							occupant: 'angel',
							side: 2,
							divinely_inspired: true,
							is_selected: '',
							heartland: 2
						},
						{
							occupant: 'angel',
							side: 2,
							divinely_inspired: false,
							is_selected: '',
							heartland: 2
						},
						{
							occupant: null,
							side: null,
							divinely_inspired: false,
							is_selected: '',
							heartland: 2
						}
					]
				]
				*/
			}
			
			return {
				turn: 					1,
				current_player: 		current_player,
				piece_has_moved: 		false,
				inspiration_has_moved: 	false,
				selected_row: 			null,
				selected_col: 			null,
				row_delta: 				null,
				col_delta: 				null,
				winner:					null,
				win_type: 				null,
				online_game:			true, // this.online_screen
				sotw: 					sotw,
			};
		}
	},
	computed: {
		
		current_player_image: function() {
			switch (this.current_player) {
				case 1:
					return '<span class="cpi baboon player_pulse">🐒</span>';
				case 2:
					return '<span class="cpi hippo">🦛</span>';
				default:
					return 'Unset: this.current_player'
			}
		},
		
		which_screen: function() {
			if (this.winner) {
				return 'won'
			} else {
				return 'active'
			}
		},
		
		type_of_victory: function() {
			if (this.win_type === 'Faith extinguished') {
				return 'The opposing faith was extinguished, leaving the path clear for the conversion of its former believers'
			} else if (this.win_type === 'Heartland reached') {
				return "A divinely inspired monk or abbot reaches the other side's heartland, and begins to convert its populace to the one true faith"
			} else {
				return 'The one true faith prevails'
				// ↑ A fallback, not actually used
			}
		},
		
		is_in_dev: function() {
			return 'dev' // 'dev'
		}
		
	}
};

let l = function (to_log) { 
	console.log(to_log) 
}

let lo = l

</script>
<style>

</style>