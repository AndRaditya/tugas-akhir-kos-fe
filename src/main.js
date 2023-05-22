import Vue from 'vue'
import App from './App.vue'
import vuetify from '@/plugins/vuetify'
import router from "./router"
import Vuelidate from 'vuelidate'

// import LoginPage from './components/login/login'
import axios from 'axios'

import './registerServiceWorker'

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
            if ( process.env.NODE_ENV == 'development' ) {
                console.log(item);
            }
            // console.log(item);
        },
        confirm(title, message, options) {
            return app.confirm(title, message, options);
        },
        check_pengelola(){
            let param_pengelola;

            if(localStorage.userLogin){
                if(localStorage.userLogin){
                    let localStorageUser = localStorage.getItem('userLogin');
                    let user_login = JSON.parse(localStorageUser);
                    
                    if(user_login.roles_id == 1){
                        param_pengelola = true;
                    }else{
                        param_pengelola = false;
                    }
                }
            }else{
                let path = document.URL.split('/');

                let mainPath = path.splice(0, path.length).join('/');
                // this.$router.push(mainPath + url);
                param_pengelola = mainPath.includes('pengelola');
                this.devLog('mainPath');
                this.devLog(param_pengelola);
            }


            return param_pengelola;
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