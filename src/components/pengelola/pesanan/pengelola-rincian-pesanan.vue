<template>
    <v-container grid-list-md class="pt-0" v-if="ready">
        <div class="pengelola-pesanan-rincian__header">
            <p class="title__main paragraph">Rincian Pesanan</p>
        </div>


        <v-layout column class="layout-main py-6" mt-6 v-if="this.model_transaksi">
            <v-card class="card__regular">
                <v-form @submit.prevent="validateForm()" v-model="valid" ref="form_pesanan_pengelola" autofocus lazy-validation>
                    <div class="pengelola-pesanan-rincian__parent">
                        <div class="pengelola-pesanan-rincian--detail">
                            <div class="pengelola-pesanan-rincian--detail__child-1">
                                <div class="pengelola-pesanan-rincian--detail__child-1__header-1">
                                        <p class="bigger--regular-text__bold  paragraph pb-4">{{ kos_booking_model.kode }}</p>
                                        <p class="bigger--regular-text__medium ">{{ date }}</p>
                                </div>
                                <div class="pengelola-pesanan-rincian--detail__child-1__header-2">
                                    <p class="pengelola__belum--verifikasi regular-text__medium" v-if="kos_booking_model.status == 'Menunggu Konfirmasi Pengelola'">{{ kos_booking_model.status }}</p>
                                    <p class="pengelola__dibatalkan regular-text__medium" v-else-if="kos_booking_model.status == 'Dibatalkan'">{{ kos_booking_model.status }}</p>
                                    <p class="pengelola__terkonfirmasi regular-text__medium" v-else-if="kos_booking_model.status == 'Terkonfirmasi'">Berhasil</p>
                                </div>
                            </div>
                            <div class="pengelola-pesanan-rincian--detail__child-2">
                                <div class="pengelola-pesanan-rincian--detail__child-2--line"></div>
                            </div>
                            <div class="pengelola-pesanan-rincian--detail__child-3">
                                <div class="pengelola-pesanan-rincian--detail__child-3__desc-1">
                                    <p class="bigger--regular-text">Nama Penyewa</p>
                                </div>
                                <div class="pengelola-pesanan-rincian--detail__child-3__desc-2">
                                    <p class="bigger--regular-text__medium ">{{ kos_booking_model.user.name }}</p>
                                </div>
                                <div class="pengelola-pesanan-rincian--detail__child-3__desc-3">
                                    <p class="bigger--regular-text">Tanggal Masuk</p>
                                </div>
                                <div class="pengelola-pesanan-rincian--detail__child-3__desc-4">
                                    <p class="bigger--regular-text__medium ">{{ tanggal_mulai }}</p>
                                </div>
                                <div class="pengelola-pesanan-rincian--detail__child-3__desc-5">
                                    <p class="bigger--regular-text">Tanggal Selesai</p>
                                </div>
                                <div class="pengelola-pesanan-rincian--detail__child-3__desc-6">
                                    <p class="bigger--regular-text__medium ">{{ tanggal_selesai }}</p>
                                </div>
                                <div class="pengelola-pesanan-rincian--detail__child-3__desc-7">
                                    <p class="bigger--regular-text">Jumlah Kamar</p>
                                </div>
                                <div class="pengelola-pesanan-rincian--detail__child-3__desc-8">
                                    <p class="bigger--regular-text__medium ">{{ kos_booking_model.total_kamar }} Kamar</p>
                                </div>
                                <div class="pengelola-pesanan-rincian--detail__child-3__desc-9">
                                    <p class="bigger--regular-text" v-if="kos_booking_model.kamar.length > 0">Nomor Kamar</p>
                                </div>
                                <div class="pengelola-pesanan-rincian--detail__child-3__desc-10">
                                    <div v-for="(nomor, index) in kos_booking_model.kamar" :key="index">
                                        <p class="bigger--regular-text__medium " v-if="index+1 < kos_booking_model.kamar.length">{{ nomor.number }}, &nbsp; </p>    
                                        <p class="bigger--regular-text__medium " v-if="index+1 === kos_booking_model.kamar.length">{{ nomor.number }} </p>    
                                    </div>
                                </div>
                            </div>
                            <div class="pengelola-pesanan-rincian--detail__child-4">
                                <p class="bigger--regular-text__medium ">Total Biaya</p>
                                <p class="bigger--regular-text__bold  paragraph">Rp{{ total_harga }}</p>
                            </div>
                        </div>
                        <div class="pengelola-pesanan-rincian--action" v-if="kos_booking_model.status == 'Menunggu Konfirmasi Pengelola'">
                            <div class="pengelola-pesanan-rincian--action--child-1" v-if="kos_booking_model.status == 'Menunggu Konfirmasi Pengelola'">
                                <v-layout v-for="index in kos_booking_model.total_kamar" :key="index">
                                    <v-select
                                        outlined
                                        label="Masukkan Nomor Kamar"
                                        v-model="nomor_kamar[index-1]"
                                        :items="nomor_kamar_kosong"
                                        :rules=[rules.required]
                                    ></v-select>
                                </v-layout>
                            </div>
                            <div class="pengelola-pesanan-rincian--action--child-2" v-if="kos_booking_model.status == 'Menunggu Konfirmasi Pengelola'">
                                <v-btn color="#146C94" outlined elevation="0" @click="imageDialog = true" class="" >Lihat Bukti Transfer</v-btn>
                            </div>
                            <div class="pengelola-pesanan-rincian--action--child-3" v-if="kos_booking_model.status != 'Terkonfirmasi' && kos_booking_model.status != 'Dibatalkan'">
                                <div class="pengelola-pesanan-rincian--action--child-3--1">
                                    <v-btn color="#DF2E38" elevation="0" @click="dialog_konfirmasi_batal = true" class="btn__main white--text pengelola-pesanan-rincian--action__btn" >Batalkan</v-btn>
                                </div>
                                <div class="pengelola-pesanan-rincian--action--child-3--2">
                                    <v-btn color="#146C94" elevation="0" type="submit" class="btn__main white--text pengelola-pesanan-rincian--action__btn" >Terima</v-btn>
                                </div>
                            </div>
                        </div>
                    </div>                        
                </v-form>
            </v-card>
        </v-layout>
        <v-layout column class="layout-main" mt-6 v-else-if="!this.model_transaksi">
            <p class="title__medium">Belum terdapat transaksi</p>
        </v-layout>
        
        <v-dialog v-model="dialog_konfirmasi_batal" persistent content-class="pengelola-pesanan-rincian__dialog">
            <v-card class="pa-4">
                <p class="regular-text__medium">Ingin Membatalkan Pesanan?</p>
                <v-layout justify-center class="pt-4">
                    <v-btn outlined class="mr-2" @click="dialog_konfirmasi_batal = false">Keluar</v-btn>
                    <v-btn color="red" class="ml-2 white--text" @click="submitForm('Dibatalkan')">Batalkan</v-btn>
                </v-layout>
            </v-card>
        </v-dialog>

        <v-dialog v-model="imageDialog" :lazy="true" content-class="pengelola-pesanan-rincian__dialog">
            <v-card class="rounded-card">
                <v-toolbar dark color="primary" dense flat>
                </v-toolbar>

                <v-layout row wrap fill-height class="pa-0 ma-0">
                    <v-flex class="text-xs-center pa-0 ma-0">
                        <v-img
                            :src="url_dialog"
                            max-width="100%"
                            contain
                            class="grey lighten-5"
                        ></v-img>
                    </v-flex>
                </v-layout>

                <v-card-actions py-0 px-4 ma-0>
                    <v-flex class="ma-0 pa-2 justify-center">
                        <v-btn small raised round color="primary" class="right mx-2" @click="imageDialog = false" dark>Close</v-btn>
                    </v-flex>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom class="white--text">{{ error_message }}</v-snackbar>
    </v-container>
