<template>
    <!-- <v-main> -->
        <v-container grid-list-md class="pt-0" >
            <div class="cust-rincian-pesanan mb-12" v-if="this.model_ready" 
                data-aos="fade-zoom-ing"
                data-aos-offset="50"
                data-aos-delay="50"
                data-aos-duration="500"
                data-aos-easing="ease-in-back"
                data-aos-mirror="false"
                data-aos-once="true"
                data-aos-anchor-placement="top-center">
                <div class="cust-rincian-pesanan__title">
                    <p class="title__medium paragraph">Rincian Pesanan</p>
                </div>
                <div class="cust-rincian-pesanan__counter">
                    <v-card class="card__regular">
                        <div class="cust-rincian-pesanan__counter--parent">
                            <div class="cust-rincian-pesanan__counter--child-1">
                                <p class="bigger--regular-text__thin paragraph" style="line-height: 1.7">Silahkan transfer sebelum</p>
                            </div>
                            <div class="cust-rincian-pesanan__counter--child-2">
                                <counter-vue :start_date="kos_booking_model.date" :exp_date="kos_booking_model.exp_date" v-if="!expired_status"></counter-vue>
                                <p class="bigger--regular-text__bold  paragraph waktu-habis-text" v-else-if="expired_status">Waktu Anda Habis</p>
                            </div>
                        </div>
                    </v-card>
                </div>
                <div class="cust-rincian-pesanan__rincian-transaksi">
                    <v-card class="card-pesanan">
                        <div class="cust-rincian-pesanan__rincian-transaksi--parent">
                            <div class="cust-rincian-pesanan__rincian-transaksi--child-1">
                                <p class="bigger--regular-text__medium paragraph">Rincian Transaksi</p>
                            </div>
                            <div class="cust-rincian-pesanan__rincian-transaksi--child-2">
                                <div class="cust-rincian-pesanan__rincian-transaksi--child-2--line"></div>
                            </div>
                            <div class="cust-rincian-pesanan__rincian-transaksi--child-3">
                                <p class="regular-text__thin  paragraph">Tanggal Pesanan</p>
                            </div>
                            <div class="cust-rincian-pesanan__rincian-transaksi--child-4">
                                <p class="regular-text__medium paragraph">{{ tanggal_mulai }} &ndash; {{ tanggal_selesai }}</p>
                            </div>
                            <div class="cust-rincian-pesanan__rincian-transaksi--child-5">
                                <p class="regular-text__thin  paragraph">Jumlah Bulan</p>
                            </div>
                            <div class="cust-rincian-pesanan__rincian-transaksi--child-6">
                                <p class="regular-text__medium paragraph">{{ kos_booking_model.total_bulan }} Bulan</p>
                            </div>
                            <div class="cust-rincian-pesanan__rincian-transaksi--child-7">
                                <p class="regular-text__thin  paragraph">Jumlah Kamar</p>
                            </div>
                            <div class="cust-rincian-pesanan__rincian-transaksi--child-8">
                                <p class="regular-text__medium paragraph">{{ kos_booking_model.total_kamar }}  Kamar Kos</p>
                            </div>
                        </div>
                    </v-card>
                </div>
                <div class="cust-rincian-pesanan__pricing">
                    <v-card class="card-pesanan">
                        <div class="cust-rincian-pesanan__pricing__parent">
                            <div class="cust-rincian-pesanan__pricing--child-1">
                                <div class="cust-rincian-pesanan__pricing--child-1__title-1">
                                    <p class="regular-text__thin ">Harga Kamar Bulanan</p>
                                </div>
                                <div class="cust-rincian-pesanan__pricing--child-1__title-2">
                                    <p class="mb-3 regular-text__medium">Rp{{ harga_bulanan }}</p>
                                </div>
                                <div class="cust-rincian-pesanan__pricing--child-1__title-3">
                                    <p class="regular-text__thin ">Biaya Pesanan</p>
                                </div>
                                <div class="cust-rincian-pesanan__pricing--child-1__title-4">
                                    <p style="color: #19A7CE;" class="regular-text__bold">Gratis</p>
                                </div>
                            </div>
                            <div class="cust-rincian-pesanan__pricing--child-2">
                                <div class="cust-rincian-pesanan__pricing--child-2__child-1">
                                    <p class="regular-text__thin ">Total Biaya</p>
                                </div>
                                <div class="cust-rincian-pesanan__pricing--child-2__child-2">
                                    <p class="mb-3 regular-text__medium">Rp{{ total_price }}</p>
                                </div>
                            </div>
                            <div class="cust-rincian-pesanan__pricing--child-3">
                                <div class="cust-rincian-pesanan__pricing--child-3--line"></div>
                            </div>
                            <div class="cust-rincian-pesanan__pricing--child-4">
                                <div class="cust-rincian-pesanan__pricing--child-4__transfer-1">
                                    <p class="regular-text__thin">Transfer Biaya</p>
                                </div>
                                <div class="cust-rincian-pesanan__pricing--child-4__transfer-2">
                                    <p class="regular-text__bold">{{ pengelola_user_model.bank }}</p>
                                    <div class="cust-rincian-pesanan__pricing--child-4__transfer-2__row">
                                        <p class="regular-text__bold" ref="copy_nomor_rekening">{{ pengelola_user_model.rekening }}</p>
                                        <span class="material-symbols-outlined pt-1 ml-6" style="cursor: pointer" @click="copyNomorRek(pengelola_user_model.rekening)">
                                            content_copy
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="cust-rincian-pesanan__pricing--child-5">
                                <v-btn 
                                    color="#19A7CE" 
                                    class="white--text btn-transfer" 
                                    elevation="0" 
                                    :loading="isSelecting" 
                                    @click="onPickFile()"
                                >
                                Unggah Bukti Transfer
                                </v-btn>
                                <input type="file" class="form-control" ref="file" @change="onFileChange($event.target.files)" style="display: none">
                                <p class="regular-text__medium mt-6">{{ fileName }}</p>
                            </div>
                            <div class="cust-rincian-pesanan__pricing--child-6">
                                <p class="regular-text__thin paragraph">Silahkan tekan tombol Pesan <br> Jika Anda sudah Unggah Bukti Transfer</p>
                            </div>
                            <div class="cust-rincian-pesanan__pricing--child-7">
                                <p class="regular-text__medium">Pastikan pesanan Anda sudah benar</p>
                                <v-btn color="#146C94" class="white--text btn-transfer" @click="submitForm()">Pesan</v-btn>
                            </div>
                            <div class="cust-rincian-pesanan__pricing--child-8">
                                <p class="paragraph regular-text">Masih Ragu dengan Pesanan Anda?</p>
                                <a class="regular-text__bold pt-2 batal-anchor" @click="dialog_batal()">Batalkan Pesanan</a>
                            </div>
                        </div>
                    </v-card>
                </div>
                <div class="cust-rincian-pesanan__alamat">
                    <v-card class="card-pesanan">
                        <v-layout column align-start>
                            <p class="bigger--regular-text__bold ">Kost Catleya</p>
                            <div class="d-inline-flex align-center pt-2"><span class="material-symbols-outlined pr-2">
                            location_on
                        </span><p class="regular-text__medium paragraph">Depok, Sleman, Yogyakarta</p></div>
                        </v-layout>
                    </v-card>
                </div>
                <div class="cust-rincian-pesanan__pemesan">
                    <v-card class="card-pesanan">
                        <div class="cust-rincian-pesanan__pemesan--parent">
                            <div class="cust-rincian-pesanan__pemesan--child-1">
                                <p class="bigger--regular-text__medium  paragraph">Rincian Pemesan</p>
                            </div>
                            <div class="cust-rincian-pesanan__pemesan--child-2">
                                <div class="cust-rincian-pesanan__pemesan--child-2--line">
                                </div>
                            </div>
                            <div class="cust-rincian-pesanan__pemesan--child-3">
                                <p class="regular-text__thin  paragraph">Nama Lengkap</p>
                            </div>
                            <div class="cust-rincian-pesanan__pemesan--child-4">
                                <p class="regular-text__medium paragraph">{{ user_model.name }}</p>
                            </div>
                            <div class="cust-rincian-pesanan__pemesan--child-5">
                                <p class="regular-text__thin paragraph ">Nomor Telepon</p>
                            </div>
                            <div class="cust-rincian-pesanan__pemesan--child-6">
                                <p class="regular-text__medium paragraph">{{ user_model.phone_number }}</p>
                            </div>
                            <div class="cust-rincian-pesanan__pemesan--child-7">
                                <p class="regular-text__thin  paragraph">Email</p>
                            </div>
                            <div class="cust-rincian-pesanan__pemesan--child-8">
                                <p class="regular-text__medium paragraph">{{ user_model.email }}</p>
                            </div>
                        </div>
                    </v-card>
                </div>
                <div class="cust-rincian-pesanan__maps">
                    <v-card class="card-pesanan">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15812.97476859342!2d110.3904599!3d-7.76396115!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sid!4v1681391601193!5m2!1sen!2sid" width="100%" height="250" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                        <v-layout align-start>
                            <a class="regular-text__bold pt-3 btn__daftar-anchor" @click="dialog_lokasi = true">Lihat lokasi terdekat</a>
                        </v-layout>
                    </v-card>
                </div>
                <div class="cust-rincian-pesanan__button">
                    <v-card class="card-pesanan">
                        <v-layout column align-start>
                            <p class="regular-text__medium">Pastikan pesanan Anda sudah benar</p>
                            <v-btn color="#146C94" class="white--text btn-transfer" @click="submitForm()">Pesan</v-btn>
                        </v-layout>
                    </v-card>
                </div>
            </div>

            <v-layout align-start v-if="!this.model_ready">
                <p class="title__medium paragraph">Rincian Pesanan</p>
            </v-layout>
            
            <v-layout column class="layout-main" mt-6 v-if="!this.model_ready">
                <p class="title__medium">Silahkan Lakukan Pemesanan Terlebih Dahulu</p>
                <p class="subtitle__thin pt-2">Silahkan Cek Rincian Transaksi jika sudah melakukan Pemesanan</p>
            </v-layout>

            <v-dialog v-model="dialog_konfirmasi_batal" persistent content-class="dialog-pesanan-cust">
                <v-card class="pa-4">
                    <p class="regular-text__medium" style="text-align: center">Ingin Membatalkan Pesanan?</p>
                    <v-layout justify-center class="pt-4">
                        <v-btn outlined class="mr-2" @click="dialog_konfirmasi_batal = false">Keluar</v-btn>
                        <v-btn color="red" class="ml-2 white--text" @click="cancelBooking()">Batalkan</v-btn>
                    </v-layout>
                </v-card>
            </v-dialog>

            <v-dialog v-model="dialog_kamar_terisi" persistent content-class="dialog-pesanan-cust">
                <v-card class="pa-4">
                    <p class="regular-text__medium">Mohon Maaf Kamar sudah terisi</p>
                    <v-layout justify-center class="pt-4">
                        <v-btn outlined class="mr-2" @click="$router.go(-1);">Keluar</v-btn>
                    </v-layout>
                </v-card>
            </v-dialog>

            <v-dialog v-model="dialog_lokasi" persistent content-class="dialog-pesanan-cust">
                <v-card class="pa-4">
                    <div class="dialog-lokasi__grid">
                        <div class="dialog-lokasi__grid--child-1">
                            <p class="regular-text__bold">Lokasi Terdekat</p>
                        </div>
                        <div class="dialog-lokasi__grid--child-2">
                            <ul v-for="(location, index) in locations" :key="index" class="pl-0 pb-3">
                                <p class="regular-text ma-0">{{ location.message }}</p>
                            </ul>
                        </div>
                        <div class="dialog-lokasi__grid--child-3">
                             <ul v-for="(length, index) in lengths" :key="index" class="pl-0 pb-3">
                                <p class="regular-text ma-0">{{ length.message }}</p>
                            </ul>
                        </div>
                        <div class="dialog-lokasi__grid--child-4">
                            <v-btn outlined class="mr-2" @click="dialog_lokasi = false">Batal</v-btn>
                        </div>
                    </div>
                </v-card>
            </v-dialog>

            <v-dialog v-model="dialog_pindah_page" persistent max-width="25vw">
                <v-card class="pa-4">
                    <p class="regular-text__medium">Jika anda pindah halaman, pesanan batal otomatis</p>
                    <v-layout justify-center class="pt-4">
                        <v-btn outlined class="mr-2" @click="closeDialogPindah()">Batal</v-btn>
                        <v-btn color="red" class="ml-2 white--text" @click="cancelBooking()">Pindah Halaman</v-btn>
                    </v-layout>
                </v-card>
            </v-dialog>

            <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom class="white--text">{{ error_message }}</v-snackbar>

            <v-dialog v-model="errorDialog" max-width="500">
                <v-card>
                    <v-card-text class="subtitle pa-3">{{errorText}}</v-card-text>
                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn @click="errorDialog = false" flat>Tutup!</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>

            <v-snackbar v-model="snackbarLoading" :color="color" timeout="-1" bottom class="white--text"><v-progress-circular
                indeterminate
                color="#fff"
            ></v-progress-circular> {{ snackbarLoading_message }}</v-snackbar>

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
            apiNotification: {
                type: String,
                default: "no_data",
            },
        },
        data(){
            return{
                snackbarLoading: false, 
                snackbarLoading_message: '',

                isSelecting: false,
                selectedFile: null,
                errorText: "",
                fileName: '',
                file: '',

                ready: false,
                user_model:{},
                kos_booking_model:{},
                tanggal_mulai: '',
                tanggal_selesai: '',
                total_price: null,
                harga_bulanan: null,
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

                interval_time: 2000,
                maxSize: 1024,
                errorDialog: null,
            }
        },
        created(){
            this.snackbarLoading_message = 'Loading';
            this.color = "#19A7CE";
            this.snackbarLoading = true;


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

                    let start_date = new Date(this.kos_booking_model.date);
                    let exp_date = new Date(start_date.getTime() + (30 * 60 * 1000));
                    this.kos_booking_model.exp_date = exp_date;

                    this.$http.get(this.apiUser+user_id, {headers : {
                        Authorization: localStorage.token,
                    }})
                    .then(response => {
                        this.snackbarLoading = false;
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
                        this.snackbarLoading = false;
                        this.error_message = err.response.data.message;
                        this.color = "#DF2E38";
                        this.snackbar = true;
                    });

                    this.total_price = this.formatPrice(this.kos_booking_model.total_price);
                    this.harga_bulanan = this.formatPrice(this.kos_booking_model.harga_bulanan);

                    
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
                            this.color = "#DF2E38";
                            this.snackbar = true;
                        }else{
                            this.pengelola_user_model = response.data.data;
                            this.devLog(this.pengelola_user_model)
                        }
                    }
                }).catch((err)=>{
                    this.devLog(err);
                    this.error_message = 'Data Empty';
                    this.color = "#DF2E38";
                    this.snackbar = true;
                });
            },

            getStatusExpDate(){
                if(this.kos_booking_model.exp_date){
                    const timer = setInterval(() => {
                        // const now = this._now;
                        const now = new Date()
                        const exp_date = new Date(this.kos_booking_model.exp_date);
                        const distance = exp_date.getTime() - now.getTime();

                        if(distance < 0){
                            clearInterval(timer);
                            this.expired_status = true;
                            clearInterval(this.date_interval);
                            this.cancelBooking();
                            return
                        }

                        this.interval_time = 60000;

                    }, this.interval_time);
                }
            },

            submitForm(){
                if(this.kos_booking_model.bukti_transfer){
                    this.snackbarLoading_message = 'Submitting Data';
                    this.color = "#19A7CE";
                    this.snackbarLoading = true;

                    this.kos_booking_model.exp_date = '';

                    this.devLog("Trying to connect... "+ this.API + " with : " + JSON.stringify(this.kos_booking_model));
                    this.devLog(JSON.stringify(this.kos_booking_model))

                    if(this.status_kamar_terisi == true){
                        this.$http.post(this.api, this.kos_booking_model, {headers : {
                            Authorization: localStorage.token,
                        }})
                        .then(response => {
                            this.snackbarLoading = false;
                            this.devLog("Result Code: " +response.status);
                            if(response.status == 201){
                                if(response.data.api_status == "fail"){
                                    this.devLog('response fail')
                                    this.error_message = response.data.api_title;
                                    this.color = "#DF2E38";
                                    this.snackbar = true;
                                }else{
                                    localStorage.removeItem('kosBooking');

                                    this.$router
                                        .push({ path: '/transaksi' })
                                        .then(() => { this.$router.go() })
                                }
                            }
                        }).catch((err)=>{
                            this.snackbarLoading = false;
                            this.error_message = err.response.data.message;
                            this.color = "#DF2E38";
                            this.snackbar = true;
                        });
                    }else{
                        this.dialog_kamar_terisi = true;
                        localStorage.removeItem('kosBooking');
                    }

                }else{
                    this.error_message = 'Anda belum unggah bukti pembayaran';
                    this.color = "#DF2E38";
                    this.snackbar = true;
                }
            },      
            
            onPickFile() {
                this.$refs.file.click();
            },

            onFileChange(file) {
                const { maxSize } = this
                let imageFile = file[0];
                let size = imageFile.size / maxSize / maxSize
                if (file.length > 0) {
                    if (!imageFile.type.match("image.*")) {
                        this.errorDialog = true;
                        this.errorText = "Please choose an image file";
                    } else if(size>1){
                        this.errorDialog = true
                        this.errorText = 'Gambar anda terlalu besar! Pilih gambar dibawah 1MB'
                    }else {
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
                    this.color = "#DF2E38";
                    this.snackbar = true;
                });
            },

            closeDialogPindah(e){
                e.preventDefault();
                this.dialog_pindah_page = false;
            },

            async copyNomorRek(mytext){
                try {
                    await navigator.clipboard.writeText(mytext);
                    this.error_message = 'Berhasil Salin Nomor Rekening';
                    this.color = "#519259";
                    this.snackbar = true;
                } catch($e) {
                    this.error_message = 'Tidak Dapat Salin Nomor Rekening';
                    this.color = "#DF2E38";
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
            if(this.kos_booking_model){
                this.date_interval = setInterval(this.getStatusExpDate,  this.interval_time);
            }
        },
    }
</script>

<style scoped>
    .layout-price-bg{
        margin: -12px !important;
        padding: 12px;
        background-color: #FBF9F9;
    }

    .batal-anchor{
        color:#DF2E38 !important;
    }
</style>