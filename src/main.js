import Vue from 'vue'
import App from './App.vue'
import vuetify from '@/plugins/vuetify'
import router from "./router"
import Vuelidate from 'vuelidate'
import AOS from 'aos'
import 'aos/dist/aos.css'

// import LoginPage from './components/login/login'
import axios from 'axios'

import './registerServiceWorker'

Vue.config.productionTip = false

Vue.prototype.$http = axios;


router.beforeEach((to, from, next)=>{
    const isAuthenticated = JSON.parse(localStorage.getItem('authenticated'));
    // if(to.name !== "Login" || to.name !== "Dashboard" || to.name !== "Register" && !isAuthenticated) next({name: "Login"});

    if(!localStorage.getItem('authenticated')){
        localStorage.setItem('authenticated', false);
    }

    // if((to.name !== "Login" && to.name !== "Dashboard" && to.name !== "Register") && !isAuthenticated) next({name: "Login"});
    if((to.path !== "/login" && to.path !== "/dashboard" && to.path !== "/dashboard/" && to.path !== "/register") && !isAuthenticated) next({name: "Login"});
    // if((to.name === "Login" || to.name === "Register") && isAuthenticated) next({name: "Dashboard"});
    if((to.path === "/login" || to.path === "/register") && isAuthenticated) next({name: "Dashboard"});
    else next();


    // }else{
    //     if(to.name !== "Login" && to.name !== "Dashboard" && to.name !== "Register") next({name: "Login"});
    // }
    // if (!to.matched.length) {
    //     next({name:"404"});
    // } else {
    //     next();
    // }
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
        formatPrice(n) {
            return  Number(n).toFixed(0).replace(/./g, function(c, i, a) {
                return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "." + c : c;
            });
        },
        // confirm(title, message, options) {
        //     return app.confirm(title, message, options);
        // },
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

app.AOS = new AOS.init();
