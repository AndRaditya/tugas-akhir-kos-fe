<template>
  <v-app>
    <NavBar msg="Welcome to Your Vue.js App"/>
    <router-view></router-view>
  </v-app>
</template>

<script>
// import test from './components/test.vue';
import NavBar from './components/navigation-bar.vue';

export default {
  name: 'App',
  components: {
    NavBar
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
