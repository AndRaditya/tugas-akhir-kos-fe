<template>
    <!-- <v-main> -->
        <v-container grid-list-md class="pt-0" v-if="ready">
            <v-layout align-start>
                <p class="thin-title paragraph">Rincian Pesanan</p>
            </v-layout>
            <v-layout column class="layout-main" mt-6 v-if="this.model_ready">
                <v-layout align-start row> 
                    <v-flex xs7>
                        <v-layout column>
                            <v-card class="card-pesanan">
                                <v-layout align-start class="pb-4">
                                    <p class="medium-bigger-regular-text paragraph">Rincian Pemesan</p>
                                </v-layout>
                                <hr>
                                <v-layout row align-start class="pt-4">
                                    <v-layout column align-start>
                                        <p class="thin-regular-text ">Nama Lengkap</p>
                                        <p class="thin-regular-text ">Nomor Telepon</p>
                                        <p class="thin-regular-text ">Email</p>
                                    </v-layout>
                                    <v-layout column align-start class="ma-0">
                                        <p class="mb-3 medium-regular-text">{{ user_model.name }}</p>
                                        <p class="mb-3 medium-regular-text">{{ user_model.phone_number }}</p>
                                        <p class="mb-3 medium-regular-text">{{ user_model.email }}</p>
                                    </v-layout>
                                </v-layout>

                            </v-card>
                            <v-card class="card-pesanan">
                                <v-layout column>
                                    <v-layout row class="layout-price-bg">
                                        <v-flex xs6>
                                            <v-layout column align-start>
                                                <p class="thin-regular-text ">Harga Kamar Bulanan</p>
                                                <p class="thin-regular-text ">Biaya Pesanan</p>
                                            </v-layout>
                                        </v-flex>
                                        <v-flex xs6>
                                            <v-layout column align-start>
                                                <p class="mb-3 medium-regular-text">Rp1.500.000</p>
                                                <p style="color: #19A7CE;" class="bold-regular-text">Gratis</p>
                                            </v-layout>
                                        </v-flex>
                                    </v-layout>

                                    <v-layout row align-start class="mt-6">
                                        <v-flex xs6>
                                            <v-layout column align-start>
                                                <p class="thin-regular-text ">Total Biaya</p>
                                            </v-layout>
                                        </v-flex>
                                        <v-flex xs6>
                                            <v-layout column align-start>
                                                <p class="mb-3 medium-regular-text">Rp{{ total_price }}</p>
                                            </v-layout>
                                        </v-flex>
                                    </v-layout>

                                    <v-btn color="#146C94" width="30%" class="white--text" @click="submitForm()">Pesan</v-btn>

                                    <v-layout column align-start mt-12>
                                        <p class="paragraph regular-text">Masih Ragu dengan Pesanan Anda?</p>
                                        <a class="bold-regular-text pt-2 batal-anchor" @click="dialog_batal()">Batalkan Pesanan</a>
                                    </v-layout>
                                </v-layout>
                            </v-card>
                        </v-layout>
                    </v-flex>
                    <v-flex xs4 class="ml-4">
                        <v-layout column>
                            <v-card class="card-pesanan">
                                <v-layout column align-start>
                                    <p class="bold-bigger-regular-text">Kost Catleya</p>
                                    <div class="d-inline-flex align-center pt-2"><span class="material-symbols-outlined pr-2">
                                    location_on
                                </span><p class="medium-regular-text paragraph">Depok, Sleman, Yogyakarta</p></div>
                                </v-layout>
                            </v-card>
                            <v-card class="card-pesanan">
                                <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15812.97476859342!2d110.3904599!3d-7.76396115!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sid!4v1681391601193!5m2!1sen!2sid" width="100%" height="250" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                                <v-layout align-start>
                                    <a class="bold-regular-text pt-3 daftar-anchor" @click="dialog_lokasi = true">Lihat lokasi terdekat</a>
                                </v-layout>
                            </v-card>
                            <v-card class="card-pesanan">
                                <v-layout column align-start>
                                    <p class="pt-3 medium-regular-text paragraph" >{{ tanggal_mulai }} &ndash; {{ tanggal_selesai }}</p>
                                    <p class="pt-3 medium-regular-text paragraph">{{ kos_booking_model.total_bulan }} Bulan</p>
                                    <p class="pt-6 medium-regular-text">{{ kos_booking_model.total_kamar }}  Kamar Kos</p>
                                    <img src="../../../assets/Frame1.png" alt="" width="100%">

                                </v-layout>
                            </v-card>
                        </v-layout>
                    </v-flex>
                </v-layout>
            </v-layout>
            <v-layout column class="layout-main" mt-6 v-else-if="!this.model_ready">
                <p class="thin-title">Silahkan Lakukan Pemesanan Terlebih Dahulu</p>
                <p class="thin-sub-title pt-2">Silahkan Cek Rincian Transaksi jika sudah melakukan Pemesanan</p>
            </v-layout>
            <v-dialog v-model="dialog_konfirmasi_batal" persistent max-width="25vw">
                <v-card class="pa-4">
                    <p class="medium-regular-text">Ingin Membatalkan Pesanan?</p>
                    <v-layout justify-center class="pt-4">
                        <v-btn outlined class="mr-2" @click="dialog_konfirmasi_batal = false">Keluar</v-btn>
                        <v-btn color="red" class="ml-2 white--text" @click="cancelBooking()">Batalkan</v-btn>
                    </v-layout>
                </v-card>
            </v-dialog>
            <v-dialog v-model="dialog_kamar_terisi" persistent max-width="25vw">
                <v-card class="pa-4">
                    <p class="medium-regular-text">Mohon Maaf Kamar sudah terisi</p>
                    <v-layout justify-center class="pt-4">
                        <v-btn outlined class="mr-2" @click="$router.go(-1);">Keluar</v-btn>
                    </v-layout>
                </v-card>
            </v-dialog>

            <v-dialog v-model="dialog_lokasi" persistent max-width="25vw">
                <v-card class="pa-4">
                    <v-layout row align-start class="pa-4 pb-0">
                        <p class="bold-regular-text">Lokasi Terdekat</p>
                    </v-layout>
                    <v-layout row align-start class="pa-4">
                        <v-layout align-start column>
                            <ul v-for="(location, index) in locations" :key="index" class="pl-0 pb-3">
                                <p class="regular-text ma-0">{{ location.message }}</p>
                            </ul>
                        </v-layout>
                        <v-layout justify-end column>
                            <ul v-for="(length, index) in lengths" :key="index" class="pl-0 pb-3">
                                <p class="regular-text ma-0">{{ length.message }}</p>
                            </ul>
                        </v-layout>
                    </v-layout>
                    <v-layout justify-center class="pt-4">
                        <v-btn outlined class="mr-2" @click="dialog_lokasi = false">Batal</v-btn>
                    </v-layout>
                </v-card>
            </v-dialog>
            <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom class="white--text">{{ error_message }}</v-snackbar>

        </v-container>
    <!-- </v-main> -->
