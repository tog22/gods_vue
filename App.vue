<template>
	<div id="app">
		<Interface/>
	</div>
</template>

<script>
import Interface from './components/Interface.vue'

export default {
	name: 'App',
	components: {
		Interface
	},
	created() {
		console.log('Firebase cloud messaging object', this.$messaging)
		
		const vapid_token = this.$messaging.getToken({vapidKey: "BACyAFjs1KoHzgCkmXllHlmBBqj6yLbxcJSD4wjxjN-bJKl6zaWSevcaxkanK0RD05GJrPK-1yHodls6kGoaf4w"});
		lo('FCM registration token to add to Firebase console test messaging = ')
		lo(vapid_token)
		
		this.$messaging.onMessage((message) => {
			alert(JSON.stringify(message))
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
