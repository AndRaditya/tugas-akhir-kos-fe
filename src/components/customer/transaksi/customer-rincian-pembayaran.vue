<template>
    <v-container grid-list-md class="pt-0 container">
        <v-layout align-start column>
            <p class="title__medium paragraph">Rincian Pembayaran</p>
        </v-layout>
        <v-layout column v-if="this.model_pembayaran && this.kos_booking_model.status == 'Menunggu Konfirmasi Kamar' && this.kos_booking_model.ready == true" >
            <v-layout row class="pt-4">
                <v-flex xs8> 
                    <v-layout align-start column>
                        <p class="bigger--regular-text__thin">{{ kos_booking_model.kode }}</p>
                    </v-layout>
                </v-flex>
                <v-flex xs4>
                    <v-layout justify-end class="mt-0" column>
                        <p class="pengelola__sudah--verifikasi regular-text__medium">Pesanan Menunggu Pembayaran</p>
                        <p>&nbsp;</p>
                    </v-layout>
                </v-flex>
            </v-layout>
            <v-form @submit="submitForm" enctype="multipart/form-data">
                <v-flex style="width: 80%;">
                    <v-card class="card__regular">
                        <v-layout row>
                            <v-layout align-center>
                                <p class="bigger--regular-text__thin paragraph">Silahkan transfer sebelum</p>
                            </v-layout>
                            <v-layout align-start justify-end>
                                <counter-vue :start_date="kos_booking_model.date" :exp_date="kos_booking_model.exp_date" v-if="!expired_status"></counter-vue>
                                <p class="bigger--regular-text__bold  paragraph waktu-habis-text" v-else-if="expired_status">Waktu Anda Habis</p>
                            </v-layout>
                        </v-layout>
                    </v-card>
                    <v-card class="card__regular">
                        <v-layout row>
                            <v-layout column align-start>
                                <p class="regular-text__medium">{{ tanggal_mulai }} &ndash; {{ tanggal_selesai }}</p>
                                <p class="regular-text__medium">{{ kos_booking_model.total_kamar }} Kamar</p>
                            </v-layout>
                            <v-layout justify-end align-start class="mt-0">
                                <p class="regular-text__medium">{{ kos_booking_model.total_bulan }} Bulan</p>
                                <p>&nbsp;</p>
                            </v-layout>
                        </v-layout>
                        <v-layout row>
                            <v-layout align-start>
                                <p class="regular-text">Harga Kamar Bulanan</p>
                            </v-layout>
                            <v-layout justify-end>
                                <p class="regular-text__thin">Rp1.500.000</p>
                            </v-layout>
                        </v-layout>
                        <hr>
                        <v-layout row class="mt-6">
                            <v-layout align-start>
                                <p class="paragraph bigger--regular-text__thin">Total Biaya</p>
                            </v-layout>
                            <v-layout justify-end>
                                <p class="paragraph bigger--regular-text__bold ">Rp{{ total_harga }}</p>
                            </v-layout>
                        </v-layout>
                    </v-card>
                    <v-card class="card__regular" v-if="!expired_status">
                        <v-layout row >
                            <v-flex xs4>
                                <v-layout align-start>
                                    <p class="bigger--regular-text__thin">Transfer Biaya</p>
                                </v-layout>
                            </v-flex>
                            <v-flex xs8>
                                <v-layout column align-start>
                                    <p class="bigger--regular-text__bold ">{{ user_model.bank }}</p>
                                    <v-layout row class="mt-4">
                                        <p class="bigger--regular-text__bold " ref="copy_nomor_rekening">{{ user_model.rekening }}</p>
                                        <span class="material-symbols-outlined pt-1 ml-6" style="cursor: pointer" @click="copyNomorRek(user_model.rekening)">
                                            content_copy
                                        </span>
                                    </v-layout>
                                </v-layout>
                            </v-flex>
                        </v-layout>
                        <v-layout align-start column>
                            <!-- 1. Create the button that will be clicked to select a file -->
                            <v-btn 
                                color="#146C94" 
                                width="25%" 
                                class="white--text" 
                                elevation="0" 
                                :loading="isSelecting" 
                                @click="onPickFile()"
                            >
                            Unggah Bukti Transfer
                            </v-btn>
                            <input type="file" class="form-control" ref="file" @change="onFileChange($event.target.files)" style="display: none">
                            <p class="regular-text__medium mt-6">{{ fileName }}</p>
                        </v-layout>
                        <v-layout column align-start class="mt-12">
                            <p class="regular-text__thin">Silahkan tekan tombol Bayar</p>
                            <p class="paragraph regular-text__thin">Jika Anda sudah Unggah Bukti Transfer</p>
                        </v-layout>
                    </v-card>
                    <v-layout align-start class="my-12"  v-if="!expired_status">
                        <!-- <v-btn color="#146C94" width="25%" class="white--text" elevation="0" @click="submitForm()">Bayar</v-btn> -->
                        <v-btn color="#146C94" width="25%" class="white--text" elevation="0" type="submit">Bayar</v-btn>
                    </v-layout>
                </v-flex>
            </v-form>
        </v-layout>
        <v-layout column class="layout-main" mt-6 v-else-if="!this.model_pembayaran || this.kos_booking_model.status != 'Menunggu Konfirmasi Kamar'">
            <p class="title__medium">Silahkan Lakukan Pemesanan Terlebih Dahulu</p>
            <h3 class="subtitle__thin pt-2">Silahkan Cek Rincian Pesanan jika sudah melakukan  Pesanan</h3>
        </v-layout>
        <v-dialog v-model="errorDialog" max-width="300">
            <v-card>
                <v-card-text class="title__subheading">{{ errorText }}</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn @click="errorDialog = false" flat>Tutup!</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom class="white--text">{{ error_message }}</v-snackbar>

    </v-container>
