<template>
    <v-container grid-list-md class="pt-0 container">
        <v-layout align-start column>
            <p class="thin-title paragraph">Rincian Pembayaran</p>
        </v-layout>
        <v-layout column v-if="this.model_pembayaran">
            <v-layout row class="pt-4">
                <v-flex xs8> 
                    <v-layout align-start column>
                        <p class="thin-bigger-regular-text">{{ kos_booking_model.kode }}</p>
                    </v-layout>
                </v-flex>
                <v-flex xs4>
                    <v-layout justify-end class="mt-0" column>
                        <p class="sudah--verifikasi-pengelola medium-regular-text">Pesanan {{ kos_booking_model.status }} Pengelola</p>
                        <p>&nbsp;</p>
                    </v-layout>
                </v-flex>
            </v-layout>
            <v-flex style="width: 80%;">
                <v-card class="card-regular">
                    <v-layout row>
                        <v-layout>
                            <p class="thin-bigger-regular-text paragraph">Silahkan transfer sebelum</p>
                        </v-layout>
                        <v-layout>

                        </v-layout>
                    </v-layout>
                </v-card>
                <v-card class="card-regular">
                    <v-layout row>
                        <v-layout column align-start>
                            <p class="medium-regular-text">{{ tanggal_mulai }} &ndash; {{ tanggal_selesai }}</p>
                            <p class="medium-regular-text">{{ kos_booking_model.total_kamar }} Kamar</p>
                        </v-layout>
                        <v-layout justify-end align-start class="mt-0">
                            <p class="medium-regular-text">{{ kos_booking_model.total_bulan }} Bulan</p>
                            <p>&nbsp;</p>
                        </v-layout>
                    </v-layout>
                    <v-layout row>
                        <v-layout align-start>
                            <p class="regular-text">Harga Kamar Bulanan</p>
                        </v-layout>
                        <v-layout justify-end>
                            <p class="thin-regular-text">Rp1.500.000</p>
                        </v-layout>
                    </v-layout>
                    <hr>
                    <v-layout row class="mt-6">
                        <v-layout align-start>
                            <p class="paragraph thin-bigger-regular-text">Total Biaya</p>
                        </v-layout>
                        <v-layout justify-end>
                            <p class="paragraph bold-bigger-regular-text">Rp{{ total_harga }}</p>
                        </v-layout>
                    </v-layout>
                </v-card>
                <v-card class="card-regular">
                    <v-layout row >
                        <v-flex xs4>
                            <v-layout align-start>
                                <p class="thin-bigger-regular-text">Transfer Biaya</p>
                            </v-layout>
                        </v-flex>
                        <v-flex xs8>
                            <v-layout column align-start>
                                <p class="bold-bigger-regular-text">{{ user_model.bank }}</p>
                                <p class="bold-bigger-regular-text">{{ user_model.rekening }}</p>
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

                        <!-- Create a File Input that will be hidden but triggered with JavaScript -->
                        <input 
                            type="file"
                            ref="file"
                            @change="onFileChange($event.target.files)"
                            style="display: none"
                            accept="image/*"
                        >
                        <p class="medium-regular-text mt-6">{{ fileName }}</p>
                    </v-layout>
                    <v-layout column align-start class="mt-12">
                        <p class="thin-regular-text">Silahkan tekan tombol Bayar</p>
                        <p class="paragraph thin-regular-text">Jika Anda sudah Unggah Bukti Transfer</p>
                    </v-layout>
                </v-card>
                <v-layout align-start class="my-12">
                    <v-btn color="#146C94" width="25%" class="white--text" elevation="0" @click="submitForm()">Bayar</v-btn>
                </v-layout>
            </v-flex>
        </v-layout>
        <v-layout column class="layout-main" mt-6 v-else-if="!this.model_pembayaran">
            <p class="thin-title">Silahkan Lakukan Pemesanan Terlebih Dahulu</p>
            <h3 class="thin-sub-title pt-2">Silahkan Cek Rincian Pesanan jika sudah melakukan  Pesanan</h3>
        </v-layout>
        <v-dialog v-model="errorDialog" max-width="300">
            <v-card>
                <v-card-text class="subheading">{{ errorText }}</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn @click="errorDialog = false" flat>Got it!</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom class="white--text">{{ error_message }}</v-snackbar>

    </v-container>
