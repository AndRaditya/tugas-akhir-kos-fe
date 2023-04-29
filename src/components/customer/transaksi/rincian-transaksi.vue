<template>
    <v-container grid-list-xs class="pt-0">
        <v-layout align-start>
            <p class="thin-title paragraph">Rincian Transaksi</p>
        </v-layout>
        <v-layout column class="layout-main" mt-6 v-if="this.model_transaksi">
            <v-card class="card-regular" v-for="(kos_booking, index) in kos_booking_model" :key="'kos_booking-'+index">
                <v-layout column>
                    <v-layout row align-start>
                        <v-layout column align-start>
                            <p class="medium-bigger-regular-text">{{ date[index] }}</p>
                            <h3 class="thin-regular-text paragraph pb-2">{{ kos_booking.kode }}</h3>
                        </v-layout>
                        <v-layout justify-end class="mt-0">
                            <!-- <p class="sudah--verifikasi-pengelola medium-regular-text" v-if="kos_booking.status == 'Sudah Dikonfirmasi'">{{ kos_booking.status }} Pengelola</p>
                            <p class="belum--verifikasi-pengelola medium-regular-text" v-else>{{ kos_booking.status }}</p> -->
                            <p class="belum--verifikasi-pengelola medium-regular-text" v-if="kos_booking.status == 'Menunggu Konfirmasi Kamar'">Menunggu Pembayaran Customer</p>
                            <p class="sudah--verifikasi-pengelola medium-regular-text" v-else-if="kos_booking.status == 'Menunggu Konfirmasi Pembayaran'">Menunggu Konfirmasi Pembayaran dari Pengelola</p>
                            <p class="terkonfirmasi-pengelola medium-regular-text" v-else-if="kos_booking.status == 'Terkonfirmasi'">Berhasil</p>
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

    </v-container>
</template>

<script>
    export default{
        name: 'rincian-transaksi',
        data(){
            return{
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
            }

        },
        created(){
            this.initData();
        },
        methods:{
            redirectPayment(items){
                this.devLog(items);

                // this.$router.push({
                //     name: 'rincian-pembayaran',
                //     params: {
                //         booking_id: items
                //     }
                // });
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
            },
            getData(){
                this.devLog('get data');
                if(localStorage.userLogin){
                    let localStorageUser = localStorage.getItem('userLogin');
                    let user_login = JSON.parse(localStorageUser);
                    let user_id = user_login.id;

                    this.$http.get(this.API+'/kos-booking-users/'+user_id)
                    .then(response => {
                        this.devLog("Login Result Code: " +response.status);
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
                            }
                        }
                    }).catch((err)=>{
                        this.devLog(err);
                        this.error_message = 'Data Empty';
                        this.color = "red";
                        this.snackbar = true;
                        this.model_transaksi = false;
                    });
                }
            },
            getDateAndPrice(){
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


            
        }
    }
</script>

<style>


</style>