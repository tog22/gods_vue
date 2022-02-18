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
		lo('v_a')
		// console.log(vue_app)
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
