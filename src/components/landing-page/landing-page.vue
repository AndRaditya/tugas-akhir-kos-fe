<template>
    <v-container grid-list-md class="pt-0">
        <v-flex>
            <vueper-slides fade :touchable="false" class="px-0">
                <vueper-slide
                    v-for="(slide, i) in slides"
                    :key="i"
                    :image="slide.image"
                    :title="slide.title"
                    :content="slide.content" />
            </vueper-slides>
        </v-flex>
        <v-layout row wrap text-sm-center class="layout-main" id="main_kos">
            <v-flex xs2 style="background-color: #146C94; border-radius: 6px; margin-bottom: 6px;">
                <p class="main-title paragraph" style="color: #fff; padding: 8px 12px;">{{ kos_model.tipe }}</p>
            </v-flex>

            <v-layout column>
                <v-layout align-center justify-center row>
                    <v-flex xs6>
                        <img src="../../assets/Frame1.png" alt="" width="100%">
                    </v-flex>
                    <v-flex xs3>
                        <v-layout column>
                            <img src="../../assets/Frame1.png" alt="" width="100%">
                            <img src="../../assets/Frame1.png" alt="" width="100%">
                        </v-layout>
                    </v-flex>
                    <v-flex xs3>
                        <v-layout column>
                            <img src="../../assets/Frame1.png" alt="" width="100%">
                            <img src="../../assets/Frame1.png" alt="" width="100%">
                        </v-layout>
                    </v-flex>
                </v-layout>

                <v-flex>
                    <v-layout>&nbsp;</v-layout>
                    <v-layout justify-end class="pb-8">
                        <v-btn outlined elevation="0" mx-0 color="#333" class="foto-btn">
                        <span class="material-symbols-outlined">
                        photo_camera
                        </span>
                        &nbsp;Lihat Semua Foto
                    </v-btn>
                    </v-layout>
                </v-flex>
            </v-layout>

            <v-layout column class="pb-12">
                <v-layout class="px-0" row>
                    <v-flex class="px-0 pt-0" xs8 >
                        <v-flex xs12 pl-0 >
                            <v-card class="card-border card-padding" outlined text-sm-left elevation="0" >
                                <v-layout column align-start class="pb-2">
                                    <p class="main-title paragraph">{{ kos_model.name }}</p>
                                    <div class="d-inline-flex align-center pt-2"><span class="material-symbols-outlined pr-2">
                                        location_on
                                    </span><p class="paragraph sub-title">Depok, Sleman, Yogyakarta</p></div>
                                </v-layout>
                                <hr>
                                <v-layout align-start column class="pt-4">
                                    <p class="regular-text">{{ kos_model.deskripsi }}</p>
                                </v-layout>
                            </v-card>
                        </v-flex>
                        <v-flex xs12 pl-0>
                            <v-card class="card-border card-padding" outlined text-sm-left elevation="0" >
                                <v-layout align-start class="pb-2">
                                    <p class="medium-title paragraph">Fasilitas Kos</p>
                                </v-layout>
                                <hr>
                                <v-layout align-start class="pt-4">
                                    <p class="regular-text">{{ kos_model.fasilitas }}</p>
                                </v-layout>
                            </v-card>
                        </v-flex>
                    </v-flex>
                    <v-flex xs4>
                        <v-card class="card-border card-padding" outlined text-sm-left elevation="0">
                            <v-flex>
                                <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15812.97476859342!2d110.3904599!3d-7.76396115!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sid!4v1681391601193!5m2!1sen!2sid" width="100%" height="250" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                            </v-flex>
                            <v-layout align-start column>
                                <!-- class="paragraph sub-title" py-6 -->
                                <p class="paragraph sub-title"  >Suasana Lingkungan Kos</p>
                                <div class="d-inline-flex align-center pt-3">
                                    <span class="material-symbols-outlined pr-2">
                                        home
                                    </span>
                                    <p class="ma-0 regular-text">Lingkungan Nyaman</p>
                                </div>
                                <div class="d-inline-flex align-center pt-3">
                                    <span class="material-symbols-outlined pr-2">
                                        flood
                                    </span>
                                    <p class="ma-0 regular-text">Bebas Banjir</p>
                                </div>
                            </v-layout>
                            <v-layout align-start class="py-4">
                                <p class="paragraph sub-title">Lokasi Terdekat Kos</p>
                            </v-layout>
                            <v-layout row>
                                <v-layout align-start column>
                                    <ul v-for="(location, index) in locations" :key="index" class="pl-0 pb-3">
                                        <p class="regular-text ma-0">{{ location.message }}</p>
                                    </ul>
                                </v-layout>
                                <v-layout justify-end column>
                                    <ul v-for="(length, index) in lengths" :key="index" class="pl-0 pb-3">
                                        <p class="regular-text ma-0">{{ length.message }}</p>
                                    </ul>

                                </v-layout>
                            </v-layout>
                        </v-card>
                    </v-flex>
                </v-layout>

                <v-layout class="px-0 py-4" align-start column>
                    <p class="medium-title">Pesan Kamar Anda</p>
                </v-layout>
                <hr>
            </v-layout>

            <v-card class="card-border card-padding" outlined text-sm-left elevation="0">
                <v-layout row>
                    <v-flex xs3>
                        <v-layout column align-start>
                            <div class="d-flex align-start flex-column">
                                <div style="background-color: black; height: 200px; width: 100%;"></div>
                                <div class="d-flex align-start flex-row pt-2">
                                    <img src="../../assets/Frame1.png" alt="" width="50%">
                                    <img src="../../assets/Frame1.png" alt="" width="50%">                                 
                                </div>
                                <a class="bold-regular-text pt-6 daftar-anchor">Lihat foto kamar lebih lanjut</a>
                            </div>
                            <v-layout align-start column class="pt-6">
                                <p class="bold-regular-text">fasilitas kamar</p>
                            </v-layout>
                        </v-layout>
                    </v-flex>
                    <v-layout column row style="background-color: #FBF9F9;" ml-2 class="card-padding">
                        <v-layout row class="pb-4">
                            <v-layout column align-start >
                                    <p class="sub-title">Spesifikasi Kamar</p>
                                    <v-layout column align-start>
                                        <!-- <li v-for="location in locations" :key="location" class="pl-0 pb-3">
                                            {{ location.message }}
                                        </li> -->
                                    </v-layout>
                            </v-layout>
                            <v-layout justify-end class="mt-0" row fill-height>
                                <p class="sub-title">Tersisa {{ total_kamar_kosong }} Kamar</p>
                            </v-layout>
                        </v-layout>
                        <hr>
                        <br>
                        <v-layout row align-start >
                            <v-flex xs6>
                                <v-layout column v-if="!this.param_pengelola">
                                    <v-form @submit.prevent="validateForm()" v-model="valid" ref="form_booking" autofocus lazy-validation>
                                        <v-layout align-start column>
                                            <p class="regular-text">Masukkan Tanggal Mulai</p>
                                        </v-layout>
                                        <!-- <v-text-field
                                            v-model="kos_booking_model.tanggal_mulai"
                                            type="date"
                                            icon="event"
                                            placeholder="Placeholder"
                                            :rules="[rules.required]"
                                            outlined
                                        ></v-text-field> -->
                                        <v-flex class="pl-0">
                                            <v-menu
                                                ref="dialogTglBooking"
                                                v-model="menu_tgl_booking"
                                                :return-value.sync="kos_booking_model.tanggal_mulai"
                                                :close-on-content-click="false"
                                                elevation="0"
                                                min-width="0%"
                                            >
                                                <template v-slot:activator="{ on }">
                                                    <v-text-field
                                                        label="Tanggal Mulai"
                                                        append-icon="event"       
                                                        v-on="on"
                                                        outlined
                                                        v-model="kos_booking_model.tanggal_mulai"
                                                        :rules="[rules.required]"
                                                        :disabled="!status_kamar_terisi"
                                                    ></v-text-field>
                                                </template>
                                                <v-date-picker v-model="kos_booking_model.tanggal_mulai" scrollable>
                                                    <v-spacer></v-spacer>
                                                    <v-btn text color="primary" @click="menu_tgl_booking = false">Cancel</v-btn>
                                                    <v-btn text color="primary" @click="$refs.dialogTglBooking.save(kos_booking_model.tanggal_mulai)">OK</v-btn>
                                                </v-date-picker>
                                            </v-menu>
                                        </v-flex>

                                        <v-text-field
                                            v-model="kos_booking_model.total_bulan"
                                            type="number"
                                            min="1"
                                            label="Masukkan Jumlah Bulan"
                                            outlined
                                            @input="hargaKamar()"
                                            :disabled="!status_kamar_terisi"
                                        ></v-text-field>
                                        <v-text-field
                                            v-model="kos_booking_model.total_kamar"
                                            type="number"
                                            label="Masukkan Jumlah Kamar"
                                            outlined
                                            @input="hargaKamar()"
                                            :rules="kamar_rules"
                                            :disabled="!status_kamar_terisi"
                                        ></v-text-field>
                                        <v-layout row class="pb-6">
                                            <p style="color:#146C94" class="main-title">Rp{{ harga_kamar }}</p>&nbsp;<p class="pt-4 regular-text">/bulan</p>
                                        </v-layout>
                                        <v-btn color="#146C94" type="submit" elevation="0" class="pengelola-btn white--text" width="100%" v-if="status_kamar_terisi">Pesan Sekarang</v-btn>
                                    </v-form>
                                </v-layout>
                                <v-layout row v-else-if="this.param_pengelola">

                                </v-layout>
                            </v-flex>
                            <v-flex xs6>
                                <v-layout column align-end justify-start>
                                    <p class="pb-2 bold-regular-text paragraph">Butuh Pertanyaan?</p>
                                    <p class="regular-text">Hubungi Pengelola</p>
                                    <v-btn color="#19A7CE" outlined elevation="0" class="pengelola-btn" width="50%">Tanya Pengelola</v-btn>
                                </v-layout>
                            </v-flex>
                        </v-layout>
                    </v-layout>
                </v-layout>
            </v-card>
            <!-- </v-layout> -->

            <v-layout class="px-0 py-4" row> 
                <v-flex xs8>
                    <v-card class="card-border card-padding" outlined text-sm-left elevation="0">
                        <p class="bold-regular-text paragraph pb-2">Peraturan Kos</p>
                        <p class="regular-text paragraph">{{ kos_model.peraturan }}</p>
                    </v-card>
                </v-flex>
                <v-flex xs4>
                    <v-card class="card-border card-padding" outlined text-sm-left elevation="0">
                        <p class="bold-regular-text paragraph pb-2">Biaya Tambahan</p>
                        <p class="regular-text paragraph">Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde facere nesciunt, voluptates quibusdam ipsum exercitationem voluptatibus alias obcaecati esse sunt quasi eligendi minima commodi incidunt, officia repellendus aut rem earum!</p>
                    </v-card>
                </v-flex>
            </v-layout>

        </v-layout>
        <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom class="white--text">{{ error_message }}</v-snackbar>

    </v-container>
