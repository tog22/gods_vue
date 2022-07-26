<template>
	<div id="app">
		<Interface/>
		<OnlineSimulator />
	</div>
</template>

<script>
import Interface from './components/Interface.vue'
import OnlineSimulator from './components/OnlineSimulator.vue'

import tog from '@/libraries/tog.js'
import { bus } from '@/main'


export default {
	name: 'App',
	components: {
		Interface,
		OnlineSimulator
	},
	created() {
		console.log('Firebase cloud messaging object', this.$messaging)
		
		const vapid_token = this.$messaging.getToken({vapidKey: "BACyAFjs1KoHzgCkmXllHlmBBqj6yLbxcJSD4wjxjN-bJKl6zaWSevcaxkanK0RD05GJrPK-1yHodls6kGoaf4w"});
		lo('FCM registration token to add to Firebase console test messaging = ')
		lo(vapid_token)
		
		this.$messaging.onMessage((message) => {
			let msg_body = fcm_body_to_object(message.notification.body)
			/* Example message to send:
			
				title: 
				Move
				
				body:
				
				{
					"inspiration": false,
					"piece": {
						"from_row":	7,
						"from_col":	4,
						"to_row":		6,
						"to_col":		4,
						"type":		"mortal",
						"side":		2
					}
				}
				
			*/
			switch (message.notification.title) {
				case 'move':
					bus.$emit('move', msg_body)
					break
				default: { // {} to allow `let`
					let alert_text = 'Unknown firebase message received: '+JSON.stringify(message.notification)
					alert(alert_text)
					break
				}
			}
		})
	}
}

function fcm_body_to_object(string) {
	
	string.replace('\"', '"')
	let object = JSON.parse(string)
	return object
	
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
