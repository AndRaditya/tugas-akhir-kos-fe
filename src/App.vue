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
  :root {
      font-size: 10px;
  }

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  .thin-title{
    font-weight: 500;
    font-size: 3rem;
  }

  .thin-sub-title{
    font-weight: 300;
    font-size: 2.4rem;
  }

  .main-title{
    font-weight: 700 !important; 
    font-size: 3.2rem !important;
  }

  .sub-title{
    font-weight: 600; 
    font-size: 2rem !important;
  }

  .paragraph{
    margin: 0 !important;
  }

  .medium-title{
    font-weight: 500;
    font-size: 3.2rem;
  }

  .regular-text{
    font-weight: 400;
    font-size: 1.8rem;
  }

  .thin-regular-text{
    font-weight: 300;
    font-size: 1.8rem;
  }

  .medium-regular-text{
    font-weight: 500;
    font-size: 1.8rem;
  }

  .bold-regular-text{
    font-weight: 700;
    font-size: 1.8rem;
  }

  .bigger-regular-text{
    font-weight: 400;
    font-size: 2.2rem;
  }

  .thin-bigger-regular-text{
    font-weight: 300;
    font-size: 2.2rem;
  }

  .medium-bigger-regular-text{
    font-weight: 600;
    font-size: 2.2rem;
  }

  .bold-bigger-regular-text{
    font-weight: 700;
    font-size: 2.2rem;
  }

  .small-title{
    font-weight: 500;
    margin-bottom: 0.6rem !important;
    font-size: 2.2rem;
  }

  .card-regular{
      margin-top: 1.2rem;
      padding: 3.2rem;
  }

  .belum--verifikasi-pengelola{
      color: #19A7CE;
      border: thin solid #19A7CE;
      border-radius: 0.2rem;
      padding:  0.6rem 2.4rem;
  }

  .sudah--verifikasi-pengelola{
      color: #fff;
      background-color: #19A7CE;
      border-radius: 0.2rem;
      padding:  0.6rem 2.4rem;
  }

  .terkonfirmasi-pengelola{
      color: #fff;
      background-color: #519259;
      border-radius: 0.2rem;
      padding:  0.6rem 2.4rem;
  }

  .dibatalkan-pengelola{
      color: #fff;
      background-color: #DF2E38;
      border-radius: 0.2rem;
      padding:  0.6rem 2.4rem;
  }

  .card-form{
      width: 28vw;
      padding: 4.8rem;
      border-radius: 0.6rem;
      margin-bottom: 1rem;
  }

  .title-paragraph{
      font-size: 2.8rem;
      font-weight: 600;
  }

  .subtitle-paragraph{
      font-weight: 300;
      font-size: 1.8rem;
  }

  .outline-btn{
      border: thin solid #19A7CE;
  }

  .subheading{
    padding: 8rem !important;
    font-size: 1.6rem !important;
  }

  .v-snack__content{
    font-size: 1.4rem !important;
    color: white !important;
  }

  .v-btn__content{
    font-size: 1.6rem;
    font-weight: 400;
    /* padding: 12px 18px; */
  }

  .v-list-item__title{
    font-size: 1.6rem !important;
    font-weight: 400;
  }

  .main-btn{
    padding: 2.4rem 3.2rem !important;
    font-size: 1.6rem;
  }
</style>
