<template>
	<table class="board">
		<tr  v-for="(row, row_index) in sotw" :key="'r'+row_index">
			<Square 
				v-for="(cell, col_index) in row" 
				:key="'c'+col_index"
				:occupant="cell"
			/>
			<!--<Square/>-->
		</tr>
	</table>
	<!--
		<tr v-for="(row, row_index) in sotw" :key="'r'+row_index">
			<div v-for="(col, col_index) in row" :key="'c'+col_index">
				{{col[0]}}ff
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
	<!-- <table class="board"><tr><td class=""><div class=""></div></td><td class=""><div class="angel baboon ">🐒</div></td><td class=" divinely_inspired "><div class="angel baboon ">🐒</div></td><td class=""><div class="angel baboon ">🐒</div></td><td class=""><div class="angel baboon ">🐒</div></td><td class=""><div class=""></div></td></tr><tr><td class=""><div class=""></div></td><td class=""><div class="mortal baboon ">🐒</div></td><td class=""><div class="mortal baboon ">🐒</div></td><td class=""><div class="mortal baboon ">🐒</div></td><td class=""><div class="mortal baboon ">🐒</div></td><td class=""><div class=""></div></td></tr><tr><td class=""><div class=""></div></td><td class=""><div class=""></div></td><td class=""><div class=""></div></td><td class=""><div class=""></div></td><td class=""><div class=""></div></td><td class=""><div class=""></div></td></tr><tr><td class=""><div class=""></div></td><td class=""><div class=""></div></td><td class=""><div class=""></div></td><td class=""><div class=""></div></td><td class=""><div class=""></div></td><td class=""><div class=""></div></td></tr><tr><td class=""><div class=""></div></td><td class=""><div class=""></div></td><td class=""><div class=""></div></td><td class=""><div class=""></div></td><td class=""><div class=""></div></td><td class=""><div class=""></div></td></tr><tr><td class=""><div class=""></div></td><td class=""><div class=""></div></td><td class=""><div class=""></div></td><td class=""><div class=""></div></td><td class=""><div class=""></div></td><td class=""><div class=""></div></td></tr><tr><td class=""><div class=""></div></td><td class=""><div class=""></div></td><td class=""><div class=""></div></td><td class=""><div class=""></div></td><td class=""><div class=""></div></td><td class=""><div class=""></div></td></tr><tr><td class=""><div class=""></div></td><td class=""><div class="mortal hippo ">🦛</div></td><td class=""><div class="mortal hippo ">🦛</div></td><td class=""><div class="mortal hippo ">🦛</div></td><td class=""><div class="mortal hippo ">🦛</div></td><td class=""><div class=""></div></td></tr><tr><td class=""><div class=""></div></td><td class=""><div class="angel hippo ">🦛</div></td><td class=""><div class="angel hippo ">🦛</div></td><td class=" divinely_inspired "><div class="angel hippo ">🦛</div></td><td class=""><div class="angel hippo ">🦛</div></td><td class=""><div class=""></div></td></tr></table>-->
</template>
<script>
	import Square from './Square.vue';
	
	export default {
		props: {
			
		},
		data() {
			return {
				sotw: [
					[null,['angel','red',null],['angel','red','divinely inspired'],['angel','red',null],['angel','red',null],null],
					[null,['mortal','red',null],['mortal','red',null],['mortal','red',null],['mortal','red',null],null],
					[null,null,null,null,null,null],
					[null,null,null,null,null,null],
					[null,null,null,null,null,null],
					[null,null,null,null,null,null],
					[null,null,null,null,null,null],
					[null,['mortal','black',null],['mortal','black',null],['mortal','black',null],['mortal','black',null],null],
					[null,['angel','black',null],['angel','black',null],['angel','black','divinely inspired'],['angel','black',null],null]
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