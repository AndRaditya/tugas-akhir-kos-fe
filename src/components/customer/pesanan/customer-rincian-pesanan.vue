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
                            <v-card class="card-regular">
                                <v-layout row>
                                    <v-layout align-center>
                                        <p class="thin-bigger-regular-text paragraph">Silahkan transfer sebelum</p>
                                    </v-layout>
                                    <v-layout align-start justify-end>
                                        <counter-vue :start_date="kos_booking_model.date" :exp_date="kos_booking_model.exp_date" v-if="!expired_status"></counter-vue>
                                        <p class="bold-bigger-regular-text paragraph waktu-habis-text" v-else-if="expired_status">Waktu Anda Habis</p>
                                    </v-layout>
                                </v-layout>
                            </v-card>
                            <v-card class="card-pesanan">
                                <v-layout column>
                                    <v-layout align-start class="pb-4">
                                        <p class="medium-bigger-regular-text paragraph">Rincian Transaksi</p>
                                    </v-layout>
                                    <hr>
                                    <v-layout row align-start class="pt-4">
                                        <v-flex xs6>
                                            <v-layout column align-start>
                                                <p class="thin-regular-text ">Tanggal Pesanan</p>
                                                <p class="thin-regular-text ">Jumlah Bulan</p>
                                                <p class="thin-regular-text ">Jumlah Kamar</p>
                                            </v-layout>
                                        </v-flex>
                                        <v-flex xs6>
                                            <v-layout column align-start class="ma-0">
                                                <p class="mb-3 medium-regular-text">{{ tanggal_mulai }} &ndash; {{ tanggal_selesai }}</p>
                                                <p class="mb-3 medium-regular-text">{{ kos_booking_model.total_bulan }} Bulan</p>
                                                <p class="mb-3 medium-regular-text">{{ kos_booking_model.total_kamar }}  Kamar Kos</p>
                                            </v-layout>
                                        </v-flex>
                                    </v-layout>
                                </v-layout>
                            </v-card>
                            <v-card class="card-pesanan mb-12">
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
                                    <hr>
                                    <v-layout row align-start class="mt-6">
                                        <v-flex xs6>
                                            <v-layout align-start>
                                                <p class="thin-regular-text">Transfer Biaya</p>
                                            </v-layout>
                                        </v-flex>
                                        <v-flex xs6>
                                            <v-layout column align-start>
                                                <p class="bold-regular-text">{{ pengelola_user_model.bank }}</p>
                                                <v-layout row class="mt-4">
                                                    <p class="bold-regular-text" ref="copy_nomor_rekening">{{ pengelola_user_model.rekening }}</p>
                                                    <span class="material-symbols-outlined pt-1 ml-6" style="cursor: pointer" @click="copyNomorRek(pengelola_user_model.rekening)">
                                                        content_copy
                                                    </span>
                                                </v-layout>
                                            </v-layout>
                                        </v-flex>
                                    </v-layout>

                                    <v-layout align-start column class="pt-6">
                                        <v-btn 
                                            color="#146C94" 
                                            width="35%" 
                                            class="white--text" 
                                            elevation="0" 
                                            :loading="isSelecting" 
                                            @click="onPickFile()"
                                        >
                                        Unggah Bukti Transfer
                                        </v-btn>
                                        <input type="file" class="form-control" ref="file" @change="onFileChange($event.target.files)" style="display: none">
                                        <p class="medium-regular-text mt-6">{{ fileName }}</p>
                                    </v-layout>
                                    <v-layout column align-start class="py-6">
                                        <p class="thin-regular-text">Silahkan tekan tombol Bayar di bagian kanan</p>
                                        <p class="paragraph thin-regular-text">Jika Anda sudah Unggah Bukti Transfer</p>
                                    </v-layout>

                                    <v-layout column align-start mt-6>
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
                                <v-layout column>
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
                                    <p class="medium-regular-text">Pastikan pesanan Anda sudah benar</p>
                                    <v-btn color="#146C94" width="30%" class="white--text" @click="submitForm()">Pesan</v-btn>
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

            <v-dialog v-model="dialog_pindah_page" persistent max-width="25vw">
                <v-card class="pa-4">
                    <p class="medium-regular-text">Jika anda pindah halaman, pesanan batal otomatis</p>
                    <v-layout justify-center class="pt-4">
                        <v-btn outlined class="mr-2" @click="closeDialogPindah()">Batal</v-btn>
                        <v-btn color="red" class="ml-2 white--text" @click="cancelBooking()">Pindah Halaman</v-btn>
                    </v-layout>
                </v-card>
            </v-dialog>

            <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom class="white--text">{{ error_message }}</v-snackbar>
        </v-container>
    <!-- </v-main> -->