</template>

<script>

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

        data(){
            return{
                isSelecting: false,
                selectedFile: null,
                errorDialog: null,
                errorText: "",
                fileName: "",

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
            }
        },
        watch: {
            // '$route.path': function (path) {
            //     this.devLog("watching change");
            //     // this.initData();
            //     window.location.reload(true);
            // },
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
                this.getPengelola();
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

                    bukti_transfer: [],
                }
                this.user_model = {
                    rekening: '',
                    bank: '',
                }
            },

            getData(){
                this.devLog('get data');

                this.$http.get(this.api+this.id)
                .then(response => {
                    this.devLog("Login Result Code: " +response.status);
                    if(response.status == 200){
                        if(response.data.api_status == "fail"){
                            this.devLog('response fail')
                            this.error_message = response.data.api_title;
                            this.color = "red";
                            this.snackbar = true;
                            this.model_pembayaran = false;
                        }else{
                            this.kos_booking_model = response.data.data[0];
                            this.devLog(this.kos_booking_model)
                            this.model_pembayaran = true;
                            this.getDate();
                        }
                    }
                }).catch((err)=>{
                    this.devLog(err);
                    this.error_message = 'Data Empty';
                    this.color = "red";
                    this.snackbar = true;
                    this.model_pembayaran = false;
                });
                
            },

            getPengelola(){
                this.$http.get(this.apiPengelola)
                .then(response => {
                    this.devLog("pengelola Result Code: " +response.status);
                    if(response.status == 200){
                        if(response.data.api_status == "fail"){
                            this.devLog('response fail')
                            this.error_message = response.data.api_title;
                            this.color = "red";
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
                    this.color = "red";
                    this.snackbar = true;
                    this.model_pembayaran = false;
                });
            },

            getDate(){
                let tglMulai = new Date(this.kos_booking_model.tanggal_mulai);
                let tglSelesai = new Date(this.kos_booking_model.tanggal_selesai);
                
                this.devLog(tglMulai);

                const options = {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                };

                this.tanggal_mulai = tglMulai.toLocaleDateString(["ban", "id"], options)
                this.tanggal_selesai = tglSelesai.toLocaleDateString(["ban", "id"], options)
                this.total_harga = this.kos_booking_model.total_price.toLocaleString("de-DE");

            },

            submitForm(){
                if(this.kos_booking_model.bukti_transfer){
                    this.devLog("booking model : ");
                    this.devLog(this.kos_booking_model);
                    this.devLog(this.apiPembayaran+this.kos_booking_model.id)
                    this.$http.put(this.apiPembayaran+this.kos_booking_model.id)
                    .then(response => {
                        this.devLog(response.status);
                        if(response.status == 200){
                            this.devLog("Loading "+ this.apiPembayaran + " - Result Status: " +response.status);
                            this.devLog(response.data);
                            // var me = JSON.parse(localStorage.userLogin);
                            // this.devLog(`Me ID : ${me.id} vs User ID : ${this.user.id}`);
                            // if(me.id === this.user.id){
                            //     this.devLog('me id === user id')
                            //     this.updateUserLogin(this.user.id);
                            //     this.error_message = 'Profile updated!';
                            //     this.color = "green";
                            //     this.snackbar = true;
                            // } 
                        }
                    }).catch((err) => {
                        // this.devLog(JSON.stringify(err))
                        this.error_message = err.message;
                        this.color = "red";
                        this.snackbar = true;
                    });
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
                        // let formData = new FormData();
                        this.fileName = imageFile.name;
                        // let imageURL = URL.createObjectURL(imageFile);
                        // let editable = true;
                        // let imgFile = null;

                        this.devLog("onfilechange");
                        let reader = new FileReader();
                        reader.onloadend = (e) => {
                            this.devLog(e.target);
                            let image_url = e.target.result;

                            this.kos_booking_model.bukti_transfer = image_url;

                            // this.kos_booking_model.bukti_transfer.push({
                            //     image_url: image_url,
                            // });
                        };
                        reader.readAsDataURL(imageFile);

                        // this.urls.push(imageURL);
                    }
                }
            },
 
        },
    }
</script>

<style>
</style>