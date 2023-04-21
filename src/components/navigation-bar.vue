<template>
      <v-toolbar height="100vh" elevation="0" class="mb-6">
        <v-layout class="px-4">
            <v-layout>
                <!-- <img src="../assets/Frame1.png"> -->
            </v-layout>

            <v-layout justify-end v-if="!this.is_login_customer && !this.is_login_pengelola">
                <v-btn color="#146C94" text elevation="0" @click="dashboard()">Kos</v-btn>
                <v-btn color="#146C94" text elevation="0" @click="login()">Masuk</v-btn>
                <v-btn color="#146C94" outlined elevation="0" @click="register()" class="create-account-btn">Buat Akun</v-btn>
            </v-layout>

            <!-- Customer Navbar -->
            <v-layout justify-end v-else-if="this.is_login_customer && !this.is_login_pengelola">
                <v-btn color="#146C94" class="mr-2" text elevation="0" @click="dashboard()">Kos</v-btn>
                <v-btn color="#146C94" class="mr-2" text elevation="0" @click="pesanan()">Rincian Pesanan</v-btn>
                <v-btn color="#146C94" class="mr-2" text elevation="0" @click="transaksi()">Rincian Transaksi</v-btn>
                <v-btn color="#146C94" outlined elevation="0" @click="profile()" class="create-account-btn mr-2">Hai, {{ username }}</v-btn>
                <v-btn color="#146C94" elevation="0" @click="logout()" class="create-account-btn white--text ml-2">Keluar</v-btn>
            </v-layout>
        </v-layout>
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
    }
  },

  mounted(){
    this.checkLogin();
    this.userName();
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

        this.$router
          .push({ path: '/login' })
          .then(() => { this.$router.go() })
      }
    },  

    login(){
      this.$router.push('/login');
    },

    dashboard(){
      this.$router.push('/dashboard');
    },
    
    register(){
      this.$router.push('/register');
    },
    
    pesanan(){
      this.$router.push('/pesanan');
    },
    
    transaksi(){
      this.$router.push('/transaksi');
    },

    profile(){
      this.$router.push('/profile')
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
