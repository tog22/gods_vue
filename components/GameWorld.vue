<template>
	<table class="board">
		<tr  v-for="(row, row_index) in sotw" :key="'r'+row_index">
			<Square 
				v-for="(square, col_index) in row" 
					:key="'c'+col_index"
					:square="square"
					:row="row_index"
					:col="col_index"
			/>
			<!--<Square/>-->
		</tr>
	</table>
</template>
<script>
	import '@/assets/styles.css';
	
	import Square from './Square.vue';
	
	export default {
		props: {
			
		},
		data() {
			return {
				sotw: [
					[
						{
							occupant: null,
							side: null,
							divinely_inspired: false
						},
						{
							occupant: 'angel',
							side: 'red',
							divinely_inspired: false
						},
						{
							occupant: 'angel',
							side: 'red',
							divinely_inspired: true
						},
						{
							occupant: 'angel',
							side: 'red',
							divinely_inspired: false
						},
						{
							occupant: 'angel',
							side: 'red',
							divinely_inspired: false
						},
						{
							occupant: null,
							side: null,
							divinely_inspired: false
						},
					],
					[
						{
							occupant: null,
							side: null,
							divinely_inspired: false
						},
						{
							occupant: 'mortal',
							side: 'red',
							divinely_inspired: false
						},
						{
							occupant: 'mortal',
							side: 'red',
							divinely_inspired: false
						},
						{
							occupant: 'mortal',
							side: 'red',
							divinely_inspired: false
						},
						{
							occupant: 'mortal',
							side: 'red',
							divinely_inspired: false
						},
						{
							occupant: null,
							side: null,
							divinely_inspired: false
						},
					],
					[
						{
							occupant: null,
							side: null,
							divinely_inspired: false
						},
						{
							occupant: null,
							side: null,
							divinely_inspired: false
						},
						{
							occupant: null,
							side: null,
							divinely_inspired: false
						},
						{
							occupant: null,
							side: null,
							divinely_inspired: false
						},
						{
							occupant: null,
							side: null,
							divinely_inspired: false
						},
						{
							occupant: null,
							side: null,
							divinely_inspired: false
						},
					],
					[
						{
							occupant: null,
							side: null,
							divinely_inspired: false
						},
						{
							occupant: null,
							side: null,
							divinely_inspired: false
						},
						{
							occupant: null,
							side: null,
							divinely_inspired: false
						},
						{
							occupant: null,
							side: null,
							divinely_inspired: false
						},
						{
							occupant: null,
							side: null,
							divinely_inspired: false
						},
						{
							occupant: null,
							side: null,
							divinely_inspired: false
						},
					],
					[
						{
							occupant: null,
							side: null,
							divinely_inspired: false
						},
						{
							occupant: null,
							side: null,
							divinely_inspired: false
						},
						{
							occupant: null,
							side: null,
							divinely_inspired: false
						},
						{
							occupant: null,
							side: null,
							divinely_inspired: false
						},
						{
							occupant: null,
							side: null,
							divinely_inspired: false
						},
						{
							occupant: null,
							side: null,
							divinely_inspired: false
						},
					],
					[
						{
							occupant: null,
							side: null,
							divinely_inspired: false
						},
						{
							occupant: null,
							side: null,
							divinely_inspired: false
						},
						{
							occupant: null,
							side: null,
							divinely_inspired: false
						},
						{
							occupant: null,
							side: null,
							divinely_inspired: false
						},
						{
							occupant: null,
							side: null,
							divinely_inspired: false
						},
						{
							occupant: null,
							side: null,
							divinely_inspired: false
						},
					],
					[
						{
							occupant: null,
							side: null,
							divinely_inspired: false
						},
						{
							occupant: null,
							side: null,
							divinely_inspired: false
						},
						{
							occupant: null,
							side: null,
							divinely_inspired: false
						},
						{
							occupant: null,
							side: null,
							divinely_inspired: false
						},
						{
							occupant: null,
							side: null,
							divinely_inspired: false
						},
						{
							occupant: null,
							side: null,
							divinely_inspired: false
						},
					],
					[
						{
							occupant: null,
							side: null,
							divinely_inspired: false
						},
						{
							occupant: 'mortal',
							side: 'black',
							divinely_inspired: false
						},
						{
							occupant: 'mortal',
							side: 'black',
							divinely_inspired: false
						},
						{
							occupant: 'mortal',
							side: 'black',
							divinely_inspired: false
						},
						{
							occupant: 'mortal',
							side: 'black',
							divinely_inspired: false
						},
						{
							occupant: null,
							side: null,
							divinely_inspired: false
						},
					],
					[
						{
							occupant: null,
							side: null,
							divinely_inspired: false
						},
						{
							occupant: 'angel',
							side: 'black',
							divinely_inspired: false
						},
						{
							occupant: 'angel',
							side: 'black',
							divinely_inspired: false
						},
						{
							occupant: 'angel',
							side: 'black',
							divinely_inspired: true
						},
						{
							occupant: 'angel',
							side: 'black',
							divinely_inspired: false
						},
						{
							occupant: null,
							side: null,
							divinely_inspired: false
						}
					]
				]
			};
		},
		components: {
			Square
		}
	};
</script>
<style>
	
</style>