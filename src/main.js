import Vue from 'vue'
import App from './App.vue'
import vuetify from '@/plugins/vuetify'
import router from "./router"
import Vuelidate from 'vuelidate'
// import axios from 'axios'

Vue.config.productionTip = false

// Vue.prototype.$http = axios;
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

  },
})

new Vue({
  vuetify,
  Vuelidate,
  el: '#app',
  render: h => h(App),


  data(){
    return{
        drawer: false,
        router: router,
    }
  },
  router,
});