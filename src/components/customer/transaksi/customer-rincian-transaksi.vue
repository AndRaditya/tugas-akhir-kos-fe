<template>
    <v-container grid-list-xs class="pt-0" v-if="ready">
        <v-layout row class="mb-6">
            <v-flex xs8>
                <v-layout align-start>
                    <p class="thin-title paragraph">Rincian Transaksi</p>
                </v-layout>
            </v-flex>
            <v-flex xs4 v-if="this.model_transaksi">
                <v-layout justify-end column>
                    <v-text-field
                        outlined
                        label="Masukkan Pencarian"
                        v-model="keyword_search"
                        @click:append="xSearch()"
                        @keydown.enter.prevent="xSearch()"
                        append-icon="search"
                        clearable
                    ></v-text-field>
                    <v-layout row align-center justify-end wrap>
                        <v-flex xs6>
                            <v-layout justify-end>
                                <v-select
                                    outlined
                                    label="Urutkan"
                                    v-model="data_sort"
                                    :items="data_sort_items"
                                    hide-details
                                ></v-select>
                            </v-layout>
                        </v-flex>
                        <v-flex xs3>
                            <v-layout justify-end>
                                <v-btn color="#146C94" class="white--text thin-bigger-regular-text btn-filter" elevation="0" @click="dialog_filter = true">Filter <span class="material-icons" style="color: #fff">
                                    filter_alt
                                    </span>
                                </v-btn>
                            </v-layout>
                        </v-flex>
                    </v-layout>
                </v-layout>
            </v-flex>
        </v-layout>
        <hr>

        <v-layout column class="layout-main" mt-6 v-if="this.model_transaksi">
            <v-card class="card-regular" v-for="(kos_booking, index) in kos_booking_model" :key="'kos_booking-'+index">
                <v-layout column>
                    <v-layout row align-start>
                        <v-layout column align-start>
                            <p class="medium-bigger-regular-text">{{ date[index] }}</p>
                            <h3 class="thin-regular-text paragraph pb-2">{{ kos_booking.kode }}</h3>
                        </v-layout>
                        <v-layout justify-end class="mt-0">
                            <p class="sudah--verifikasi-pengelola medium-regular-text" v-if="kos_booking.status == 'Menunggu Konfirmasi Pengelola'">{{ kos_booking.status }}</p>
                            <p class="terkonfirmasi-pengelola medium-regular-text" v-else-if="kos_booking.status == 'Terkonfirmasi'">{{ kos_booking.status }}</p>
                            <p class="dibatalkan-pengelola medium-regular-text" v-else-if="kos_booking.status == 'Dibatalkan'">{{ kos_booking.status }}</p>
                        </v-layout>
                    </v-layout>
                    <hr>
                    <v-layout row class="mt-6">
                        <v-flex xs3>
                            <v-layout column align-start>
                                <p class="bigger-regular-text">Tanggal Masuk</p>
                                <p class="bigger-regular-text">Tanggal Selesai</p>
                                <p class="bigger-regular-text">Total Bulan</p>
                                <p class="bigger-regular-text">Jumlah Kamar</p>
                            </v-layout>
                        </v-flex>
                        <v-flex xs9>
                            <v-layout column align-start>
                                <p class="medium-bigger-regular-text">{{ tanggal_mulai[index] }}</p>
                                <p class="medium-bigger-regular-text">{{ tanggal_selesai[index] }}</p>
                                <p class="medium-bigger-regular-text">{{ kos_booking.total_bulan }} Bulan</p>
                                <p class="medium-bigger-regular-text">{{ kos_booking.total_kamar }} Kamar</p>
                            </v-layout>
                        </v-flex>
                    </v-layout>
                    <v-layout row class="mt-16">
                        <v-layout column align-start>
                            <p class="thin-bigger-regular-text">Total Biaya</p>
                            <p class="bold-bigger-regular-text paragraph">Rp{{ total_harga[index] }}</p>
                        </v-layout>
                        <v-layout justify-end v-if="kos_booking.status == 'Menunggu Konfirmasi Kamar'">
                            <v-btn color="#146C94" width="30%" class="white--text thin-bigger-regular-text" elevation="0" @click="redirectPayment(kos_booking.id)">Lakukan Pembayaran</v-btn>
                        </v-layout>
                    </v-layout>
                </v-layout>
            </v-card>
        </v-layout>
        <v-layout column class="layout-main" mt-6 v-else-if="!this.model_transaksi">
            <p class="thin-title">Silahkan Lakukan Pemesanan Terlebih Dahulu</p>
            <h3 class="thin-sub-title pt-2">Silahkan Cek Rincian Pesanan jika sudah melakukan  Pesanan</h3>
        </v-layout>
        <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom class="white--text">{{ error_message }}</v-snackbar>

        <v-dialog v-model="dialog_filter" persistent max-width="40vw">
            <v-card class="pa-4">
                <p class="medium-bigger-regular-text pb-4">Filter Kamar</p>
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
                    <v-layout column wrap class="pa-4">
                        <!-- <v-flex xs6 class="px-2"> -->
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
                        <!-- </v-flex> -->
                    </v-layout>

                    <v-layout justify-center class="pt-4">
                        <v-btn width="30%" elevation="0" class="white--text btn-close-dialog mr-2" @click="dialog_filter = false">Tutup</v-btn>
                        <v-btn elevation="0" class="white--text btn-unduh ml-2" type="submit" width="30%">FILTER</v-btn>
                    </v-layout>
                </v-form>
             </v-card>
        </v-dialog>

    </v-container>