</template>

<script>
import { VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'

export default {
    components:{
        VueperSlides, 
        VueperSlide
    },
    name: "landing-page",
    data() {
        return{
            slides: [
                {
                title: 'Slide #1',
                content: 'Slide 1 content.'
                },
                {
                title: 'Slide #2',
                content: 'Slide 2 content.'
                }
            ],
            snackbar: '',
            color: '',
            error_message: '',
            valid: false,
            tanggal_mulai: '',
            total_bulan: '',
            total_kamar: '',

            kos_model:{},
            kos_booking_model:{},
            kamar_model:{},
            locations : [],
            lengths : [],
            harga_kamar: '',
            total_kamar_kosong: null,
            kamar_kosong: [],
            rules: {
                required: value => !!value || 'Required.',
            },

            kamar_rules: [ 
                v => !!v || "This field is required",
                v => ( v && v >= 1 ) || "Kamar tidak boleh kosong",
                v => ( v && v <= this.total_kamar_kosong ) || "Hanya tersisa " + this.total_kamar_kosong + ' kamar',
            ],

            status_kamar_terisi: false,
            menu_tgl_booking: false,

            param_pengelola: false,
        }
    },
    created(){
        this.initData();
        this.initHeader();
        this.hargaKamar();
        this.sisaKamar();
        this.param_pengelola = this.check_pengelola();
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
            this.devLog('init data');
            this.$http.get(this.API+'/kos/2')
            .then(response => {
                this.devLog("get kos result code: " + response.status);
                if(response.status == 200){
                    if(!response.data){
                        this.devLog('response fail')
                    }else{
                        this.kos_model = response.data.data[0];
                        this.devLog(this.kos_model)
                        // this.$router.push('/dashboard');
                    }
                }
            }).catch((err)=>{
                this.error_message = err.response.data.message;
                this.color = "red";
                this.snackbar = true;
            });
        },
        initModel(){
            this.kos_model = {
                id: null,
                kos_fasilitas_id: null,
                name: '',
                tipe: '',
                peraturan: '',
                deskripsi: '',
            }

            this.kos_booking_model = {
                users_id: null,
                tanggal_mulai: new Date().toISOString().substr(0, 10),
                total_bulan: 1,
                total_kamar: 1,
                tanggal_selesai: '',
                total_price: null,
            }

            this.kamar_model = {

            }
        },
        hargaKamar(){
            let harga_utama = 1500000;
            
            if(this.kos_booking_model.total_bulan == 1 && this.kos_booking_model.total_kamar == 1){
                this.harga_kamar = harga_utama.toLocaleString("de-DE");
            }else{
                let hargaTotal = this.kos_booking_model.total_bulan * this.kos_booking_model.total_kamar * harga_utama;
                this.harga_kamar = hargaTotal.toLocaleString("de-DE");
            }
        },
        validateForm () {
            this.devLog("validating");
            // this.devLog(this.valid);

            if(localStorage.userLogin){
                this.valid = (this.$refs.form_booking).validate();
                this.devLog(this.valid);

                if (this.valid == true) {
                    this.submitForm();
                }else{
                    this.error_message = 'Terdapat kesalahan';
                    this.color = "red";
                    this.snackbar = true;
                }
            }else{
                this.error_message = 'Anda Harus Login Terlebih Dahulu';
                this.color = "red";
                this.snackbar = true;
            }

        },

        addMonths(date, months) {
            let d = date.getDate();
            date.setMonth(date.getMonth() + +months);
            if (date.getDate() != d) {
            date.setDate(0);
            }
            return date;
        },

        submitForm(){
            let localStorageUser = localStorage.getItem('userLogin');
            let user_login = JSON.parse(localStorageUser);
            let tanggal_mulai = new Date(this.kos_booking_model.tanggal_mulai);
            let total_bulan = parseInt(this.kos_booking_model.total_bulan);
            let total_kamar = parseInt(this.kos_booking_model.total_kamar);

            let newDate = new Date(tanggal_mulai.setMonth(tanggal_mulai.getMonth()+total_bulan));
            this.kos_booking_model.tanggal_selesai = newDate.toISOString().split('T')[0]

            this.kos_booking_model.users_id = user_login.id;
            this.kos_booking_model.total_price = 1500000 * total_bulan * total_kamar;
            localStorage.kosBooking = JSON.stringify(this.kos_booking_model);

            this.$router
                .push({ path: '/pesanan' })
                .then(() => { this.$router.go() })
        },

        sisaKamar(){
            this.$http.get(this.API+'/kamar-kosong')
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
                this.color = "red";
                this.snackbar = true;
            });
        },

        checkScroll(){
            let path = document.URL.split('/');

            let mainPath = path.splice(0, path.length).join('/');
            let param_scroll = mainPath.includes('main_kos');
            this.devLog('mainPath');

            return param_scroll;
        },

        scrollToView(){
            document.getElementById("main_kos")
                .scrollIntoView({ behavior: 'smooth' });
        }
    },
    mounted(){
        if(this.checkScroll){
            this.scrollToView()
        }
    }
}

</script>

<style>
    *{
        color: #333;
    }

    .container.grid-list-md .layout:not(:only-child){
        margin: auto 0px;
    }

    .layout-main{
        margin-top: 6rem !important;
    }

    .foto-btn{
        border: thin solid #333
    }
    
    .pengelola-btn{
        border: thin solid #19A7CE
    }

    .card-border{
        padding: 6px;
    }

    .theme--light.v-sheet.card-border{
        border: 0.25px solid rgba(3,3,3, .1) ;
    }

    .card-padding{
        padding: 24px !important;
    }

    .btn-foto-kamar{
        margin-top: 12px !important;
        margin-left: 0px !important;
    }



</style>
