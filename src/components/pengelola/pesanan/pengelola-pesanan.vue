<template>
    <v-container grid-list-md class="pt-0" v-if="ready">
        <v-snackbar v-model="snackbarLoading" :color="color" timeout="-1" bottom class="white--text"><v-progress-circular
            indeterminate
            color="#fff"
        ></v-progress-circular> {{ snackbarLoading_message }}</v-snackbar>

        <div class="pengelola-pesanan__header" v-if="this.model_ready">
            <div class="pengelola-pesanan__child-1">
                <div class="pengelola-pesanan__child-1__title">
                    <v-layout align-start>
                        <p class="title__main">Pesanan</p>
                    </v-layout>
                </div>
            </div>
            <div class="pengelola-pesanan__child-2">
                <div class="pengelola-pesanan__child-2__search">
                    <v-layout justify-end align-end>
                        <v-text-field
                            outlined
                            label="Masukkan Pencarian"
                            v-model="keyword_search"
                            @click:append="xSearch()"
                            @keydown.enter.prevent="xSearch()"
                            append-icon="search"
                            clearable
                        ></v-text-field>
                    </v-layout>
                </div>
                <div class="pengelola-pesanan__child-2__sort">
                    <v-select
                        outlined
                        label="Urutkan"
                        v-model="data_sort"
                        :items="data_sort_items"
                        hide-details
                    ></v-select>
                </div>
                <div class="pengelola-pesanan__child-2__filter">
                    <v-btn color="#146C94" class="white--text bigger--regular-text__thin btn-filter" elevation="0" @click="dialog_filter = true">Filter <span class="material-icons" style="color: #fff">
                        filter_alt
                        </span>
                    </v-btn>
                </div>
            </div>
        </div>
        <hr v-if="this.model_ready">

        <v-layout column class="layout-main" mt-6 v-if="model_transaksi && this.model_ready">
            <v-card class="card__regular mt-4" v-for="(kos_booking, index) in kos_booking_model" :key="'kos_booking-'+index">
                <div class="pengelola-pesanan--detail">
                    <div class="pengelola-pesanan--detail__child-1">
                        <div class="pengelola-pesanan--detail__child-1__header-1">
                            <p class="regular-text__bold  paragraph pb-4">{{ kos_booking.kode }}</p>
                            <p class="regular-text__medium ">{{ date[index] }}</p>
                        </div>
                        <div class="pengelola-pesanan--detail__child-1__header-2">
                            <p class="pengelola__belum--verifikasi regular-text__medium" v-if="kos_booking.status == 'Menunggu Konfirmasi Pengelola'">{{ kos_booking.status }}</p>
                            <p class="pengelola__terkonfirmasi regular-text__medium" v-else-if="kos_booking.status == 'Terkonfirmasi'">Berhasil</p>
                            <p class="pengelola__dibatalkan regular-text__medium" v-else-if="kos_booking.status == 'Dibatalkan'">Dibatalkan</p>
                        </div>
                    </div>
                    <div class="pengelola-pesanan--detail__child-2">
                        <div class="pengelola-pesanan--detail__child-2--line"></div>
                    </div>
                    <div class="pengelola-pesanan--detail__child-3">
                        <div class="pengelola-pesanan--detail__child-3__desc-1">
                            <p class="regular-text">Nama Penyewa</p>
                        </div>
                        <div class="pengelola-pesanan--detail__child-3__desc-2">
                            <p class="regular-text__medium ">{{ kos_booking.user.name }}</p>
                        </div>
                        <div class="pengelola-pesanan--detail__child-3__desc-3">
                            <p class="regular-text">Tanggal Masuk</p>
                        </div>
                        <div class="pengelola-pesanan--detail__child-3__desc-4">
                            <p class="regular-text__medium ">{{ tanggal_mulai[index] }}</p>
                        </div>
                        <div class="pengelola-pesanan--detail__child-3__desc-5">
                            <p class="regular-text">Tanggal Selesai</p>
                        </div>
                        <div class="pengelola-pesanan--detail__child-3__desc-6">
                            <p class="regular-text__medium ">{{ tanggal_selesai[index] }}</p>
                        </div>
                        <div class="pengelola-pesanan--detail__child-3__desc-7">
                            <p class="regular-text">Jumlah Kamar</p>
                        </div>
                        <div class="pengelola-pesanan--detail__child-3__desc-8">
                            <p class="regular-text__medium ">{{ kos_booking.total_kamar }} Kamar</p>
                        </div>
                        <div class="pengelola-pesanan--detail__child-3__desc-9" v-if="kos_booking.kamar.length > 0">
                            <p class="regular-text" >Nomor Kamar</p>
                        </div>
                        <div class="pengelola-pesanan--detail__child-3__desc-10" v-if="kos_booking.kamar.length > 0">
                            <div v-for="(nomor, index) in kos_booking.kamar" :key="index">
                                <p class="regular-text__medium " v-if="index+1 < kos_booking.kamar.length">{{ nomor.number }}, &nbsp; </p>    
                                <p class="regular-text__medium " v-if="index+1 === kos_booking.kamar.length">{{ nomor.number }} </p>    
                            </div>
                        </div>

                    </div>
                    <div class="pengelola-pesanan--detail__child-4">
                        <div class="pengelola-pesanan--detail__child-4__desc-1">
                            <p class="regular-text__medium ">Total Biaya</p>
                            <p class="regular-text__bold  paragraph">Rp{{ total_harga[index] }}</p>
                        </div>
                        <div class="pengelola-pesanan--detail__child-4__desc-2">
                            <div class="pengelola-pesanan--detail__child-4__desc-2--1" v-if="kos_booking.status != 'Menunggu Konfirmasi Pengelola'">
                                <v-btn color="#DF2E38" class="white--text regular-text__thin pengelola-pesanan--detail__child-4__desc-2__btn" elevation="0" @click="deleteItem(kos_booking)">Hapus Pesanan</v-btn>
                            </div>
                            <div class="pengelola-pesanan--detail__child-4__desc-2--2">
                                <v-btn color="#146C94" class="white--text regular-text__thin pengelola-pesanan--detail__child-4__desc-2__btn" elevation="0" @click="getDetail(kos_booking.id)">Lihat Detail</v-btn>
                            </div>
                        </div>
                    </div>
                </div>
            </v-card>
        </v-layout>
        <v-layout column class="layout-main" mt-6 v-else-if="!model_transaksi && this.model_ready">
            <p class="title__medium">Belum terdapat transaksi</p>
        </v-layout>
        <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom class="white--text">{{ error_message }}</v-snackbar>

        <v-dialog v-model="dialog_filter" persistent content-class="filter-dialog">
            <v-card class="pa-4">
                <p class="bigger--regular-text__medium  pb-4">Filter Kamar</p>
                <v-form @submit.prevent="validateForm()" v-model="valid" ref="form_filter" autofocus lazy-validation>
                    <v-layout column>
                        <v-layout align-start column>
                            <p class="regular-text px-2">Tanggal Pemesanan</p>
                        </v-layout>
                        <v-layout row wrap class="pa-4">
                            <v-flex xs6 class="px-2">
                                <v-menu
                                    ref="dialogStartDate"
                                    v-model="menu_startDate"
                                    :return-value.sync="filter.date.start_date"
                                    :close-on-content-click="false"
                                    elevation="0"
                                    min-width="0%"
                                >
                                    <template v-slot:activator="{ on }">
                                        <v-text-field
                                            v-model="filter.date.start_date"
                                            label="Mulai dari"
                                            append-icon="event"
                                            readonly
                                            v-on="on"
                                            outlined
                                            clearable
                                        ></v-text-field>
                                    </template>
                                    <v-date-picker v-model="filter.date.start_date" scrollable>
                                        <v-spacer></v-spacer>
                                        <v-btn text color="primary" @click="menu_startDate = false">Cancel</v-btn>
                                        <v-btn text color="primary" @click="$refs.dialogStartDate.save(filter.date.start_date)">OK</v-btn>
                                    </v-date-picker>
                                </v-menu>
                            </v-flex>
                            <v-flex xs6 class="px-2">
                                <v-menu
                                    ref="dialogEndDate"
                                    v-model="menu_endDate"
                                    :return-value.sync="filter.date.end_date"
                                    :close-on-content-click="false"
                                    elevation="0"
                                    min-width="0%"
                                >
                                    <template v-slot:activator="{ on }">
                                        <v-text-field
                                            v-model="filter.date.end_date"
                                            label="Sampai"
                                            append-icon="event"
                                            readonly
                                            v-on="on"
                                            outlined
                                            clearable
                                        ></v-text-field>
                                    </template>
                                    <v-date-picker v-model="filter.date.end_date" scrollable>
                                        <v-spacer></v-spacer>
                                        <v-btn text color="primary" @click="menu_endDate = false">Cancel</v-btn>
                                        <v-btn text color="primary" @click="$refs.dialogEndDate.save(filter.date.end_date)">OK</v-btn>
                                    </v-date-picker>
                                </v-menu>
                            </v-flex>
                        </v-layout>
                    </v-layout>
                    <v-layout row wrap class="pa-4">
                        <v-flex xs6 class="px-2">
                            <v-layout column justify-start>
                                <v-layout align-start column>
                                    <p class="regular-text">Nomor Pesanan</p>
                                </v-layout>
                                <v-text-field
                                    v-model="filter.kode"
                                    label="Nomor Pesanan"
                                    outlined
                                    clearable
                                ></v-text-field>
                                <v-layout align-start column>
                                    <p class="regular-text">Nama Penyewa</p>
                                </v-layout>
                                <v-text-field
                                    v-model="filter.user_name"
                                    label="Nama Penyewa"
                                    outlined
                                    clearable
                                ></v-text-field>
                                <v-layout align-start column>
                                    <p class="regular-text">Tanggal Masuk</p>
                                </v-layout>
                                <v-menu
                                    ref="dialogTglMulai"
                                    v-model="menu_tgl_mulai"
                                    :return-value.sync="filter.tanggal_mulai"
                                    :close-on-content-click="false"
                                    elevation="0"
                                    min-width="0%"
                                >
                                    <template v-slot:activator="{ on }">
                                        <v-text-field
                                            v-model="filter.tanggal_mulai"
                                            label="Masukkan Tanggal Mulai Booking"
                                            append-icon="event"
                                            readonly
                                            v-on="on"
                                            outlined
                                            clearable
                                        ></v-text-field>
                                    </template>
                                    <v-date-picker v-model="filter.tanggal_mulai" scrollable>
                                        <v-spacer></v-spacer>
                                        <v-btn text color="primary" @click="menu_tgl_mulai = false">Cancel</v-btn>
                                        <v-btn text color="primary" @click="$refs.dialogTglMulai.save(filter.tanggal_mulai)">OK</v-btn>
                                    </v-date-picker>
                                </v-menu>
                                <v-layout align-start column>
                                    <p class="regular-text">Tanggal Selesai</p>
                                </v-layout>
                                <v-menu
                                    ref="dialogTglSelesai"
                                    v-model="menu_tgl_selesai"
                                    :return-value.sync="filter.tanggal_selesai"
                                    :close-on-content-click="false"
                                    elevation="0"
                                    min-width="0%"
                                >
                                    <template v-slot:activator="{ on }">
                                        <v-text-field
                                            v-model="filter.tanggal_selesai"
                                            label="Masukkan Tanggal Selesai Booking"
                                            append-icon="event"
                                            readonly
                                            v-on="on"
                                            clearable
                                            outlined
                                        ></v-text-field>
                                    </template>
                                    <v-date-picker v-model="filter.tanggal_selesai" scrollable>
                                        <v-spacer></v-spacer>
                                        <v-btn text color="primary" @click="menu_tgl_selesai = false">Cancel</v-btn>
                                        <v-btn text color="primary" @click="$refs.dialogTglSelesai.save(filter.tanggal_selesai)">OK</v-btn>
                                    </v-date-picker>
                                </v-menu>
                            </v-layout>

                        </v-flex>
                        <v-flex xs6 class="px-2">
                            <v-layout column justify-start>
                                <v-layout align-start column>
                                    <p class="regular-text">Total Bulan</p>
                                </v-layout>
                                <v-text-field
                                    v-model="filter.total_bulan"
                                    label="Masukkan Total Bulan"
                                    outlined
                                    type="number"
                                    hide-spin-buttons
                                    clearable
                                ></v-text-field>
                                <v-layout align-start column>
                                    <p class="regular-text">Total Kamar</p>
                                </v-layout>
                                <v-text-field
                                    v-model="filter.nomor_kamar"
                                    label="Masukkan Nomor Kamar"
                                    outlined
                                    type="number"
                                    clearable
                                    hide-spin-buttons
                                ></v-text-field>
                                <v-layout align-start column>
                                    <p class="regular-text">Total Harga</p>
                                </v-layout>
                                <v-text-field
                                    v-model="filter.total_price"
                                    label="Masukkan Total Harga"
                                    outlined
                                    :prefix="prefix"
                                    type="number"
                                    clearable
                                    hide-spin-buttons
                                ></v-text-field>
                            </v-layout>
                        </v-flex>
                    </v-layout>

                    <v-layout justify-center class="pt-4">
                        <v-btn  elevation="0" class="white--text btn__close-dialog mr-2 filter-dialog__btn" @click="dialog_filter = false">Tutup</v-btn>
                        <v-btn elevation="0" class="white--text btn__unduh ml-2 filter-dialog__btn" type="submit" >FILTER</v-btn>
                    </v-layout>
                </v-form>
             </v-card>
        </v-dialog>

        <v-dialog v-model="dialog_konfirmasi_hapus" persistent content-class="dialog-list__hapus">
            <v-card class="pa-4">
                <p class="regular-text__medium" style="text-align: center">Ingin Menghapus Pesanan {{ list_temp_title }}?</p>
                <v-layout justify-center class="pt-4">
                    <v-btn outlined class="mr-2" @click="closeDialog()">Keluar</v-btn>
                    <v-btn color="red" class="ml-2 white--text" @click="hapusPesanan()">Hapus</v-btn>
                </v-layout>
            </v-card>
        </v-dialog>

    </v-container>
