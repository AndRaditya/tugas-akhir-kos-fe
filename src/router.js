import Vue from 'vue';
import Router from 'vue-router';

import LandingPage from './components/landing-page/landing-page'
import Login from './components/login/login'
import Register from './components/register/register'
import RincianPesananCustomer from './components/customer/pesanan/rincian-pesanan'
import RincianTransaksiCustomer from './components/customer/transaksi/rincian-transaksi'
import RincianPembayaranCustomer from './components/customer/transaksi/rincian-pembayaran'
import ProfileCustomer from './components/customer/profile/customer-profile'

Vue.use(Router)
var baseUrl = "";

baseUrl = "http://127.0.0.1:8000";

const apiUrl = "/api";
const api = baseUrl+apiUrl;
Vue.mixin({
  data() {
      return {
          API: api,
      }
  },
});

let routeArr = [];
routeArr.push({ title: 'Dashboard', icon: '', path: '/', component: LandingPage});

routeArr.push({ title: 'Dashboard', icon: '', path: '/dashboard', component: LandingPage});
routeArr.push({ title: 'Login', icon: '', path: '/login', component: Login});
routeArr.push({ title: 'Register', icon: '', path: '/register', component: Register});

//Customer
routeArr.push({ title: 'Rincian Pesanan', icon: '', path: '/pesanan', component: RincianPesananCustomer});
routeArr.push({ title: 'Rincian Transaksi', icon: '', path: '/transaksi', component: RincianTransaksiCustomer});
routeArr.push({ title: 'Rincian Pembayaran', icon: '', path: '/pembayaran/:id', component: RincianPembayaranCustomer, props:{api: api+'/kos-booking/', apiPengelola: api+'/users-pengelola', apiPembayaran: api+'/kos-booking-pembayaran/'}});
routeArr.push({ title: 'Profile', icon: '', path: '/profile', component: ProfileCustomer});

routeArr.push({ title: 'Page Not Found', name:'404', path:'*', component: {
  template: '<v-content><v-container style="height:100% !important;"><v-layout row class="text-xs-center" justify-center><v-flex class="text-xs-center" id="card" xs12 sm8 md4 align-center>'+
  '<div class="title">404 | Page Not Found</div>'+
  '</v-flex></v-layout></v-container></v-content>'
  },
});


let admRoute = new Router({
    routes: routeArr
  })

// admRoute.afterEach((to) => {
//     gtag('config', window.GA_TRACKING_ID, {
//         page_location: to.fullPath,
//         page_path: to.fullPath,
//         page_title: to.name,
//         app_name: 'wms',
//         send_page_view: true,
//     });
// });

export default admRoute;