<template>
    <v-container grid-list-md class="pt-6" v-if="ready">
        <v-layout row class="mb-6">
            <v-flex xs8>
                <v-layout column align-start justify-center>
                    <p class="main-title">Pesanan</p>
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
                        <v-flex xs6>
                            <v-layout column align-start>
                                <p class="bold-bigger-regular-text paragraph pb-4">{{ kos_booking.kode }}</p>
                                <p class="medium-bigger-regular-text">{{ date[index] }}</p>
                            </v-layout>
                        </v-flex>
                        <v-flex xs6>
                            <v-layout justify-end class="mt-0">
                                <p class="belum--verifikasi-pengelola medium-regular-text" v-if="kos_booking.status == 'Menunggu Konfirmasi Pengelola'">{{ kos_booking.status }}</p>
                                <p class="terkonfirmasi-pengelola medium-regular-text" v-else-if="kos_booking.status == 'Terkonfirmasi'">Berhasil</p>
                                <p class="dibatalkan-pengelola medium-regular-text" v-else-if="kos_booking.status == 'Dibatalkan'">Dibatalkan</p>
                            </v-layout>
                        </v-flex>
       
                    </v-layout>
                    <hr>
                    <v-layout row class="mt-6">
                        <v-flex xs3>
                            <v-layout column align-start>
                                <p class="bigger-regular-text">Nama Penyewa</p>
                                <p class="bigger-regular-text">Tanggal Masuk</p>
                                <p class="bigger-regular-text">Tanggal Selesai</p>
                                <p class="bigger-regular-text">Jumlah Kamar</p>
                                <p class="bigger-regular-text" v-if="kos_booking.kamar.length > 0">Nomor Kamar</p>

                            </v-layout>
                        </v-flex>
                        <v-flex xs9>
                            <v-layout column align-start>
                                <p class="medium-bigger-regular-text">{{ kos_booking.user.name }}</p>
                                <p class="medium-bigger-regular-text">{{ tanggal_mulai[index] }}</p>
                                <p class="medium-bigger-regular-text">{{ tanggal_selesai[index] }}</p>
                                <p class="medium-bigger-regular-text">{{ kos_booking.total_kamar }} Kamar</p>
                                <v-layout row v-if="kos_booking.kamar.length > 0"> 
                                    <div v-for="(nomor, index) in kos_booking.kamar" :key="index">
                                        <p class="medium-bigger-regular-text" v-if="index+1 < kos_booking.kamar.length">{{ nomor.number }}, &nbsp; </p>    
                                        <p class="medium-bigger-regular-text" v-if="index+1 === kos_booking.kamar.length">{{ nomor.number }} </p>    
                                    </div>
                                </v-layout>

                            </v-layout>
                        </v-flex>
                    </v-layout>
                    <v-layout row class="mt-16">
                        <v-layout column align-start>
                            <p class="medium-bigger-regular-text">Total Biaya</p>
                            <p class="bold-bigger-regular-text paragraph">Rp{{ total_harga[index] }}</p>
                        </v-layout>
                        <v-layout justify-end>
                            <v-btn color="#146C94" width="20%" class="white--text thin-bigger-regular-text" elevation="0" @click="getDetail(kos_booking.id)">Lihat Detail</v-btn>
                        </v-layout>
                    </v-layout>
                </v-layout>
            </v-card>
        </v-layout>
        <v-layout column class="layout-main" mt-6 v-else-if="!this.model_transaksi">
            <p class="thin-title">Belum terdapat transaksi</p>
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
                        <v-btn width="30%" elevation="0" class="white--text btn-close-dialog mr-2" @click="dialog_filter = false">Tutup</v-btn>
                        <v-btn elevation="0" class="white--text btn-unduh ml-2" type="submit" width="30%">FILTER</v-btn>
                    </v-layout>
                </v-form>
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
                this.total_harga.push(element.total_price.toLocaleString("de-DE"));

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
        }
    },
    
    computed:{
        // requiredStartDate(){
        //     return [
        //         (v) => {
        //             if(this.filter.date.end_date === '' && !v){
        //                 return "Harus Diisi";
        //             }
        //         return true;
        //         }
        //     ];
        // },
        // requiredEndDate(){
        //     return [
        //         (v) => {
        //             if(this.filter.date.start_date === '' && !v){
        //                 return "Harus Diisi";
        //             }
        //         return true;
        //         }
        //     ];
        // }
    }
}
</script>

<style scoped>

</style>