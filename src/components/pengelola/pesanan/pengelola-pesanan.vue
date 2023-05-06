<template>
    <v-container grid-list-md class="pt-0" v-if="ready">
        <v-layout align-start>
            <p class="main-title">Pesanan</p>
        </v-layout>
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
                                <p class="belum--verifikasi-pengelola medium-regular-text" v-if="kos_booking.status == 'Menunggu Konfirmasi Kamar'">{{ kos_booking.status }}</p>
                                <p class="sudah--verifikasi-pengelola medium-regular-text" v-else-if="kos_booking.status == 'Menunggu Konfirmasi Pembayaran'">{{ kos_booking.status }}</p>
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
                                <p class="medium-bigger-regular-text"  v-if="kos_booking.kamar.length > 0">{{ kos_booking.kamar[0].number }}</p>
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
        }
    },
    created(){
        this.initData();
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
        },
        getData(){
            this.devLog('get data');

            this.$http.get(this.api, {headers : {
                Authorization: localStorage.token,
            }})
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
            this.devLog('get date')
            
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

        }
    }
}
</script>

<style scoped>

</style>