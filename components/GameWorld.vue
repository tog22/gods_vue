<template>
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
				if (this.selected_row !== null && this.selected_col) {
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
					
					// Check if it's a valid move
					
					let to_row = row;
					let to_col = col;
					let from_row = this.selected_row;
					let from_col = this.selected_col;
					
					// Calculate the deltas for later use
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
							selected.divinely_inspired = false;
							clicked.divinely_inspired = true;
						} else if (selected.occupant === 'mortal') {
							selected.occupant = null;
							selected.side = null;
							clicked.occupant = 'mortal';
							clicked.side = this.current_player;
						} else if (selected.occupant === 'angel') {
							
						}
						
						// Deselect the square moved from
						
						this.sotw[this.selected_row][this.selected_col].is_selected = '';
						
						// AFTER all other deselection steps, unset the world's selected_row/col state
						
						this.selected_row = null;
						this.selected_col = null;
						
						// Reset the deltas for neatness
						this.row_delta = null;
						this.col_delta = null;
					
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
				
				if (!selected.divinely_inspired && !this.player_has_moved) {
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
			}
		},
		data() {
			return {
				current_player: 'red',
				player_has_moved: false,
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
							side: 'red',
							divinely_inspired: false,
							is_selected: ''
						},
						{
							occupant: 'angel',
							side: 'red',
							divinely_inspired: true,
							is_selected: ''
						},
						{
							occupant: 'angel',
							side: 'red',
							divinely_inspired: false,
							is_selected: ''
						},
						{
							occupant: 'angel',
							side: 'red',
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
							side: 'red',
							divinely_inspired: false,
							is_selected: ''
						},
						{
							occupant: 'mortal',
							side: 'red',
							divinely_inspired: false,
							is_selected: ''
						},
						{
							occupant: 'mortal',
							side: 'red',
							divinely_inspired: false,
							is_selected: ''
						},
						{
							occupant: 'mortal',
							side: 'red',
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
							side: 'black',
							divinely_inspired: false,
							is_selected: ''
						},
						{
							occupant: 'mortal',
							side: 'black',
							divinely_inspired: false,
							is_selected: ''
						},
						{
							occupant: 'mortal',
							side: 'black',
							divinely_inspired: false,
							is_selected: ''
						},
						{
							occupant: 'mortal',
							side: 'black',
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
							side: 'black',
							divinely_inspired: false,
							is_selected: ''
						},
						{
							occupant: 'angel',
							side: 'black',
							divinely_inspired: false,
							is_selected: ''
						},
						{
							occupant: 'angel',
							side: 'black',
							divinely_inspired: true,
							is_selected: ''
						},
						{
							occupant: 'angel',
							side: 'black',
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
		}
	};
</script>
<style>
	
</style>