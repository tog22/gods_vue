<template>
	<div id="online_simulator">
		<h2>
			Simulate online player
		</h2>
		<div id="online_simulator">
			<p>
				<button @click="receive_move(0)">
					Receive move forward
				</button>
			</p>
			<p>
				<button @click="receive_move(1)">
					Receive move back
				</button>
			</p>
		</div>
	</div>
</template>

<script>
import { bus } from '@/main'


export default {
	name: 'OnlineSimulator',
	methods: {
		receive_move(back = false) {
			let move_info = {
				inspiration: false,
				piece: {
					from_row:	7,
					from_col:	4,
					to_row:		6,
					to_col:		4,
					type:		'mortal',
					side:		2
				}
			}
			if (back) {
				move_info.piece.from_row =  6
				move_info.piece.to_row = 7
			}
			bus.$emit('move', move_info)
		}
	},
	created() {
		bus.$on('test_move_arrow', () => {
			this.receive_move(0);
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
