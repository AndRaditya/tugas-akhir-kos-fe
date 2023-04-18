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

.thin-title{
  font-weight: 500;
  font-size: 30px;
}

.thin-sub-title{
  font-weight: 300;
  font-size: 24px;
}

.main-title{
  font-weight: 700 !important; 
  font-size: 32px !important;
}

.sub-title{
  font-weight: 600; 
  font-size: 20px !important;
}

.paragraph{
  margin: 0 !important;
}

.medium-title{
  font-weight: 500;
  font-size: 32px;
}

.regular-text{
  font-weight: 400;
  font-size: 18px;
}

.thin-regular-text{
  font-weight: 300;
  font-size: 18px;
}

.medium-regular-text{
  font-weight: 500;
  font-size: 18px;
}

.bold-regular-text{
  font-weight: 700;
  font-size: 18px;
}

.bigger-regular-text{
  font-weight: 400;
  font-size: 22px;
}

.thin-bigger-regular-text{
  font-weight: 300;
  font-size: 22px;
}

.medium-bigger-regular-text{
  font-weight: 600;
  font-size: 22px;
}

.bold-bigger-regular-text{
  font-weight: 700;
  font-size: 22px;
}

.small-title{
  font-weight: 500;
  margin-bottom: 6px !important;
  font-size: 22px;
}

.card-regular{
    margin-top: 12px;
    padding: 32px;
}

.belum--verifikasi-pengelola{
    color: #19A7CE;
    border: thin solid #19A7CE;
    border-radius: 2px;
    padding:  6px 24px;
}

.sudah--verifikasi-pengelola{
    color: #fff;
    background-color: #19A7CE;
    border-radius: 2px;
    padding:  6px 24px;
}
</style>
