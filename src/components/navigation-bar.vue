<template>
  <div>
    <v-toolbar height="100vh" max-width="100%" elevation="0" class="mb-6 pt-2">
      <v-container class="navbar-container pa-0"> 
        <v-layout class="py-4" align-center justify-center>
            <v-layout justify-start align-center>
                <img :src="logo" width="100vw" @click="redirect_router('dashboard')" style="cursor: pointer" v-if="!this.is_booking">
                <p v-if="this.param_pengelola" class="bigger--regular-text__thin paragraph pl-6" style="color: #146C94;">Admin</p>
            </v-layout>
            <v-layout align-center justify-end class="navigation__menu-main">
              <div v-for=" (btn, index) in items" :key="index" class="menu">
                <v-btn color="#146C94" text elevation="0" @click="checkLink(btn.link)" v-if="!btn.outline && !btn.filled && btn.title != 'Transaksi'" >{{ btn.title }}</v-btn>
                <v-btn color="#146C94" outlined elevation="0" @click="checkLink(btn.link)" v-if="btn.outline && !btn.filled && btn.link != 'profile'" class="">{{ btn.title }}</v-btn>
                <v-menu offset-y v-if="btn.title == 'Transaksi'">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn color="#146C94" class="mr-2" text elevation="0" v-bind="attrs" v-on="on">
                      {{ btn.title }} <span class="material-symbols-outlined" style="color: #146C94">expand_more</span>
                    </v-btn>
                  </template>
                  <v-layout column style="background-color: #fff">
                    <div v-for=" (sublink, index) in btn.sublinks" :key="index">
                      <v-btn color="#146C94" class="ma-2" text elevation="0" @click="checkLink(sublink.link)">{{ sublink.title }}</v-btn>
                    </div>
                  </v-layout>
                </v-menu>
                <v-btn color="#146C94" outlined elevation="0" @click="checkLink(btn.link)" v-if="btn.outline && !btn.filled && btn.link == 'profile' && btn.title != 'Transaksi'" class=" mr-2">{{ btn.title }} {{ username }}</v-btn>
                <v-btn color="#146C94" elevation="0" @click="checkLink(btn.link)" v-if="!btn.outline && btn.filled && btn.title != 'Transaksi'" class=" white--text ml-2">{{ btn.title }}</v-btn>
              </div>
            </v-layout>

            <div class="navigation__menu-mobile" v-if="!this.is_booking">
              <span class="material-icons menu-icons" @click.stop="drawer = !drawer">
                menu
              </span>
            </div>
        </v-layout>
      </v-container>
    </v-toolbar>

    <v-navigation-drawer id="app-drawer" fixed temporary v-model="drawer" right>
      <v-toolbar color="#fff" flat id="drawer-header">
      </v-toolbar>
      <v-spacer></v-spacer>
      
      <v-list id="drawer-list" dense nav>
        <div v-for="(item, index) in items" :key="index">
            <v-list-item 
              v-if="!item.sublinks"
              @click="checkLink(item.link)"
              :class="item.class2"
              prepend-icon="mdi-home"
            >
              <v-list-item-icon v-if="item.link != 'profile' && item.link != 'logout' && item.link != 'register'">
                <v-icon class="pr-2">{{ item.icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content class="text-left align-self-start" v-if="item.link != 'logout' && item.link != 'profile' && item.link != 'register'">
                <v-list-item-title  :class="item.class">{{item.title}}</v-list-item-title>
              </v-list-item-content>

              <v-list-item-content class="text-center align-center" v-else-if="item.link == 'profile' && item.link != 'register'">
                <v-list-item-title :class="item.class">{{item.title}} {{ username }} </v-list-item-title>
              </v-list-item-content>

              <v-list-item-content v-else>
                <v-list-item-title v-if="item.link != 'profile'" class="nav-list__title-keluar">{{item.title}}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-group
              v-else
              :value="false"
              class="pl-6"
            >
              <template v-slot:activator >
                <v-list-item-icon >
                  <v-icon class="pr-2">{{item.icon}}</v-icon>
                </v-list-item-icon>
                <v-list-item-title :class="item.class">{{item.title}}</v-list-item-title>
              </template>

              <v-list-item
                v-for="(sublink, i) in item.sublinks"
                :key="i"
                link
                @click="checkLink(sublink.link)"
                class="text-left align-self-start pl-3"
              >
                <v-list-item-icon>
                  <v-icon>{{ sublink.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-title :class="sublink.class">{{ sublink.title }}</v-list-item-title>
              </v-list-item>
            </v-list-group>
        </div>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },

  data(){
    return{
      is_login_customer: false,
      is_login_pengelola: false,
      username: '',
      param_pengelola: false,
      is_booking: false,

      items: [],
      items_menu: [],
      logo: require('../assets/Frame1.png'), 
      logo_drawer: '../assets/Frame1.png',

      drawer: false,
    }
  },

  created(){
    this.initData();
    this.param_pengelola = this.check_pengelola();
  },  
  

  methods:{
    initData(){
      this.checkLogin();
      this.checkBooking();
      this.userName();
      this.buttonItems();
    },

    userName(){
      if(localStorage.userLogin){
        let localStorageUser = localStorage.getItem('userLogin');
        let user_login = JSON.parse(localStorageUser);

        let splitName = user_login.name.split(/(?<=^\S+)\s/);
        this.username = splitName[0];
      }
    },  

    checkBooking(){
      if(localStorage.kosBooking){
        this.is_booking = true
      }
    },

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

      this.devLog('user login');
      this.devLog(this.is_login_customer)
      this.devLog(this.is_login_pengelola)
    },

    logout(){
      if(localStorage.userLogin){
        localStorage.removeItem("userLogin");
        localStorage.removeItem("token");

        this.$router
          .push({ path: '/login' })
          .then(() => { this.$router.go() })
      }
    },  

    login(){
      if(!this.param_pengelola){
        this.$router.push('/login');
      }
      else if(this.param_pengelola){
        this.$router
          .push({ path: '/login' })
          .then(() => { this.$router.go() })
      }
    },

    redirect_router(item){
      this.$router
          .push({ path: '/'+item })
          .then(() => { this.$router.go() })
    },

    dashboardMainKos(){
      this.$router.push('/dashboard/#main_kos')
      localStorage.setItem("justOnce", "false");
    },

    checkLink(item){
      if(item == 'dashboard'){
        this.$router.push('/dashboard/#main_kos')
      }else if(item == 'login'){
        this.login();
      }else if(item == 'logout'){
        this.logout();
      }else{
        this.redirect_router(item);
      }

      localStorage.setItem("justOnce", "false");
    },

    buttonItems(){
      if(!this.is_login_customer && !this.is_login_pengelola && !this.is_booking){
        this.items = [
          {title: 'Kos', link: 'dashboard', outline: false, filled: false, icon: 'sensor_door', class: 'nav-list__title', class2: 'pl-6 pb-1'},
          {title: 'Masuk', link: 'login', outline: false, filled: false, icon: 'login', class: 'nav-list__title', class2: 'pl-6 pb-1'},
          {title: 'Buat Akun', link: 'register', outline: true, filled: false, icon: 'account_circle', class: 'nav-list__title', class2: 'nav-list__btn-keluar mt-2'},
        ];
      }

      if(this.is_login_customer && !this.is_login_pengelola && !this.param_pengelola && !this.is_booking){
        this.items = [
          {title: 'Kos', link: 'dashboard', outline: false, filled: false, icon: 'sensor_door', class: 'nav-list__title', class2: 'pl-6 pb-1'},
          {title: 'Rincian Transaksi', link: 'transaksi', outline: false, filled: false, icon:'receipt', class: 'nav-list__title', class2: 'pl-6 pb-1'},
          {title: 'Hai, ', link: 'profile', outline: true, filled: false, icon: 'account_circle', class: 'nav-list__title', class2: 'mt-4'},
          {title: 'Keluar', link: 'logout', outline: false, filled: true, class: 'nav-list__title-keluar', class2: 'nav-list__btn-keluar mt-2'},
        ];
      }

      if(!this.is_login_customer && this.is_login_pengelola || this.param_pengelola && !this.is_booking){
        this.items = [
          {title: 'Kos', link: 'kos', outline: false, filled: false, icon: 'sensor_door', class: 'nav-list__title' , class2: 'pl-6 pb-1'},
          {title: 'Kamar', link: 'kamar', outline: false, filled: false, icon: 'bed', class: 'nav-list__title' , class2: 'pl-6 pb-1'},
          {title: 'Pesanan', link: 'pengelola-pesanan', outline: false, filled: false, icon:'receipt', class: 'nav-list__title' , class2: 'pl-6 pb-1'},
          {title: 'Transaksi', outline: false, filled: false, icon: 'receipt_long', class: 'nav-list__title nav-list__transaksi pl-2', sublinks: [
            {title: 'Transaksi Masuk', link: 'transaksi-masuk', outline: false, filled: false, icon: 'list_alt', class: 'nav-list__item-menu pl-1'},
            {title: 'Transaksi Keluar', link: 'transaksi-keluar', outline: false, filled: false, icon: 'list_alt', class: 'nav-list__item-menu pl-1'},
            {title: 'Unduh Transaksi', link: 'transaksi-unduh', outline: false, filled: false, icon: 'file_download', class: 'nav-list__item-menu pl-1'},
          ]},
          {title: 'Hai, Pengelola ', link: 'profile', outline: true, filled: false, icon: 'account_circle', class: 'nav-list__title' , class2: 'mt-4'},
          {title: 'Keluar', link: 'logout', outline: false, filled: true, class: 'nav-list__title-keluar', class2: 'nav-list__btn-keluar mt-2'},
        ];
      }
    },


  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h3 {
    margin: 40px 0 0;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }

  .v-toolbar{
    flex: none;
  }

  #drawer-header{
    background: url('../assets/Frame1.png');
    background-repeat: no-repeat;
    background-size: contain;
    background-position-x: center;
    background-position-y: center;
    background-color: black;

    margin: 3.6rem;
    margin-bottom: 36px;
  }

  /* #app-drawer{
    width: 50% !important;
  } */

  .v-toolbar--flat{
    height: 15% !important;
  }

  .v-application--is-ltr .v-list--dense.v-list--nav .v-list-group--no-action > .v-list-group__items > .v-list-item {
    padding: 0 8px;
  }
</style>