</template>

<script>
    import counterVue from '@/components/counter.vue';
    window.onbeforeunload = function() { alert("Your work will be lost.") };  

    export default{
        name:"rincian-pesanan",
        components:{
            counterVue
        },
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
            apiPengelola: {
                type: String,
                default: "no_data",
            },
        },
        data(){
            return{
                isSelecting: false,
                selectedFile: null,
                errorDialog: null,
                errorText: "",
                fileName: '',
                file: '',

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
                dialog_pindah_page: false,

                expired_status: false,
                pengelola_user_model: {},
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
                this.getPengelola();
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
                    date: '',
                    exp_date: '',
                }

                this.pengelola_user_model = {
                    rekening: '',
                    bank: '',
                }
            },

            getPengelola(){
                this.$http.get(this.apiPengelola, {headers : {
                        Authorization: localStorage.token,
                    }})
                .then(response => {
                    this.devLog("pengelola Result Code: " +response.status);
                    if(response.status == 200){
                        if(response.data.api_status == "fail"){
                            this.devLog('response fail')
                            this.error_message = response.data.api_title;
                            this.color = "red";
                            this.snackbar = true;
                        }else{
                            this.pengelola_user_model = response.data.data;
                            this.devLog(this.pengelola_user_model)
                        }
                    }
                }).catch((err)=>{
                    this.devLog(err);
                    this.error_message = 'Data Empty';
                    this.color = "red";
                    this.snackbar = true;
                });
            },

            getStatusExpDate(){
                if(this.kos_booking_model){
                    const timer = setInterval(() => {
                        // const now = this._now;
                        const now = new Date()
                        const exp_date = new Date(this.kos_booking_model.exp_date);
                        const distance = exp_date.getTime() - now.getTime();

                        if(distance < 0){
                            clearInterval(timer);
                            this.expired_status = true;
                            clearInterval(this.date_interval);
                            this.cancelPesanan();
                            return
                        }

                        this.interval_time = 60000;

                    }, this.interval_time);
                }
            },

            submitForm(){
                if(this.kos_booking_model.bukti_transfer){
                    this.devLog("Trying to connect... "+ this.API + " with : " + JSON.stringify(this.kos_booking_model));
                    this.devLog(JSON.stringify(this.kos_booking_model))

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

                }else{
                    this.error_message = 'Anda belum unggah bukti pembayaran';
                    this.color = "red";
                    this.snackbar = true;
                }
            },      
            
            onPickFile() {
                this.$refs.file.click();
            },

            onFileChange(file) {
                let imageFile = file[0];
                if (file.length > 0) {
                    if (!imageFile.type.match("image.*")) {
                        this.errorDialog = true;
                        this.errorText = "Please choose an image file";
                    } else {
                        this.fileName = imageFile.name;

                        this.devLog("onfilechange");
                        let reader = new FileReader();
                        reader.onloadend = (e) => {
                            this.devLog(e.target);
                            let image_url = e.target.result;

                            this.kos_booking_model.bukti_transfer = image_url;
                        };
                        reader.readAsDataURL(imageFile);
                    }
                }
            },
            
            dialog_batal(){
                this.dialog_konfirmasi_batal = true;
            },
            
            cancelBooking(){
                localStorage.removeItem('kosBooking');
                this.dialog_konfirmasi_batal = false;
                this.dialog_pindah_page = false;
        
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

            callBackFunction(){
                localStorage.removeItem('kosBooking');
            },

            closeDialogPindah(e){
                e.preventDefault();
                this.dialog_pindah_page = false;
            },

            async copyNomorRek(mytext){
                try {
                    await navigator.clipboard.writeText(mytext);
                    this.error_message = 'Berhasil Salin Nomor Rekening';
                    this.color = "green";
                    this.snackbar = true;
                } catch($e) {
                    this.error_message = 'Tidak Dapat Salin Nomor Rekening';
                    this.color = "red";
                    this.snackbar = true;
                    this.devLog('cant copy')
                }
            }
        },
        mounted () {
            if (window.history && window.history.pushState) {
                window.onpopstate = function() {
                    localStorage.removeItem('kosBooking');
                    alert('Pesanan Anda Akan Hilang');
                };
            }

            this.devLog('mounted');
            this.date_interval = setInterval(this.getStatusExpDate,  this.interval_time);
        },
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