</template>

<script>
import counterVue from '@/components/counter.vue';

    export default{
        name: 'rincian-pembayaran',
        props: {
            api: {
                type: String,
                required: true
            },
            apiPengelola: {
                type: String,
                required: true
            },
            apiPembayaran: {
                type: String,
                required: true
            },
        },
        components:{
            counterVue
        },

        data(){
            return{
                isSelecting: false,
                selectedFile: null,
                errorDialog: null,
                errorText: "",
                fileName: '',
                file: '',

                snackbar: '',
                color: '',
                error_message: '',

                id: null,
                nav_title: "",
                nav_path: [],
                nav_maps: [],

                kos_booking_model: {},
                user_model: {},
                model_pembayaran: false,
                tanggal_mulai: '',
                tanggal_selesai: '',
                total_harga: '',

                expired_status: false,
                now_date: '',
                date_interval: '',

                interval_time: null,
            }
        },
        watch: {

        },

        created(){
            this.initData();
            this.initModel();
            this.interval_time = 10;
        },

        methods:{
            initData(){
                this.id = this.$route.params.id;


                this.devLog('this.id');
                this.devLog(this.id);
                this.getData();
                this.getPengelola();
            },

            initModel(){
                this.kos_booking_model = {
                    id: null,
                    kode: '',
                    date: '',
                    exp_date: '',
                    tanggal_mulai: '',
                    tanggal_selesai: '',
                    total_bulan: null,
                    total_kamar: null,
                    total_price: null,

                    bukti_transfer: '',

                    ready: false,
                }
                this.user_model = {
                    rekening: '',
                    bank: '',
                }
            },

            getData(){
                this.devLog('get data');

                this.$http.get(this.api+this.id, {headers : {
                        Authorization: localStorage.token,
                    }})
                .then(response => {
                    this.devLog("pembayaran Result Code: " +response.status);
                    if(response.status == 200){
                        if(response.data.api_status == "fail"){
                            this.devLog('response fail')
                            this.error_message = response.data.api_title;
                            this.color = "#DF2E38";
                            this.snackbar = true;
                            this.model_pembayaran = false;
                        }else{
                            this.kos_booking_model = response.data.data[0];
                            this.devLog(this.kos_booking_model)
                            this.model_pembayaran = true;
                            this.getDate();

                            this.kos_booking_model.ready = true;
                        }
                    }
                }).catch((err)=>{
                    this.devLog(err);
                    this.error_message = 'Data Empty';
                    this.color = "#DF2E38";
                    this.snackbar = true;
                    this.model_pembayaran = false;
                });
                
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
                            this.model_pembayaran = false;
                        }else{
                            this.user_model = response.data.data;
                            this.devLog(this.user_model)
                        }
                    }
                }).catch((err)=>{
                    this.devLog(err);
                    this.error_message = 'Data Empty';
                    this.color = "#DF2E38";
                    this.snackbar = true;
                    this.model_pembayaran = false;
                });
            },

            getDate(){
                let tglMulai = new Date(this.kos_booking_model.tanggal_mulai);
                let tglSelesai = new Date(this.kos_booking_model.tanggal_selesai);
                
                const options = {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                };

                this.tanggal_mulai = tglMulai.toLocaleDateString(["ban", "id"], options)
                this.tanggal_selesai = tglSelesai.toLocaleDateString(["ban", "id"], options)
                this.total_harga = this.formatPrice(this.kos_booking_model.total_price);

            },

            getFormData(object) {
                const formData = new FormData();
                Object.keys(object).forEach(key => {
                if (typeof object[key] !== 'object') formData.append(key, object[key])
                else formData.append(key, JSON.stringify(object[key]))
                })
                formData.append('bukti_transfer', this.file);
                return formData;
            },

            submitForm(){
                if(this.kos_booking_model.bukti_transfer){
                    this.devLog("booking model : ");
                    this.devLog(this.kos_booking_model);
                    this.devLog(this.apiPembayaran+this.kos_booking_model.id)

                    this.kos_booking_model.status = 'Menunggu Konfirmasi Pembayaran'

                    this.$http.put(this.api+this.kos_booking_model.id, this.kos_booking_model, {headers : {
                        Authorization: localStorage.token,
                    }})
                    .then(response => {
                        this.devLog(response.status);
                        if(response.status == 202){
                            this.devLog("Loading "+ this.apiPembayaran + " - Result Status: " +response.status);
                            this.devLog(response.data);
                            this.uploadPembayaran();

                            this.$router
                                .push({ path: '/transaksi' })
                                // .then(() => { this.$router.go() })
                        }
                    }).catch((err) => {
                        // this.devLog(JSON.stringify(err))
                        this.error_message = err.message;
                        this.color = "#DF2E38";
                        this.snackbar = true;
                    });
                }else{
                    this.error_message = 'Anda belum unggah bukti pembayaran';
                    this.color = "#DF2E38";
                    this.snackbar = true;
                }
            },

            uploadPembayaran(){
                this.$http.post(this.apiPembayaran+this.kos_booking_model.id, this.kos_booking_model, {headers : {
                        Authorization: localStorage.token,
                    }})
                    .then(response => {
                        this.devLog(response.status);
                        if(response.status == 200){
                            this.devLog("Loading "+ this.apiPembayaran + " - Result Status: " +response.status);
                            this.devLog(response.data);
                        }
                    }).catch((err) => {
                        // this.devLog(JSON.stringify(err))
                        this.error_message = err.message;
                        this.color = "#DF2E38";
                        this.snackbar = true;
                    });
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

                        // this.urls.push(imageURL);
                    }
                }
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

            cancelPesanan(){
                this.kos_booking_model.status = 'Dibatalkan';

                this.$http.put(this.api+this.kos_booking_model.id, this.kos_booking_model, {headers : {
                        Authorization: localStorage.token,
                    }})
                .then(response => {
                    this.devLog(response.status);
                    if(response.status == 202){
                        this.devLog("Loading "+ this.apiPembayaran + " - Result Status: " +response.status);
                        this.devLog(response.data);

                        this.$router
                            .push({ path: '/transaksi' })
                            // .then(() => { this.$router.go() })
                    }
                }).catch((err) => {
                    // this.devLog(JSON.stringify(err))
                    this.error_message = err.message;
                    this.color = "#DF2E38";
                    this.snackbar = true;
                });
            },

            async copyNomorRek(mytext){
                try {
                    await navigator.clipboard.writeText(mytext);
                } catch($e) {
                    this.devLog('cant copy')
                }
            }
        },
        computed: {
            // _now() {
            //     return Date.now()
            // }
        },
        mounted(){
            this.devLog('mounted');
            this.date_interval = setInterval(this.getStatusExpDate,  this.interval_time);
        }
    }
</script>

<style>
    .waktu-habis-text{
        color: #DF2E38;
    }
</style>