</template>

<script>
    export default{
        name: 'rincian-transaksi',
        props: {
            api: {
                type: String,
                default: "no_data",
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
        data(){
            return{
                user_id: null,

                ready: false,

                kos_booking_model:{},
                kos_booking_length: [],
                snackbar: '',
                color: '',
                error_message: '',

                tanggal_mulai: [],
                tanggal_selesai: [],
                date: [],
                total_harga: [],
                model_transaksi: false,

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
            }

        },
        created(){
            this.initData();
        },
        methods:{
            redirectPayment(items){
                this.devLog(items);

                this.$router.push('/pembayaran/'+items);
            },

            initData(){
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
                    user_id: '',
                }

                this.data_sort_model = {
                    sort_data : ''
                }
            },

            getData(){
                this.devLog('get data');
                if(localStorage.userLogin){
                    let localStorageUser = localStorage.getItem('userLogin');
                    let user_login = JSON.parse(localStorageUser);
                    let user_id = user_login.id;
                    this.user_id = user_id;

                    this.$http.get(this.api+user_id, {headers : {
                        Authorization: localStorage.token,
                    }})
                    .then(response => {
                        this.devLog("transaksi Result Code: " +response.status);
                        if(response.status == 200){
                            if(response.data.api_status == "fail"){
                                this.devLog('response fail')
                                this.error_message = response.data.api_title;
                                this.color = "red";
                                this.snackbar = true;
                                this.model_transaksi = false;
                            }else{
                                this.ready = true;
                                this.kos_booking_model = response.data.data;
                                this.devLog(this.kos_booking_model)
                                if(this.kos_booking_model.length > 0){
                                    this.model_transaksi = true;
                                }
                                this.getDateAndPrice();
                            }
                        }
                    }).catch((err)=>{
                        this.devLog(err);
                        this.error_message = 'Data Empty';
                        this.color = "red";
                        this.snackbar = true;
                        this.model_transaksi = false;
                    });
                }else{
                    this.ready = false;
                }
            },

            getDateAndPrice(){
                this.tanggal_mulai = [];
                this.tanggal_selesai = [];
                this.total_harga = [];
                this.date = [];
                this.devLog('get date')
                
                this.kos_booking_model.forEach((element) => {
                    let tglMulai = new Date(element.tanggal_mulai);
                    let tglSelesai = new Date(element.tanggal_selesai);
                    let tglPesan = new Date(element.date);
                    
                    // this.devLog(tglMulai);

                    const options = {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    };
    
                    // this.devLog(tglMulai);
                    this.tanggal_mulai.push(tglMulai.toLocaleDateString(["ban", "id"], options))
                    this.tanggal_selesai.push(tglSelesai.toLocaleDateString(["ban", "id"], options))
                    this.date.push(tglPesan.toLocaleDateString(["ban", "id"], options));

                    this.total_harga.push(element.total_price.toLocaleString("de-DE"));
                })
            },

            xSearch(){
                if(this.keyword_search.length > 2){
                    this.devLog(this.keyword_search);
                    let url = this.apiSearch + '?keyword=' +this.keyword_search + '&users_id=' + this.user_id;

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
                console.log('valid')
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
                this.filter.user_id = this.user_id;
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
                this.data_sort_model.sort_data = item;
                this.data_sort_model.user_id = this.user_id;

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
            }

            
        }
    }
</script>

<style>


</style>