</template>

<script>
    export default {
        name: 'pengelola-rincian-pesanan',
        props:{
            api: {
                type: String,
                required: true
            },
            apiKamarKosong: {
                type: String,
                required: true
            },
        },
        data(){
            return{
                ready: false,
                valid: false,
                id: null,
                form_pesanan_pengelola: false,
                snackbar: '',
                color: '',
                error_message: '',
                kos_booking_model:{},

                tanggal_mulai: '',
                tanggal_selesai: '',
                date: '',
                total_harga: '',
                model_transaksi: false,

                user_model: [],
                userName: [],
                
                kamar_kosong_model:[],
                nomor_kamar_kosong: [],

                nomor_kamar: [],
                dialog_konfirmasi_batal: false,

                imageDialog: false,
                url_dialog: '',

                rules: {
                    required: value => !!value || 'Required.',
                    min: v => v.length >= 8 || 'Min 8 characters',
                },

                jumlah_kamar: null,
            }
        },
        created(){
            this.initData();
            this.initModel();
        },
        methods:{
            initData(){
                this.id = this.$route.params.id;


                this.devLog('this.id');
                this.devLog(this.id);
                this.getData();
                this.getKamar();
            },

            initModel(){
                this.kos_booking_model = {
                    id: null,
                    kode: '',
                    date: '',
                    tanggal_mulai: '',
                    tanggal_selesai: '',
                    total_bulan: null,
                    total_kamar: null,
                    total_price: null,
                    kamar: [],
                    user: {},

                    bukti_transfer: [],
                    nomor_kamar: [],
                }
            },
            
            validateForm () {
                this.devLog('valid')
                this.devLog("validating");
                // this.devLog(this.valid);
                this.valid = (this.$refs.form_pesanan_pengelola).validate();
                this.devLog(this.valid);

                if (this.valid == true) {
                    this.submitForm('Terima');
                }else{
                    // window.scrollTo(0,0);
                }
            },

            submitForm(item){
                this.devLog('submit form');
                this.devLog(item);

                this.kos_booking_model.nomor_kamar = [];

                for(let i = 0; i < this.nomor_kamar.length; i++){
                    this.kos_booking_model.nomor_kamar.push(this.nomor_kamar[i])
                }

                function hasDuplicates(array) {
                    return (new Set(array)).size !== array.length;
                }

                this.devLog(hasDuplicates(this.kos_booking_model.nomor_kamar))

                if(!hasDuplicates(this.kos_booking_model.nomor_kamar)){
                    if(item === 'Dibatalkan'){
                        this.kos_booking_model.status = 'Dibatalkan';
                    }else{
                        this.kos_booking_model.status = 'Terkonfirmasi';
                    }
                
                    this.devLog("Trying to connect... "+ this.api + " with : " + JSON.stringify(this.kos_booking_model));
                    this.devLog(JSON.stringify(this.kos_booking_model));
                    this.devLog(this.kos_booking_model);
    
                    this.$http.put(this.api+this.id, this.kos_booking_model, {headers : {
                            Authorization: localStorage.token,
                        }})
                    .then(response => {
                        this.devLog("Result Code: " +response.status);
                        if(response.status == 202){
                            if(response.data.api_status == "fail"){
                                this.devLog('response fail')
                                this.error_message = response.data.api_title;
                                this.color = "red";
                                this.snackbar = true;
                            }else{
                                this.dialog_konfirmasi_batal = false;
                                this.$router
                                    .push({ path: '/pengelola-pesanan' })
                                    .then(() => { this.$router.go() })
                            }
                        }
                    }).catch((err)=>{
                        this.error_message = err.response.data.message;
                        this.color = "red";
                        this.snackbar = true;
                    });
                }else{
                    this.error_message = 'Nomor Kamar Terduplikasi';
                    this.color = "red";
                    this.snackbar = true;
                }
            
            },

            getData(){
                this.devLog('get data');

                this.$http.get(this.api+this.id, {headers : {
                        Authorization: localStorage.token,
                    }})
                .then(response => {
                    this.devLog("get data Result Code: " +response.status);
                    if(response.status == 200){
                        if(response.data.api_status == "fail"){
                            this.devLog('response fail')
                            this.error_message = response.data.api_title;
                            this.color = "red";
                            this.snackbar = true;
                            this.model_transaksi = false;
                            
                        }else{
                            this.kos_booking_model = response.data.data[0];
                            if(this.kos_booking_model.bukti_transfer){
                                this.url_dialog = this.kos_booking_model.bukti_transfer.photo_path;
                            }
                            this.devLog(this.kos_booking_model)
                            this.jumlah_kamar = this.kos_booking_model.total_kamar;
                            this.model_transaksi = true;
                            this.ready = true;
                            this.getDateAndPrice();
                        }
                    }
                }).catch((err)=>{
                    this.devLog(err);
                    this.error_message = err.response;
                    this.color = "red";
                    this.snackbar = true;
                    this.model_transaksi = false;
                    this.ready = false;
                });
            },

            getDateAndPrice(){
                this.devLog('get date')
                
                let tglMulai = new Date(this.kos_booking_model.tanggal_mulai);
                let tglSelesai = new Date(this.kos_booking_model.tanggal_selesai);
                let tglPesan = new Date(this.kos_booking_model.date);

                const options = {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                };

                this.tanggal_mulai = tglMulai.toLocaleDateString(["ban", "id"], options)
                this.tanggal_selesai = tglSelesai.toLocaleDateString(["ban", "id"], options)
                this.total_harga = this.kos_booking_model.total_price.toLocaleString("de-DE")

                function padTo2Digits(num) {
                    return String(num).padStart(2, '0');
                }

                let tanggalPesanString = tglPesan.toLocaleDateString(["ban", "id"], options)
                const hoursAndMinutes =
                    padTo2Digits(tglPesan.getHours()) + ':' + padTo2Digits(tglPesan.getMinutes());

                this.date = tanggalPesanString + ', ' +hoursAndMinutes;
            },

            getKamar(){
                this.$http.get(this.apiKamarKosong, {headers : {
                    Authorization: localStorage.token,
                }})
                .then(response => {
                    this.devLog("get kamar Result Code: " +response.status);
                    if(response.status == 200){
                        if(response.data.api_status == "fail"){
                            this.devLog('response fail')
                            this.error_message = response.data.api_title;
                            this.color = "red";
                            this.snackbar = true;
                            this.model_transaksi = false;
                            
                        }else{
                            this.kamar_kosong_model = response.data.data;
                            this.getKamarKosong();
                        }
                    }
                }).catch((err)=>{
                    this.devLog(err);
                    this.error_message = 'Data Empty';
                    this.color = "red";
                    this.snackbar = true;
                    this.model_transaksi = false;
                });
            },

            getKamarKosong(){
                this.devLog('kamar kosong model');
                this.devLog(this.kamar_kosong_model)
                this.kamar_kosong_model.forEach((element) => {
                    this.devLog('element');
                    // this.devLog(element.number);
                    this.nomor_kamar_kosong.push(element.number);
                })
            }

        },
    }
</script>

<style scoped>

</style>