</template>

<script>
    export default{
        name:"rincian-pesanan",
        props:{
            api: {
                type: String,
                default: "no_data",
            },
            apiUser: {
                type: String,
                default: "no_data",
            },
            apiKamarKosong: {
                type: String,
                default: "no_data",
            },
        },
        data(){
            return{
                ready: false,
                user_model:{},
                kos_booking_model:{},
                tanggal_mulai: '',
                tanggal_selesai: '',
                total_price: null,
                dialog_konfirmasi_batal: false,
                dialog_lokasi: false,
                
                model_ready: false,
                snackbar: '',
                color: '',
                error_message: '',

                locations : [],
                lengths : [],
            
                status_kamar_terisi: false,
                kamar_kosong: [],
                dialog_kamar_terisi: false,
            }
        },
        created(){
            this.initData();
            this.initHeader();
        },
        methods:{
            initHeader(){
                this.locations = [{ message: 'Coffee Shop' }, 
                            { message: 'Minimarket' },
                            { message: 'Warung Makan' },
                            { message: 'Laundry' },
                            { message: 'Universitas Gadjah Mada' },
                            { message: 'Rumah Sakit Sardjito' }]

                this.lengths = [{ message: '50 m' }, 
                            { message: '100 m' },
                            { message: '200 m' },
                            { message: '200 m' },
                            { message: '500 m' },
                            { message: '2,5 km' }]
            },
            initData(){
                this.initModel();
                this.sisaKamar();
                this.devLog('init data');

                if(localStorage.kosBooking){
                    this.model_ready = true;
                    let localStorageKosBooking = localStorage.getItem('kosBooking');
                    let kos_booking = JSON.parse(localStorageKosBooking);

                    let user_id = kos_booking.users_id;
                    this.kos_booking_model = kos_booking;

                    this.$http.get(this.apiUser+user_id, {headers : {
                        Authorization: localStorage.token,
                    }})
                    .then(response => {
                        this.devLog("get user result code: " + response.status);
                        if(response.status == 200){
                            if(!response.data){
                                this.devLog('response fail')
                            }else{
                                this.user_model = response.data.data[0];
                                this.devLog(this.user_model)
                                this.ready = true;
                                // tfhis.$router.push('/dashboard');
                            }
                        }
                    }).catch((err)=>{
                        this.error_message = err.response.data.message;
                        this.color = "red";
                        this.snackbar = true;
                    });

                    this.total_price = this.kos_booking_model.total_price.toLocaleString("de-DE");

                    
                    let tglMulai = new Date(this.kos_booking_model.tanggal_mulai);
                    let tglSelesai = new Date(this.kos_booking_model.tanggal_selesai);
                    
                    const options = {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    };

                    this.tanggal_mulai = tglMulai.toLocaleDateString(["ban", "id"], options);
                    this.tanggal_selesai = tglSelesai.toLocaleDateString(["ban", "id"], options);
                }else if(!localStorage.userLogin){
                    this.ready = false;
                }
                else{
                    this.model_ready = false;
                }
            },
            initModel(){
                this.user_model = {
                    id: null,
                    name: '',
                    phone_number: '',
                    email: '',
                }

                this.kos_booking_model = {
                    users_id: null,
                    tanggal_mulai: '',
                    total_bulan: null,
                    total_kamar: null,
                    tanggal_selesai: '',
                    total_price: null,
                }
            },
            submitForm(){
                this.devLog("Trying to connect... "+ this.API + " with : " + JSON.stringify(this.kos_booking_model));

                if(this.status_kamar_terisi == true){
                    this.$http.post(this.api, this.kos_booking_model, {headers : {
                        Authorization: localStorage.token,
                    }})
                    .then(response => {
                        this.devLog("Result Code: " +response.status);
                        if(response.status == 201){
                            if(response.data.api_status == "fail"){
                                this.devLog('response fail')
                                this.error_message = response.data.api_title;
                                this.color = "red";
                                this.snackbar = true;
                            }else{
                                localStorage.removeItem('kosBooking');

                                this.$router
                                    .push({ path: '/transaksi' })
                                    .then(() => { this.$router.go() })
                            }
                        }
                    }).catch((err)=>{
                        this.error_message = err.response.data.message;
                        this.color = "red";
                        this.snackbar = true;
                    });
                }else{
                    this.dialog_kamar_terisi = true;
                    localStorage.removeItem('kosBooking');
                }
            },            
            
            dialog_batal(){
                this.dialog_konfirmasi_batal = true;
            },
            
            cancelBooking(){
                localStorage.removeItem('kosBooking');
                this.dialog_konfirmasi_batal = false;
        
                this.$router
                    .push({ path: '/dashboard' })
                    .then(() => { this.$router.go() })

            },

            sisaKamar(){
                this.$http.get(this.apiKamarKosong, {headers : {
                        Authorization: localStorage.token,
                    }})
                .then(response => {
                    this.devLog("get kamar kosong result code: " + response.status);
                    if(response.status == 200){
                        if(!response.data){
                            this.devLog('response fail')
                        }else{
                            this.kamar_kosong = response.data.data;
                            this.devLog(this.kamar_kosong)

                            this.total_kamar_kosong = this.kamar_kosong.length;
                            this.devLog('kamar kosong' + this.total_kamar_kosong);

                            if(this.total_kamar_kosong > 0){
                                this.status_kamar_terisi = true;
                            }else{
                                this.status_kamar_terisi = false;
                            }
                        }
                    }
                }).catch((err)=>{
                    this.error_message = err.response.data.message;
                    this.color = "red";
                    this.snackbar = true;
                });
            },
        }
    }
</script>

<style scoped>
    .card-pesanan{
        margin-top: 12px;
        padding: 32px;
    }
    .layout-price-bg{
        margin: -12px !important;
        padding: 12px;
        background-color: #FBF9F9;
    }

    .batal-anchor{
        color:#DF2E38 !important;
    }
</style>