</template>

<script>
export default {
    name: 'pengelola-pesanan',
    props:{
        api: {
            type: String,
            required: true
        },
        apiSearch: {
            type: String,
            required: true
        },
        apiFilter: {
            type: String,
            required: true
        },
        apiSort: {
            type: String,
            required: true
        },
        prefix: {
			type: String,
            default: "Rp.",
		},
    },
    data(){
        return{
            model_ready: false,
            snackbarLoading: false, 
            snackbarLoading_message: '',

            ready: false,
            snackbar: '',
            color: '',
            error_message: '',
            kos_booking_model:{},

            tanggal_mulai: [],
            tanggal_selesai: [],
            date: [],
            total_harga: [],
            model_transaksi: false,

            user_model: [],
            userName: [],

            keyword_search: '',
            dialog_filter: false,
            filter: {},

            menu_tgl_mulai: false,
            menu_tgl_selesai: false,

            menu_startDate: false,
            menu_endDate: false,
            valid: false,

            data_sort: 'Status Menunggu Konfirmasi',
            data_sort_items: ['Status Menunggu Konfirmasi', 'Tanggal Awal - Akhir', 'Tanggal Akhir - Awal', 'Harga Termurah', 'Harga Tertinggi'],
            data_sort_model: {},

            dialog_konfirmasi_hapus: false,
            list_temp: null,
            list_temp_title: null,
        }   
    },
    created(){


        this.initData();
    },
    watch:{ 
        'keyword_search'(newVal, oldVal){
            if(newVal != oldVal){
                if(newVal == ''){
                    this.devLog('keyword search watch')
                    this.devLog('new val = ' + newVal)
                    this.devLog('old val = ' + oldVal)
                    this.getData();
                }
            }
        },        
        'data_sort'(newVal, oldVal){
            if(newVal != oldVal){
                this.devLog('data sort')
                this.devLog('new val = ' + newVal)
                this.devLog('old val = ' + oldVal)
                this.sortData(newVal);
            }
        }
    },
    methods:{
        initData(){
            this.snackbarLoading = true;
            this.snackbarLoading_message = 'Loading';
            this.color = "orange darken-2";

            this.initModel();
            this.getData();
        },

        initModel(){
            this.kos_booking_model = {
                kode: '',
                date: '',
                tanggal_mulai: '',
                tanggal_selesai: '',
                total_bulan: null,
                total_kamar: null,
                total_price: null,
            }

            this.filter = {
                user_name : '',
                nomor_kamar: '',
                kode: '',
                date: {
                    start_date: '',
                    end_date: '',
                },
                tanggal_mulai: '',
                tanggal_selesai: '',
                status: '',
                total_price: '',
            }

            this.data_sort_model = {
                sort_data : ''
            }
        },

        getData(){
            this.devLog('created init data');
            this.devLog('get data');

            this.$http.get(this.api, {headers : {
                Authorization: localStorage.token,
            }})
            .then(response => {
                this.snackbarLoading = false;
                this.model_ready = true;
                this.devLog("axios Result Code: " +response.status);
                if(response.status == 200){
                    if(response.data.api_status == "fail"){
                        this.devLog('response fail')
                        this.error_message = response.data.api_title;
                        this.color = "red";
                        this.snackbar = true;
                        this.model_transaksi = false;
                    }else{
                        this.kos_booking_model = response.data.data;
                        this.devLog(this.kos_booking_model)
                        this.model_transaksi = true;
                        this.getDateAndPrice();
                        this.ready = true;
                    }
                }
            }).catch((err)=>{
                this.snackbarLoading = false;
                this.model_ready = true;
                this.devLog(err);
                this.error_message = err.response.data;
                this.color = "red";
                this.snackbar = true;
                this.model_transaksi = false;
                this.ready = false;
            });       
        },

        getDateAndPrice(){
            this.tanggal_mulai = [];
            this.tanggal_selesai = [];
            this.total_harga = [];
            this.date = [];

            this.devLog('get date')
            this.devLog(this.kos_booking_model);
            
            
            this.kos_booking_model.forEach((element) => {
                let tglMulai = new Date(element.tanggal_mulai);
                let tglSelesai = new Date(element.tanggal_selesai);
                let tglPesan = new Date(element.date);

                
                const options = {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                };

                this.tanggal_mulai.push(tglMulai.toLocaleDateString(["ban", "id"], options))
                this.tanggal_selesai.push(tglSelesai.toLocaleDateString(["ban", "id"], options))
                this.total_harga.push(this.formatPrice(element.total_price));

                function padTo2Digits(num) {
                    return String(num).padStart(2, '0');
                }

                let tanggalPesanString = tglPesan.toLocaleDateString(["ban", "id"], options)
                const hoursAndMinutes =
                    padTo2Digits(tglPesan.getHours()) + ':' + padTo2Digits(tglPesan.getMinutes());

                this.date.push(tanggalPesanString + ', ' +hoursAndMinutes);
            })
        },

        getDetail(items){
            this.devLog(items);

            // this.$router.push({
            //     name: 'rincian-pembayaran',
            //     params: {
            //         booking_id: items
            //     }
            // });
            this.$router.push('/pengelola-pesanan/'+items);

        },

        xSearch(){
            if(this.keyword_search.length > 2){
                this.devLog(this.keyword_search);
                let url = this.apiSearch + '?keyword=' +this.keyword_search;

                this.devLog(url);

                this.kos_booking_model = {};
                this.$http.get(url, 
                    {
                        headers : {Authorization: localStorage.token}
                    },
                    )
                .then(response => {
                    this.devLog("get search Result Code: " +response.status);
                    if(response.status == 200){
                        if(response.data.api_status == "fail"){
                            this.devLog('response fail')
                            this.error_message = response.data.api_title;
                            this.color = "red";
                            this.snackbar = true;
                            this.model_transaksi = false;
                        }else{
                            this.devLog(response.data)
                            this.kos_booking_model = response.data;
                            this.devLog(this.kos_booking_model)
                            this.model_transaksi = true;
                            this.getDateAndPrice();
                            this.ready = true;
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

            }else{
                this.error_message = "Use minimum of 3 character as Search Keyword!";
                this.color = "red";
                this.snackbar = true;
            }
        },

        validateForm () {
            this.devLog('valid')
            this.devLog("validating");
            this.valid = (this.$refs.form_filter).validate();
            this.devLog(this.valid);

            if(this.filter.date.start_date && !this.filter.date.end_date){
                this.error_message = 'Silahkan Lengkapi Filter Tanggal Pemesanan';
                this.color = "red";
                this.snackbar = true;
                this.valid = false;
            }else if(!this.filter.date.start_date && this.filter.date.end_date){
                this.error_message = 'Silahkan Lengkapi Filter Tanggal Pemesanan';
                this.color = "red";
                this.snackbar = true;
                this.valid = false;
            }else if(this.filter.date.start_date && this.filter.date.end_date){
                if(this.filter.date.start_date > this.filter.date.end_date){
                    this.error_message = 'Masukkan Tanggal dengan Benar';
                    this.color = "red";
                    this.snackbar = true;
                    this.valid = false;
                }
            }

            if (this.valid == true) {
                this.filterKamar();
            }else{
                window.scrollTo(0,0);
            }
        },

        filterKamar(){
            this.devLog('filter kamar')
            this.devLog(JSON.stringify(this.filter))

            this.kos_booking_model = {};
            this.$http.post(this.apiFilter, this.filter, {
                    headers : {Authorization: localStorage.token}}
                )
            .then(response => {
                this.devLog("filter data Result Code: " +response.status);
                if(response.status == 200){
                    if(response.data.api_status == "fail"){
                        this.devLog('response fail')
                        this.error_message = response.data.api_title;
                        this.color = "red";
                        this.snackbar = true;
                        this.model_transaksi = false;
                    }else{
                        this.kos_booking_model = null;
                        this.devLog(response.data)
                        this.kos_booking_model = response.data;
                        this.devLog(this.kos_booking_model)
                        this.model_transaksi = true;
                        this.getDateAndPrice();
                        this.ready = true;

                        this.dialog_filter = false;
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

        sortData(item){
            // let data = [];
            // data.push({
            //     sort_data: item,
            // });
            this.data_sort_model.sort_data = item;

            this.kos_booking_model = null;
            this.devLog(JSON.stringify(this.data_sort_model));

            this.$http.post(this.apiSort, this.data_sort_model, {
                    headers : {Authorization: localStorage.token}}
                )
            .then(response => {
                this.devLog("sort data Result Code: " +response.status);
                if(response.status == 200){
                    if(response.data.api_status == "fail"){
                        this.devLog('response fail')
                        this.error_message = response.data.api_title;
                        this.color = "red";
                        this.snackbar = true;
                        this.model_transaksi = false;
                    }else{
                        this.kos_booking_model = null;
                        this.devLog(response.data)
                        this.kos_booking_model = response.data;
                        this.devLog(this.kos_booking_model)
                        this.model_transaksi = true;
                        this.getDateAndPrice();
                        this.ready = true;
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

        deleteItem(item){
            this.devLog(item)
            this.dialog_konfirmasi_hapus = true;
            this.list_temp = item;
            this.list_temp_title = item.kode;
        },
        closeDialog(){
            this.dialog_konfirmasi_hapus = false;
            this.list_temp = null;
        },

        hapusPesanan(){
            this.snackbarLoading = true;
            this.snackbarLoading_message = 'Loading';
            this.color = "orange darken-2";

            const id_temp = this.list_temp.id;

            this.dialog_konfirmasi_hapus = false;
            this.devLog(this.api+'/'+id_temp)

            this.$http.delete(this.api+'/'+id_temp, {headers : {
                    Authorization: localStorage.token,
                }})
                .then(response => {
                    this.snackbarLoading = false;
                    this.devLog(JSON.stringify(response));
                    if(response.status == 204){
                        this.closeDialog();
                        this.initData();
                    }
                }).catch((err) => {
                    this.snackbarLoading = false;
                    this.error_message = err.response.data.message;
                        this.color = "red";
                        this.snackbar = true;
                });
        },
    },
}
</script>

<style scoped>

</style>