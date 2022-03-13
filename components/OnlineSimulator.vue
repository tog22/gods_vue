<template>
	<div id="online_simulator">
		<h2>
			Simulate online player
		</h2>
		<div id="online_simulator">
			<button @click="receive_move">
				Receive move
			</button>
		</div>
	</div>
</template>

<script>
import { bus } from '@/main'


export default {
	name: 'OnlineSimulator',
	methods: {
		receive_move() {
			alert('Simulating receiving a move')
			let move_info = {
				inspiration: false,
				piece: {
					from_row:	7,
					from_col:	1,
					to_row:		6,
					to_col:		1,
					type:		'mortal',
					side:		2
				}
			}
			bus.$emit('move', move_info)
		}
	},
	created() {
		bus.$on('test_move_arrow', () => {
			this.receive_move();
		})
	}
}

let l = function (to_log) { 
console.log(to_log) 
}

let lo = l

/*
could add:
<div id="tests">
<FirebaseTest/>
</div>

*/
</script>

<style>

</style>
