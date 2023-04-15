<template>
      <v-toolbar height="100vh" elevation="0" >
        <v-layout class="px-4">
            <v-layout>
                <!-- <img src="../assets/Frame1.png"> -->
            </v-layout>
            <v-layout justify-end>
                <v-btn color="#146C94" text elevation="0" @click="dashboard()">Kos</v-btn>
                <v-btn color="#146C94" text elevation="0" @click="login()">Masuk</v-btn>
                <v-btn color="#146C94" outlined elevation="0" @click="register()" class="create-account-btn">Buat Akun</v-btn>
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
    }
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
</style>
