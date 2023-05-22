<template>
  <v-app>
    <nav-bar></nav-bar>
    <router-view class="router-view" align-center></router-view>
    <notif-firebase v-if="is_login_pengelola && !is_login_customer"></notif-firebase>
  </v-app>
</template>

<script>
// import test from './components/test.vue';
import NavBar from './components/navigation-bar.vue';
import NotifFirebase from './notification-firebase.vue';

export default {
  name: 'App',
  components: {
    NavBar,
    NotifFirebase
  },
  data(){
    return{
      is_login_customer: false,
      is_login_pengelola: false,
    }
  },
  created(){
    this.checkLogin();
  },
  methods:{
    checkLogin(){
      if(localStorage.userLogin){
        let localStorageUser = localStorage.getItem('userLogin');
        let user_login = JSON.parse(localStorageUser);
  
        this.devLog(user_login.roles_id)

        if(user_login.roles_id == 1){
          this.is_login_pengelola = true;
          this.is_login_customer = false;
        }else if(user_login.roles_id == 2){
          this.is_login_pengelola = false;
          this.is_login_customer = true;
        }
      }
      else{
        this.is_login_pengelola = false;
        this.is_login_customer = false;
      }

      this.devLog('user login app vue');
      this.devLog(this.is_login_customer)
      this.devLog(this.is_login_pengelola)
    },
  }
}
</script>

<style>
  @import '../css/style.comp.css';
  @import '../css/main.css';

</style>
