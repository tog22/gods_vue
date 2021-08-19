<template>
	<table class="board">
		<tr  v-for="(row, row_index) in sotw" :key="'r'+row_index">
			<Square 
				v-for="(square, col_index) in row" 
				:key="'c'+col_index"
				:square="square"
			/>
			<!--<Square/>-->
		</tr>
	</table>
	<!--
		<tr v-for="(row, row_index) in sotw" :key="'r'+row_index">
			<div v-for="(col, col_index) in row" :key="'c'+col_index">
				{{col[0]}}
			</div>
			<Square/>
			<Square/>
			<Square/>
			<Square/>
			<Square/>
			<Square/>
		</tr>
		<tr>
			<Square/>
			<Square/>
			<Square/>
			<Square/>
			<Square/>
			<Square/>
		</tr>
		<tr>
			<Square/>
			<Square/>
			<Square/>
			<Square/>
			<Square/>
			<Square/>
		</tr>
		<tr>
			<Square/>
			<Square/>
			<Square/>
			<Square/>
			<Square/>
			<Square/>
		</tr>
		<tr>
			<Square/>
			<Square/>
			<Square/>
			<Square/>
			<Square/>
			<Square/>
		</tr>
		<tr>
			<Square/>
			<Square/>
			<Square/>
			<Square/>
			<Square/>
			<Square/>
		</tr>
		<tr>
			<Square/>
			<Square/>
			<Square/>
			<Square/>
			<Square/>
			<Square/>
		</tr>
		<tr>
			<Square/>
			<Square/>
			<Square/>
			<Square/>
			<Square/>
			<Square/>
		</tr>
		<tr>
			<Square/>
			<Square/>
			<Square/>
			<Square/>
			<Square/>
			<Square/>
		</tr>
	</table>	
	-->
	<!-- <table class="board"><tr>
	
	<td class="">
		<div class=""></div>
	</td>
	
	<td class=""><div class="angel baboon ">🐒</div></td><td class=" divinely_inspired "><div class="angel baboon ">🐒</div>
	
	<div class="mortal baboon ">🐒</div>
	
	<div class="mortal hippo ">🦛</div>
	
	<td class=" divinely_inspired ">
		<div class="angel hippo ">
		🦛
		</div>
	</td>
	
	-->
</template>
<script>
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
	
.intro {
	margin-bottom: 4em; /* I love Alik & Papa & Mama */
}

.board {
	border-collapse: collapse;
}

.board td {
	width: 50px;
	height: 50px;
	border: 4px solid black;
	text-align: center;
}

.divinely_inspired {
	background-color: #f2d773;
}

.baboon.angel {
	font-size: 37px;
	position: relative;
	top: 3px;
}

.baboon.mortal {
	font-size: 28px;
	position: relative;
	top: 3px;
}

.hippo.angel {
	font-size: 38px;
	position: relative;
	top: -2px;
}

.hippo.mortal {
	font-size: 28px;
	position: relative;
	top: 0px;
}


</style>