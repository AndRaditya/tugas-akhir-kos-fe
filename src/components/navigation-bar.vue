<template>
      <v-toolbar height="100vh" elevation="0" class="mb-6">
        <v-layout class="px-4">
            <v-layout>
                <!-- <img src="../assets/Frame1.png"> -->
            </v-layout>
            <!-- <v-layout justify-end>
                <v-btn color="#146C94" text elevation="0" @click="dashboard()">Kos</v-btn>
                <v-btn color="#146C94" text elevation="0" @click="login()">Masuk</v-btn>
                <v-btn color="#146C94" outlined elevation="0" @click="register()" class="create-account-btn">Buat Akun</v-btn>
            </v-layout> -->
            <v-layout justify-end>
                <v-btn color="#146C94" text elevation="0" @click="dashboard()">Kos</v-btn>
                <v-btn color="#146C94" text elevation="0" @click="pesanan()">Rincian Pesanan</v-btn>
                <v-btn color="#146C94" text elevation="0" @click="transaksi()">Rincian Transaksi</v-btn>
                <v-btn color="#146C94" outlined elevation="0" @click="profile()" class="create-account-btn">Hai, Andreas</v-btn>
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

  methods:{
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
