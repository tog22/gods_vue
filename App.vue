<template>
  <div id="app">
    <GameWorld/>
  </div>
</template>

<script>
import GameWorld from './components/GameWorld.vue'

export default {
  name: 'App',
  components: {
    GameWorld
  }
}
</script>

<style>
#app {
  max-width: 400px;
  
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
