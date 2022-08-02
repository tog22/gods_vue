<template>
	<div id="online_simulator">
		<h2>
			Simulate online player
		</h2>
		<h3>
			Opponent's phone triggering FCM
		</h3>
		<div id="online_simulator">
			<p>
				<button @click="opponent_fcm_test('74to64')">
					7-4 ↑ 6-4 [from start]
				</button>
			</p>
			<p>
				<button @click="opponent_fcm_test('64to74')">
					6-4 ↓ 7-4
				</button>
			</p>
			<p>
				<button @click="log_sotw">
					Log SOTW
				</button>
			</p>
		</div>
		<h3>
			Direct move (not via FCM)
		</h3>
		<div id="online_simulator">
			<p>
				<button @click="receive_move(6,1,5,1)">
					6-1 ↑ 5-1 [from start]
				</button>
			</p>
			<p>
				<button @click="receive_move(5,1,6,1)">
					5-1 ↓ 6-1
				</button>
			</p>
			<p>
				<button @click="receive_move(7,4,6,4)">
					7-4 ↑ 6-4 [from start]
				</button>
			</p>
			<p>
				<button @click="receive_move(6,4,7,4)">
					6-4 ↓ 7-4
				</button>
			</p>
			<p>
				<button @click="log_sotw">
					Log SOTW
				</button>
			</p>
		</div>
	</div>
</template>

<script>
import { bus } from '@/main'
import _64to74 from '@/components/OnlineSimulator/64to74'
import _74to64 from '@/components/OnlineSimulator/74to64'

export default {
	name: 'OnlineSimulator',
	methods: {
		
		receive_move(from_row, from_col, to_row, to_col) {
			let move_info = {
				inspiration: false,
				piece: {
					from_row:	from_row,
					from_col:	from_col,
					to_row:		to_row,
					to_col:		to_col,
					type:		'mortal',
					side:		2
				},
				meta: {
					turn:			5,
					current_player: 1
				}
			}
			bus.$emit('move', move_info)
		},
		
		opponent_fcm_test(move) {
			
			if (move === '64to74') {
				lo('_var to emit=')
				lo(_64to74)
				bus.$emit('update_received', _64to74)
			} else if (move === '74to64') {
				lo('_var to emit=')
				lo(_74to64)
				bus.$emit('update_received', _74to64)
			}
			
		},
		
		log_sotw() {
			bus.$emit('log_sotw')
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
