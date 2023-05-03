import Vue from 'vue';
import Router from 'vue-router';

import LandingPage from './components/landing-page/landing-page'
import Login from './components/login/login'
import UserProfile from './components/profile/user-profile'
import Register from './components/register/register'

import RincianPesananCustomer from './components/customer/pesanan/customer-rincian-pesanan'
import RincianTransaksiCustomer from './components/customer/transaksi/customer-rincian-transaksi'
import RincianPembayaranCustomer from './components/customer/transaksi/customer-rincian-pembayaran'

import PengelolaCruKos from './components/pengelola/kos/cru-pengelola-kos'
import PengelolaPesanan from './components/pengelola/pesanan/pengelola-pesanan'
import PengelolaRincianPesanan from './components/pengelola/pesanan/pengelola-rincian-pesanan'
import PengelolaKamar from './components/pengelola/kamar/list-pengelola-kamar'
import PengelolaRincianKamar from './components/pengelola/kamar/cru-pengelola-kamar'

import PengelolaTransaksiMasuk from './components/pengelola/transaksi-masuk/list-pengelola-transaksi-masuk'
import PengelolaCruTransaksiMasuk from './components/pengelola/transaksi-masuk/cru-pengelola-transaksi-masuk'

import PengelolaTransaksiKeluar from './components/pengelola/transaksi-keluar/list-pengelola-transaksi-keluar'
import PengelolaCruTransaksiKeluar from './components/pengelola/transaksi-keluar/cru-pengelola-transaksi-keluar'

import PengelolaUnduhTransaksi from './components/pengelola/transaksi-unduh/transaksi-unduh'

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
routeArr.push({ title: 'Login', icon: '', path: '/login', component: Login, props:{api: api+'/login'}});
routeArr.push({ title: 'Register', icon: '', path: '/register', component: Register});

// Customer
routeArr.push({ title: 'Rincian Pesanan', icon: '', path: '/pesanan', component: RincianPesananCustomer, props: {api: api + '/kos-booking', apiUser: api + '/users/', apiKamarKosong: api + '/kamar-kosong'}});
routeArr.push({ title: 'Rincian Transaksi', icon: '', path: '/transaksi', component: RincianTransaksiCustomer, props: {api: api + '/kos-booking-users/'}});
routeArr.push({ title: 'Rincian Pembayaran', icon: '', path: '/pembayaran/:id', component: RincianPembayaranCustomer, props:{api: api+'/kos-booking/', apiPengelola: api+'/users-pengelola', apiPembayaran: api+'/kos-booking-pembayaran/'}});
routeArr.push({ title: 'Profile', icon: '', path: '/profile', component: UserProfile, props:{api: api+'/users/', apiPassword: api+'/users'}});


// Pengelola
routeArr.push({ title: 'Dashboard', icon: '', path: '/pengelola', component: LandingPage});
routeArr.push({ title: 'Login', icon: '', path: '/pengelola/login', component: Login, props:{api: api+'/login'}});

routeArr.push({ title: 'Profile', icon: '', path: '/profile', component: UserProfile, props:{api: api+'/users/', apiPassword: api+'/users'}});

routeArr.push({ title: 'Kos', icon: '', path: '/kos', component: PengelolaCruKos, props:{api: api+'/kos/', apiKosFasilitas: api + '/kos-fasilitas', apiPhoto: api + '/kos-photos/'}});
routeArr.push({ title: 'Pesanan', icon: '', path: '/pengelola-pesanan', component: PengelolaPesanan, props:{api: api+'/kos-booking'}});
routeArr.push({ title: 'Rincian Pesanan', icon: '', path: '/pengelola-pesanan/:id', component: PengelolaRincianPesanan, props:{api: api+'/kos-booking/', apiKamarKosong: api + '/kamar-kosong'}});

routeArr.push({ title: 'Kamar', icon: '', path: '/kamar', component: PengelolaKamar, props:{api: api+'/kamar'}});
routeArr.push({ title: 'Kamar', icon: '', path: '/kamar/add', component: PengelolaRincianKamar, props:{api: api+'/kamar', editable: true, ubahNomor: true}});
routeArr.push({ title: 'Kamar', icon: '', path: '/kamar/edit/:id', component: PengelolaRincianKamar, props:{api: api+'/kamar/', editable: true, ubahNomor: false, apiDeletePhoto: api + '/kamar-photos/'}});
routeArr.push({ title: 'Kamar', icon: '', path: '/kamar/:id', component: PengelolaRincianKamar, props:{api: api+'/kamar/', editable: false, ubahNomor: false}});

routeArr.push({ title: 'Transaksi Masuk', icon: '', path: '/transaksi-masuk', component: PengelolaTransaksiMasuk, props:{api: api+'/transaksi-masuk'}});
routeArr.push({ title: 'Transaksi Masuk', icon: '', path: '/transaksi-masuk/add', component: PengelolaCruTransaksiMasuk, props:{api: api+'/transaksi-masuk', editable: true, apiKategori: api + '/transaksi-masuk-kategori'}});
routeArr.push({ title: 'Transaksi Masuk', icon: '', path: '/transaksi-masuk/edit/:id', component: PengelolaCruTransaksiMasuk, props:{api: api+'/transaksi-masuk/', editable: true, apiKategori: api + '/transaksi-masuk-kategori', apiDeletePhoto: api + '/transaksi-masuk-photos/'}});
routeArr.push({ title: 'Transaksi Masuk', icon: '', path: '/transaksi-masuk/:id', component: PengelolaCruTransaksiMasuk, props:{api: api+'/transaksi-masuk/', editable: false, apiKategori: api + '/transaksi-masuk-kategori'}});

routeArr.push({ title: 'Transaksi Keluar', icon: '', path: '/transaksi-keluar', component: PengelolaTransaksiKeluar, props:{api: api+'/transaksi-keluar'}});
routeArr.push({ title: 'Transaksi Keluar', icon: '', path: '/transaksi-keluar/add', component: PengelolaCruTransaksiKeluar, props:{api: api+'/transaksi-keluar', editable: true, apiKategori: api + '/transaksi-keluar-kategori'}});
routeArr.push({ title: 'Transaksi Keluar', icon: '', path: '/transaksi-keluar/edit/:id', component: PengelolaCruTransaksiKeluar, props:{api: api+'/transaksi-keluar/', editable: true, apiKategori: api + '/transaksi-keluar-kategori'}});
routeArr.push({ title: 'Transaksi Keluar', icon: '', path: '/transaksi-keluar/:id', component: PengelolaCruTransaksiKeluar, props:{api: api+'/transaksi-keluar/', editable: false, apiKategori: api + '/transaksi-keluar-kategori'}});

routeArr.push({ title: 'Transaksi Unduh', icon: '', path: '/transaksi-unduh', component: PengelolaUnduhTransaksi, props:{api: api+'/transaksi-keluar/'}});


routeArr.push({ title: 'Page Not Found', name:'404', path:'*', component: {
  template: '<v-content><v-container style="height:100% !important;"><v-layout row class="text-xs-center" justify-center><v-flex class="text-xs-center" id="card" xs12 sm8 md4 align-center>'+
  '<div class="title">404 | Page Not Found</div>'+
  '</v-flex></v-layout></v-container></v-content>'
  },
});


let admRoute = new Router({
    routes: routeArr,
    scrollBehavior (to) {
      if (to.hash) {
        return window.scrollTo({ 
          top: document.querySelector(to.hash).offsetTop, 
          behavior: 'smooth' 
        })
      } else {
        return { x: 0, y: 0 }
      }
    }
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