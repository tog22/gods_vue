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
			<!--<Square/>-->
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
			square_click(row, col) {
				
				let clicked = this.sotw[row][col];
				
				let is_something_selected;
				if (this.selected_row !== null && this.selected_col) {
					is_something_selected = true;
				} else {
					is_something_selected = false;
				}
				
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
					
				} else if (is_something_selected) {
					
					// Check if it's a valid move
					
					let target_row = row;
					let target_col = col;
					alert('Trying to move to '+row+'-'+col);
					
					// If so, do it and deselect the square moved form
					
					
					// Deselect the square moved from
					
					let selstate;
					selstate = this.sotw[this.selected_row][this.selected_col].is_selected;
					alert("Initially selected square's .is_selected property: "+selstate);
					this.sotw[this.selected_row][this.selected_col].is_selected = '';
					selstate = this.sotw[this.selected_row][this.selected_col].is_selected;
					alert("Initially selected square's .is_selected property, after change: "+selstate);
					
					// AFTER all other deselection steps, unset the world's selected_row/col state
					
					this.selected_row = null;
					this.selected_col = null;
					
					
				}
				
				this.is_valid_move(row,col,row+1,col+1);
			},
			is_valid_move(from_row, from_col, to_row, to_col) {
				
				let clicked = this.sotw[from_row][from_col];
				let dest = this.sotw[to_row][to_col];
				
				let row_delta;
				if (to_row > from_row) {
					row_delta = to_row - from_row;
				} else {
					row_delta = from_row - to_row;
				}
				
				let col_delta;
				if (to_col > from_col) {
					col_delta = to_col - from_col;
				} else {
					col_delta = from_col - to_col;
				}
				
				// Don't count clicks on the same square, to make logic simpler
				
				if ((from_row === to_row) && (from_col === to_col)) {
					return false;
				}
				
				// 1) Check if the occupant isn't divinely inspired, and no mortal or angel has moved this turn
				
				if (!clicked.divinely_inspired && !this.player_has_moved) {
					
				}
				
				// 2) Check if the piece is divinely inspired, and divine inspiration hasn't moved this turn
				
				if (clicked.divinely_inspired && !this.inspiration_has_moved) {
					if (!dest.side === this.current_player) {
						return false;
					}
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