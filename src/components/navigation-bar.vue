<template>
      <v-toolbar height="100vh" max-width="100%" elevation="0" class="mb-6 pt-2">
        <v-container style="width: 90%" class="pa-0"> 
          <v-layout class="px-4 py-4" align-center justify-center>
              <v-layout justify-start align-center>
                  <img :src="logo" width="100vw" @click="redirect_router('dashboard')" style="cursor: pointer">
                  <p v-if="this.param_pengelola" class="thin-bigger-regular-text paragraph pl-6" style="color: #146C94;">Admin</p>
              </v-layout>

              <v-layout justify-end align-center v-if="!this.is_login_customer && !this.is_login_pengelola">
                  <!-- <v-btn color="#146C94" text elevation="0" @click="redirect_router('dashboard/#main_kos')" v-if="!this.param_pengelola">Kos</v-btn> -->
                  <v-btn color="#146C94" text elevation="0" @click="$router.push('/dashboard/#main_kos')" v-if="!this.param_pengelola">Kos</v-btn>
                  <v-btn color="#146C94" text elevation="0" @click="login()">Masuk</v-btn>
                  <v-btn color="#146C94" outlined elevation="0" @click="redirect_router('register')" class="create-account-btn" v-if="!this.param_pengelola">Buat Akun</v-btn>
            </v-layout>

              <!-- Customer Navbar -->
              <v-layout justify-end align-center v-else-if="this.is_login_customer && !this.is_login_pengelola && !this.param_pengelola">
                  <v-btn color="#146C94" class="mr-2" text elevation="0" @click="redirect_router('dashboard/#main_kos')">Kos</v-btn>
                  <!-- <router-link :to="{ name: 'Landing Page', hash: '#main_kos' }">Kos</router-link> -->

                  <v-btn color="#146C94" class="mr-2" text elevation="0" @click="redirect_router('pesanan')">Rincian Pesanan</v-btn>
                  <v-btn color="#146C94" class="mr-2" text elevation="0" @click="redirect_router('transaksi')">Rincian Transaksi</v-btn>
                  <v-btn color="#146C94" outlined elevation="0" @click="redirect_router('profile')" class="create-account-btn mr-2">Hai, {{ username }}</v-btn>
                  <v-btn color="#146C94" elevation="0" @click="logout()" class="create-account-btn white--text ml-2">Keluar</v-btn>
              </v-layout>

              <!-- Pengelola Navbar -->
              <v-layout justify-end align-center v-else-if="!this.is_login_customer && this.is_login_pengelola && this.param_pengelola">
                  <v-btn color="#146C94" class="mr-2" text elevation="0" @click="redirect_router('kos') ()">Kos</v-btn>
                  <v-btn color="#146C94" class="mr-2" text elevation="0" @click="redirect_router('kamar') ()">Kamar</v-btn>
                  <v-btn color="#146C94" class="mr-2" text elevation="0" @click="redirect_router('pengelola-pesanan') ()">Pesanan</v-btn>
                  <v-menu offset-y >
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn color="#146C94" class="mr-2" text elevation="0" v-bind="attrs" v-on="on" >
                        Transaksi <span class="material-symbols-outlined" style="color: #146C94">expand_more</span>
                      </v-btn>
                    </template>
                    <v-layout column style="background-color: #fff">
                      <v-btn color="#146C94" class="ma-2" text elevation="0" @click="redirect_router('transaksi-masuk') ()">Transaksi Masuk</v-btn>
                      <v-btn color="#146C94" class="ma-2" text elevation="0" @click="redirect_router('transaksi-keluar') ()">Transaksi Keluar</v-btn>
                      <v-btn color="#146C94" class="ma-2" text elevation="0" @click="redirect_router('transaksi-unduh') ()">Unduh Transaksi</v-btn>
                    </v-layout>
                  </v-menu>

                  <v-btn color="#146C94" outlined elevation="0" @click="redirect_router('profile')" class="create-account-btn mr-2">Hai, Pengelola {{ username }}</v-btn>
                  <v-btn color="#146C94" elevation="0" @click="logout()" class="create-account-btn white--text ml-2">Keluar</v-btn>
              </v-layout>
          </v-layout>
        </v-container>
    </v-toolbar>
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

      items: [
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me 2' },
      ],

      logo: require('../assets/Frame1.png')
    }
  },

  created(){
    this.checkLogin();
    this.userName();
    this.param_pengelola = this.check_pengelola();
  },  

  methods:{
    userName(){
      if(localStorage.userLogin){
        let localStorageUser = localStorage.getItem('userLogin');
        let user_login = JSON.parse(localStorageUser);

        let splitName = user_login.name.split(/(?<=^\S+)\s/);
        this.username = splitName[0];
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
      // this.$router.push('/'+item);
      this.$router
          .push({ path: '/'+item })
          .then(() => { this.$router.go() })
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
</style>
