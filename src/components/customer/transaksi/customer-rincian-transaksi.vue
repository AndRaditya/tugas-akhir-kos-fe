<template>
    <v-container grid-list-xs class="pt-0" v-if="ready">
        <div class="cust-transaksi__header"
                data-aos="fade-zoom-ing"
                data-aos-offset="50"
                data-aos-delay="50"
                data-aos-duration="250"
                data-aos-easing="ease-in-back"
                data-aos-mirror="false"
                data-aos-once="true"
                data-aos-anchor-placement="top-center">
            <div class="cust-transaksi__child-1">
                <div class="cust-transaksi__child-1__title">
                    <v-layout align-start>
                        <p class="title__medium paragraph">Rincian Transaksi</p>
                    </v-layout>
                </div>
            </div>
            <div class="cust-transaksi__child-2">
                <div class="cust-transaksi__child-2__search">
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
                <div class="cust-transaksi__child-2__sort">
                    <v-select
                        outlined
                        label="Urutkan"
                        v-model="data_sort"
                        :items="data_sort_items"
                        hide-details
                    ></v-select>
                </div>
                <div class="cust-transaksi__child-2__filter">
                    <v-btn color="#146C94" class="white--text bigger--regular-text__thin btn-filter" elevation="0" @click="dialog_filter = true">Filter <span class="material-icons" style="color: #fff">
                        filter_alt
                        </span>
                    </v-btn>
                </div>
            </div>
        </div>
        <hr>

        <v-layout column class="layout-main" mt-8 v-if="this.model_transaksi"
            data-aos="fade-zoom-ing"
            data-aos-offset="50"
            data-aos-delay="50"
            data-aos-duration="250"
            data-aos-easing="ease-in-back"
            data-aos-mirror="false"
            data-aos-once="true"
            data-aos-anchor-placement="top-center">
            <v-card class="card__regular mt-4" v-for="(kos_booking, index) in kos_booking_model" :key="'kos_booking-'+index">
                <div class="cust-transaksi--detail">
                    <div class="cust-transaksi--detail__child-1">
                        <div class="cust-transaksi--detail__child-1__header-1">
                             <v-layout column align-start>
                                <p class="regular-text__bold ">{{ date[index] }}</p>
                                <h3 class="regular-text__medium paragraph pb-2">{{ kos_booking.kode }}</h3>
                            </v-layout>
                        </div>
                        <div class="cust-transaksi--detail__child-1__header-2">
                            <p class="pengelola__sudah--verifikasi regular-text__medium" v-if="kos_booking.status == 'Menunggu Konfirmasi Bukti Transfer'">{{ kos_booking.status }}</p>
                            <p class="pengelola__terkonfirmasi regular-text__medium" v-else-if="kos_booking.status == 'Terkonfirmasi'">{{ kos_booking.status }}</p>
                            <p class="pengelola__dibatalkan regular-text__medium" v-else-if="kos_booking.status == 'Dibatalkan'">{{ kos_booking.status }}</p>
                        </div>
                    </div>
                    <div class="cust-transaksi--detail__child-2">
                        <div class="cust-transaksi--detail__child-2--line"></div>
                    </div>
                    <div class="cust-transaksi--detail__child-3">
                        <div class="cust-transaksi--detail__child-3__desc-1">
                            <v-layout column align-start>
                                <p class="regular-text">Tanggal Masuk</p>
                                <p class="regular-text">Tanggal Selesai</p>
                                <p class="regular-text">Total Bulan</p>
                                <p class="regular-text">Jumlah Kamar</p>
                                <p class="regular-text" v-if="kos_booking.status == 'Dibatalkan'">Alasan Pembatalan</p>
                            </v-layout>
                        </div>
                        <div class="cust-transaksi--detail__child-3__desc-2">
                            <v-layout column align-start>
                                <p class="regular-text__medium ">{{ tanggal_mulai[index] }}</p>
                                <p class="regular-text__medium ">{{ tanggal_selesai[index] }}</p>
                                <p class="regular-text__medium ">{{ kos_booking.total_bulan }} Bulan</p>
                                <p class="regular-text__medium ">{{ kos_booking.total_kamar }} Kamar</p>
                                <!-- <p class="regular-text__medium " v-if="kos_booking.status == 'Dibatalkan'">{{ kos_booking.alasan_pembatalan }}</p> -->
                                <p class="regular-text__medium" v-if="kos_booking.status == 'Dibatalkan' ">{{ kos_booking.alasan_pembatalan ? kos_booking.alasan_pembatalan : `&ndash;` }}</p>

                            </v-layout>
                        </div>
                    </div>
                    <div class="cust-transaksi--detail__child-4">
                        <div class="cust-transaksi--detail__child-4__desc-1">
                            <v-layout column align-start>
                                <p class="regular-text__thin">Total Biaya</p>
                                <p class="regular-text__bold  paragraph">Rp{{ total_harga[index] }}</p>
                            </v-layout>
                        </div>
                        <div class="cust-transaksi--detail__child-4__desc-2">
                        </div>
                    </div>
                </div>
            </v-card>
        </v-layout>
        
        <v-layout column class="layout-main" mt-6 v-else-if="!this.model_transaksi">
            <p class="title__medium">Silahkan Lakukan Pemesanan Terlebih Dahulu</p>
            <h3 class="subtitle__thin pt-2">Silahkan Cek Rincian Pesanan jika sudah melakukan  Pesanan</h3>
        </v-layout>

        <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom class="white--text">{{ error_message }}</v-snackbar>

        <v-dialog v-model="dialog_filter" persistent content-class="filter-dialog">
            <v-card class="pa-4">
                <p class="bigger--regular-text__medium  pb-4">Filter Kamar</p>
                <!-- <v-form @submit.prevent="validateForm()" v-model="valid" ref="form_filter" autofocus lazy-validation> -->
                <v-form @submit.prevent="validateForm()" v-model="valid" ref="form_filter" autofocus>
                    <div class="filter-dialog__tanggal">
                        <div class="filter-dialog__tanggal--child-1">
                            <p class="regular-text">Tanggal Pemesanan</p>
                        </div>
                        <div class="filter-dialog__tanggal--child-2">     
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
                        </div>
                        <div class="filter-dialog__tanggal--child-3">
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
                        </div>
                    </div>
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
                        <v-btn elevation="0" class="white--text btn__close-dialog mr-2 filter-dialog__btn" @click="dialog_filter = false">Tutup</v-btn>
                        <v-btn elevation="0" class="white--text btn__unduh ml-2 filter-dialog__btn" type="submit" >FILTER</v-btn>
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
                if(newVal){
                    if(newVal != oldVal){
                        if(newVal == ''){
                            this.devLog('keyword search watch')
                            this.devLog('new val = ' + newVal)
                            this.devLog('old val = ' + oldVal)
                            this.getData();
                        }
                    }
                }else{
                    this.devLog('keyword search watch')
                    this.devLog('new val = ' + newVal)
                    this.devLog('old val = ' + oldVal)
                    this.getData(); 
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
                                this.color = "#DF2E38";
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
                        this.color = "#DF2E38";
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

                    this.total_harga.push(this.formatPrice(element.total_price));
                })
                this.devLog('total harga ' + this.total_harga)
            },

            xSearch(){
                this.devLog(this.keyword_search);
                if(this.keyword_search){
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
                                    this.color = "#DF2E38";
                                    this.snackbar = true;
                                    this.model_transaksi = false;
                                }else{
                                    this.devLog(response.data)
                                    this.kos_booking_model = response.data;
                                    if(this.kos_booking_model.length > 0){
                                        this.devLog(this.kos_booking_model)
                                        this.model_transaksi = true;
                                        this.getDateAndPrice();
                                        this.ready = true;
                                    }else{
                                        this.error_message = "Data Kosong";
                                        this.color = "#DF2E38";
                                        this.snackbar = true;
                                    }
                                }
                            }
                        }).catch((err)=>{
                            this.devLog(err);
                            this.error_message = err.response;
                            this.color = "#DF2E38";
                            this.snackbar = true;
                            this.model_transaksi = false;
                            this.ready = false;
                        });    
    
                    }else{
                        this.error_message = "Use minimum of 3 character as Search Keyword!";
                        this.color = "#DF2E38";
                        this.snackbar = true;
                    }
                }else{
                    this.getData();
                }
            },

            validateForm () {
                this.devLog('valid')
                this.devLog("validating");
                this.valid = (this.$refs.form_filter).validate();
                this.devLog(this.valid);

                if(this.filter.date.start_date && !this.filter.date.end_date){
                    this.error_message = 'Silahkan Lengkapi Filter Tanggal Pemesanan';
                    this.color = "#DF2E38";
                    this.snackbar = true;
                    this.valid = false;
                }else if(!this.filter.date.start_date && this.filter.date.end_date){
                    this.error_message = 'Silahkan Lengkapi Filter Tanggal Pemesanan';
                    this.color = "#DF2E38";
                    this.snackbar = true;
                    this.valid = false;
                }else if(this.filter.date.start_date && this.filter.date.end_date){
                    if(this.filter.date.start_date > this.filter.date.end_date){
                        this.error_message = 'Masukkan Tanggal dengan Benar';
                        this.color = "#DF2E38";
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
                            this.color = "#DF2E38";
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
                    this.color = "#DF2E38";
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
                            this.color = "#DF2E38";
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
                    this.color = "#DF2E38";
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