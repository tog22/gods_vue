<template>
	<div class="game_world_root">
		<table class="board">
			<tr  v-for="(row, row_index) in sotw" :key="'r'+row_index">
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
		<div class="info_bar">
			<div class="current_player" v-html="current_player_image">
				Current player: {{current_player_image}}
			</div>
		</div>
	</div>
</template>
<script>
	import '@/assets/styles.css';
	
	import Square from './Square.vue';
	
	export default {
		components: {
			Square
		},
		props: {	
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
						return;
					}
					
					// If so, select it
					
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
							this.inspiration_has_moved = true;
							selected.divinely_inspired = false;
							clicked.divinely_inspired = true;
						} else if (selected.occupant === 'mortal') {
							this.piece_has_moved = true;
							selected.occupant = null;
							selected.side = null;
							clicked.occupant = 'mortal';
							clicked.side = this.current_player;
						} else if (selected.occupant === 'angel'){
							this.piece_has_moved = true;
							selected.occupant = null;
							selected.side = null;
							clicked.occupant = 'angel';
							clicked.side = this.current_player;
						}
						
						this.unselect_piece();
						
						// Switch to the other player if appropriate
						
						if (this.piece_has_moved && this.inspiration_has_moved) {
							alert ("Switching to next player")
							switch (this.current_player) {
								case 1:
									this.current_player = 2;
									break;
								case 2:
									this.current_player = 1;
									break;
							}
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
						if (this.is_adjacent_non_diagonally()) {
							return true;
						}
						if (this.is_adjacent_diagonally()) {
							return true;
						}
					} else if (selected.occupant === 'angel') {
						if (this.is_along_a_straight_line(from_row, from_col, to_row, to_col)) {
							return true;
						}
					}
				}
				
				//  2) MOVING DIVINE INSPIRATION
				
				if (selected.divinely_inspired && !this.inspiration_has_moved) {
					if (!dest.side === this.current_player) {
						return false;
					}
					if (this.is_adjacent_non_diagonally(from_row, from_col, to_row, to_col)) {
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
			is_adjacent_non_diagonally() {
				if (this.row_delta === 1 && this.col_delta === 0) {
					return true;
				} else if (this.row_delta === 0 && this.col_delta === 1) {
					return true;
				} else {
					return false;
				}
			},
			is_along_a_straight_line(from_row, from_col, to_row, to_col) {
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
						return true;
					}
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
						return true;
					}
				}
			},
			/***************************
			****************************
			**						  **
			**	   UNSELECT PIECE     **
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
			}
		},
		data() {
			return {
				current_player: 1,
				piece_has_moved: false,
				inspiration_has_moved: false,
				selected_row: null,
				selected_col: null,
				row_delta: null,
				col_delta: null,
				sotw: [
					[
						{
							occupant: null,
							side: null,
							divinely_inspired: false,
							is_selected: ''
						},
						{
							occupant: 'angel',
							side: 1,
							divinely_inspired: false,
							is_selected: ''
						},
						{
							occupant: 'angel',
							side: 1,
							divinely_inspired: true,
							is_selected: ''
						},
						{
							occupant: 'angel',
							side: 1,
							divinely_inspired: false,
							is_selected: ''
						},
						{
							occupant: 'angel',
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
							is_selected: ''
						},
						{
							occupant: 'angel',
							side: 2,
							divinely_inspired: false,
							is_selected: ''
						},
						{
							occupant: 'angel',
							side: 2,
							divinely_inspired: false,
							is_selected: ''
						},
						{
							occupant: 'angel',
							side: 2,
							divinely_inspired: true,
							is_selected: ''
						},
						{
							occupant: 'angel',
							side: 2,
							divinely_inspired: false,
							is_selected: ''
						},
						{
							occupant: null,
							side: null,
							divinely_inspired: false,
							is_selected: ''
						}
					]
				]
			};
		},
		computed: {
			current_player_image: function() {
				switch (this.current_player) {
					case 1:
						return '<span class="cpi baboon">🐒</span>';
					case 2:
						return '<span class="cpi hippo">🦛</span>';
				}
			}
		}
	};
</script>
<style>
	
</style>