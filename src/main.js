import Vue from 'vue'
import App from './App.vue'
import vuetify from '@/plugins/vuetify'
import router from "./router"
import Vuelidate from 'vuelidate'
// import LoginPage from './components/login/login'
import axios from 'axios'

Vue.config.productionTip = false

Vue.prototype.$http = axios;
// Vue.prototype.$api = 'http://127.0.0.1:8000/api'

router.beforeEach((to, from, next)=>{
    if (!to.matched.length) {
        next({name:"404"});
    } else {
        next();
    }
});

Vue.mixin({
  data() {
      return {
          MENU: {
              PATH: null,
              INDEX: null,
          },
          WINDOW: {
              WIDTH: 0,
              HEIGHT: 0
          },
      }
  },
  methods: {
      devLog(item){
          // if ( process.env.NODE_ENV == 'development' ) {
          //     console.log(item);
          //   }
          console.log(item);
      },
      updateUserLogin(id){
        this.devLog('update user login :::' + id)
        this.$http.get(this.API+"/users/"+id)
        .then(response => {
            // this.devLog("Hasil Check User: " +JSON.stringify(response.data));
            if(response.status == 200){
                if(!!response.data.data && response.data.data.length > 0){
                    app.userLogin = response.data.data[0];
                    localStorage.userLogin = JSON.stringify(app.userLogin);
                }else{
                    app.userLogin = false;
                }
            }else{
                alert(JSON.stringify(response));
                app.userLogin = false;
            }
        }).catch((err) => {
            alert(err)
            // if(!!err.response){
            //     this.showErr(err.response,"Failed");
            // }
            // else{
            //     this.showErr({status:"Code Error", statusText: err});
            // }
        });
    },
  },
})

const app = new Vue({
  vuetify,
  Vuelidate,
  el: '#app',
  render: h => h(App),

  components:{
    // LoginPage,
  },

  data(){
    return{
        drawer: false,
        router: router,
        // login: {
        //     email: "",
        //     password: "",
        //     api: "",
        //     submitOk: function(){},
        // },
    }
  },
  methods:{

  },
  router,
});