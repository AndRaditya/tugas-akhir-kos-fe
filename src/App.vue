<template>
  <v-app>
    <NavBar msg="Welcome to Your Vue.js App"/>
    <router-view class="router-view" align-center></router-view>
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
  @import '../css/style.comp.css';
  @import '../css/main.css';

</style>
