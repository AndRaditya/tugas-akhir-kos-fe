<template>
    <v-container grid-list-md class="pt-0">
        <v-flex grow >
            <vueper-slides fade :touchable="false" class="px-0" :fixed-height="true">
                <vueper-slide
                    v-for="(slide, i) in slides"
                    :key="i"
                    :image="slide.image"
                    :title="slide.title"
                    :link="slide.link"
                    :style="'color: '+['#fff']"
                    :content="slide.content" />
            </vueper-slides>
        </v-flex>

        <v-layout column wrap text-sm-center class="layout-main" id="main_kos" >
            <v-layout align-start class="mb-3">
                <p class="title__main-tipe paragraph">{{ kos_model.tipe }}</p>
            </v-layout>

            <v-layout column
                    data-aos="fade-zoom-ing"
                    data-aos-offset="200"
                    data-aos-delay="50"
                    data-aos-duration="250"
                    data-aos-easing="ease-in-back"
                    data-aos-mirror="false"
                    data-aos-once="true"
                    data-aos-anchor-placement="top-center">
                <v-layout align-center justify-center wrap>
                    <div class="image__grid-parent">
                        <div class="image__grid-child-1" v-bind:style="{backgroundImage: `url(${urls_kos[0]})`}"> 
                        </div>
                        <div class="image__grid-child-2" v-bind:style="{backgroundImage: `url(${urls_kos[1]})`}">
                        </div>
                        <div class="image__grid-child-3" v-bind:style="{backgroundImage: `url(${urls_kos[2]})`}">
                        </div>
                        <div class="image__grid-child-4" v-bind:style="{backgroundImage: `url(${urls_kos[3]})`}">
                        </div>
                        <div class="image__grid-child-5" v-bind:style="{backgroundImage: `url(${urls_kos[4]})`}"> 
                        </div>
                    </div>
                </v-layout>
                <v-flex>
                    <v-layout>&nbsp;</v-layout>
                    <v-layout justify-end class="pb-8">
                        <v-btn outlined elevation="0" mx-0 color="#333" class="button__lihat-foto" @click="imageDialogKos = true">
                        <span class="material-symbols-outlined">
                        photo_camera
                        </span>
                        &nbsp;Lihat Semua Foto
                    </v-btn>
                    </v-layout>
                </v-flex>
            </v-layout>

            <v-layout column class="pb-12"
                data-aos="fade-zoom-ing"
                data-aos-offset="50"
                data-aos-delay="50"
                data-aos-duration="250"
                data-aos-easing="ease-in-back"
                data-aos-mirror="false"
                data-aos-once="true"
                data-aos-anchor-placement="top-center">
                <div class="landing-content__grid-parent">
                    <div class="landing-content__grid-child-1" >
                        <v-card class="card__padding"  outlined text-sm-left elevation="0" >
                            <v-layout column align-start class="pb-2">
                                <p class="title__main paragraph">{{ kos_model.name }}</p>
                                <div class="d-inline-flex align-center pt-2"><span class="material-symbols-outlined pr-2">
                                    location_on
                                </span><p class="paragraph subtitle">Depok, Sleman, Yogyakarta</p></div>
                            </v-layout>
                            <hr>
                            <v-layout align-start column justify-start class="pt-4">
                                <p class="regular-text" style="text-align: left; line-height: 2">{{ kos_model.deskripsi }}</p>
                            </v-layout>
                        </v-card>
                    </div>
                    <div class="landing-content__grid-child-2">
                        <v-card class="card__padding" outlined text-sm-left elevation="0">
                            <v-layout align-start class="pb-2">
                                <p class="title__medium paragraph">Fasilitas Kos</p>
                            </v-layout>
                            <hr>

                            <div class="landing-content__grid__fasilitas-kos">
                                <div class="landing-content__grid__fasilitas-kos--child-1">
                                    <v-layout column>
                                        <ul v-for="(fasilitas, index) in kos_model.kos_fasilitas.slice(0, 3)" :key="index" class="pl-0 pb-3">
                                            <li class="bigger--regular-text ma-0 pb-2" v-if="index < 3">{{ fasilitas.name }}</li>
                                        </ul>
                                    </v-layout>
                                </div>
                                <div class="landing-content__grid__fasilitas-kos--child-2">
                                    <v-layout column>
                                        <ul v-for="(fasilitas, index) in kos_model.kos_fasilitas.slice(3)" :key="index" class="pl-0 pb-3">
                                            <li class="bigger--regular-text ma-0 pb-2" >{{ fasilitas.name }}</li>
                                        </ul>
                                    </v-layout>
                                </div>
                            </div>
                        </v-card>
                    </div>
                    <div class="landing-content__grid-child-3">
                        <v-card class="card__padding"  outlined text-sm-left elevation="0">
                            <v-flex>
                                <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15812.97476859342!2d110.3904599!3d-7.76396115!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sid!4v1681391601193!5m2!1sen!2sid" width="100%" height="250" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                            </v-flex>
                            <v-layout align-start column class="mb-4">
                                <p class="paragraph subtitle">Suasana Lingkungan Kos</p>
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
                                <p class="paragraph subtitle">Lokasi Terdekat Kos</p>
                            </v-layout>
                            <v-layout row align-start>
                                <v-flex>
                                    <v-layout align-start column>
                                        <ul v-for="(location, index) in locations" :key="index" class="pl-0 pb-3">
                                            <p class="regular-text ma-0">{{ location.message }}</p>
                                        </ul>
                                    </v-layout>
                                </v-flex>
                                <v-flex>
                                    <v-layout column align-end>
                                        <ul v-for="(length, index) in lengths" :key="index" class="pl-0 pb-3">
                                            <p class="regular-text ma-0">{{ length.message }}</p>
                                        </ul>
                                    </v-layout>
                                </v-flex>
                            </v-layout>
                        </v-card>
                    </div>
                </div>

                <v-layout class="px-0 py-4" align-start column>
                    <p class="title__medium">Pesan Kamar Anda</p>
                </v-layout>
                <hr>
            </v-layout>

            <v-card class="card__border card__padding" outlined text-sm-left elevation="0"
                data-aos="fade-zoom-ing"
                data-aos-offset="10"
                data-aos-delay="50"
                data-aos-duration="250"
                data-aos-easing="ease-in-back"
                data-aos-mirror="false"
                data-aos-once="true"
                data-aos-anchor-placement="top-center">
                <div class="landing-booking__grid">
                    <!-- FOTO KAMAR, FASILITAS -->
                    <div class="landing-booking__grid-child-1">
                        <div class="landing-booking__grid-child-1__parent">
                            <div class="landing-booking__grid-child-1--child-1">
                                <div class="landing-booking__grid__foto-kamar__parent">
                                    <div class="landing-booking__grid__foto-kamar--child-1" v-bind:style="{backgroundImage: `url(${urls_kamar[0]})`}">
                                    </div>
                                    <div class="landing-booking__grid__foto-kamar--child-2" v-bind:style="{backgroundImage: `url(${urls_kamar[1]})`}">
                                    </div>
                                    <div class="landing-booking__grid__foto-kamar--child-3" v-bind:style="{backgroundImage: `url(${urls_kamar[2]})`}">
                                    </div>
                                    <div class="landing-booking__grid__foto-kamar--child-4">
                                        <p class="regular-text__bold btn__daftar-anchor" style="cursor: pointer; text-align: left" @click="imageDialogKamar = true">Lihat foto kamar lebih lanjut</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="landing-booking__grid-child-1--child-2">
                                <p class="regular-text__bold" style="text-align: left">Fasilitas Kamar</p>
                                <div class="landing-booking__grid__kamar-fasilitas--normal">
                                    <v-layout column align-start style="text-align: left">
                                        <ul v-for="(fasilitas, index) in array_kamar_fasilitas" :key="index" class="pl-0 pb-1  landing-booking__grid__kamar-fasilitas__bullet">
                                            <li class="regular-text ma-0 pb-2" >{{ fasilitas }}</li>
                                        </ul>
                                    </v-layout>
                                </div>
                                <div class="landing-booking__grid__kamar-fasilitas__parent">
                                    <div class="landing-booking__grid__kamar-fasilitas--child-1">
                                        <v-layout column align-start style="text-align: left">
                                            <ul v-for="(fasilitas, index) in array_kamar_fasilitas.slice(0, 4)" :key="index" class="pl-0 pb-1 landing-booking__grid__kamar-fasilitas__bullet">
                                                <li class="regular-text ma-0 pb-2" >{{ fasilitas }}</li>
                                            </ul>
                                        </v-layout>
                                    </div>
                                    <div class="landing-booking__grid__kamar-fasilitas--child-2">
                                        <v-layout column align-start style="text-align: left">
                                            <ul v-for="(fasilitas, index) in array_kamar_fasilitas.slice(4)" :key="index" class="pl-0 pb-1">
                                                <li class="regular-text ma-0 pb-2" >{{ fasilitas }}</li>
                                            </ul>
                                        </v-layout>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- BOOKING -->
                    <div class="landing-booking__grid-child-2">
                        <div class="landing-booking__grid-child-2__parent">
                            <div class="landing-booking__grid-child-2--child-1">
                                <div class="landing-booking__grid__kamar__parent">
                                    <div class="landing-booking__grid__kamar--child-1">
                                        <p class="subtitle" style="text-align: left">Spesifikasi Kamar</p>
                                        <v-layout column align-start style="text-align: left">
                                            <ul v-for="(spesifikasi, index) in kos_model.kamar_spesifikasi" :key="index" class="pl-0 pb-3">
                                                <li class="regular-text ma-0 pb-2" v-if="spesifikasi.ukuran != '3x5'">{{ spesifikasi.ukuran }}</li>
                                                <li class="regular-text ma-0 pb-2" v-else>Ukuran Kamar {{ spesifikasi.ukuran }} m<sup>2</sup></li>
                                            </ul>
                                        </v-layout>
                                    </div>
                                    <div class="landing-booking__grid__kamar--child-2">
                                        <v-layout justify-end class="mt-0" row fill-height>
                                            <p class="subtitle">Tersisa {{ total_kamar_kosong }} Kamar</p>
                                        </v-layout>
                                    </div>
                                </div>
                            </div>
                            <div class="landing-booking__grid-child-2--child-2">
                                <div class="landing-booking__grid-child-2--child-2--line"></div>
                            </div>
                            <div class="landing-booking__grid-child-2--child-3">
                                <div class="landing-booking__grid__form-booking__parent">
                                    <div class="landing-booking__grid__form-booking--child-1">
                                        <div class="landing-booking__grid__form-booking--child-1__wrapper" v-if="!this.param_pengelola">
                                            <v-layout column>
                                                <v-form @submit.prevent="validateForm()" v-model="valid" ref="form_booking" autofocus lazy-validation>
                                                    <v-layout align-start column>
                                                        <p class="regular-text">Masukkan Tanggal Mulai</p>
                                                    </v-layout>
                                                    <v-flex class="pa-0">
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
                                                        :rules="bulan_rules"
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
                                                    <v-layout v-if="harga_kamar != '1.600.000'">
                                                        <p class="regular-text bulan-text">Total Harga &nbsp;</p>
                                                    </v-layout>
                                                    <v-layout row class="pb-6">
                                                        <p style="color:#146C94" class="title__main">Rp{{ harga_kamar }}</p>&nbsp;<p class="regular-text bulan-text" v-if="harga_kamar == '1.600.000'">/bulan</p>
                                                    </v-layout>
                                                    <v-btn color="#146C94" elevation="0" class="button__lihat-foto white--text" width="100%" @click="dialogKonfirmasiBooking = true" v-if="status_kamar_terisi">Pesan Sekarang</v-btn>
                                                </v-form>
                                            </v-layout>
                                        </div>
                                        <div v-else-if="this.param_pengelola" style="display: none"></div>
                                    </div>
                                    <div class="landing-booking__grid__form-booking--child-2">
                                        <div class="landing-booking__grid__form-booking--child-2__wrapper">
                                            <v-layout column align-end>
                                                <p class="pb-2 regular-text__bold paragraph">Butuh Pertanyaan?</p>
                                                <p class="regular-text">Hubungi Pengelola</p>
                                                <v-btn color="#19A7CE" outlined elevation="0" class="button__lihat-foto" href="https://api.whatsapp.com/send/?phone=6282214006189&text=Halo,%20Saya%20ingin%20mendapatkan%20informasi%20mengenai%20Kost%20Catleya&type=phone_number&app_absent=0" target="_blank">Tanya Pengelola</v-btn>
                                            </v-layout>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>  
                    </div>
                </div>
            </v-card>

            <hr class="my-6">

            <v-layout class="pb-4" row v-if="ready">
                <div class="peraturan-biaya__grid">
                    <div class="peraturan-biaya__grid--child-1">
                        <v-card class="card__padding" outlined text-sm-left elevation="0">
                            <p class="regular-text__bold paragraph">Peraturan Kos</p>
                            <v-layout align-start column justify-start class="mt-4" style="text-align: left">
                                <ul v-for="(peraturan, index) in peraturan_kos_hypen" :key="index">
                                    <li class="regular-text pb-2">{{ peraturan }}</li>
                                </ul>
                            </v-layout>
                        </v-card>
                    </div>
                    <div class="peraturan-biaya__grid--child-2">
                        <v-card class="card__padding" outlined text-sm-left elevation="0">
                            <p class="regular-text__bold paragraph">Biaya Tambahan</p>
                            <p class="regular-text paragraph mt-4" style="text-align: left; line-height: 2">Terdapat Biaya Tambahan untuk penambahan kasur, tamu, dan ketentuan lainnya</p>
                        </v-card>
                    </div>
                </div>
            </v-layout>
        </v-layout>

        <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom class="white--text">{{ error_message }}</v-snackbar>

        <v-dialog v-model="imageDialogKos" content-class="image-dialog">
            <v-card class="rounded-card">
                <v-toolbar dark color="#19A7CE" dense flat>
                </v-toolbar>

                <v-layout row wrap fill-height class="pa-0 ma-0" justify-center>
                    <v-flex
                        v-for="(url, index) in urls_kos"
                        :key="index"
                        class="preview-img-flex ma-2 mr-2 mb-2"
                        shrink
                    >
                        <v-layout column>
                            <!-- <v-card elevation-0> -->
                                <v-img
                                    v-if="url"
                                    :src="url"
                                    width="350"
                                    height="200"
                                    fill
                                    class="grey lighten-5"
                                    alt="Kost Putri Jogja"
                                ></v-img>
                            <!-- </v-card> -->
                        </v-layout>
                    </v-flex>
                </v-layout>

                <v-card-actions py-0 px-4 ma-0>
                    <v-flex class="ma-0 pa-2 mt-6 justify-center">
                        <v-btn elevation="0" class="white--text btn__go-edit" width="30%" @click="imageDialogKos = false">Close</v-btn>
                        <!-- raised round color="primary" -->
                    </v-flex>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="imageDialogKamar" content-class="image-dialog">
            <v-card class="rounded-card">
                <v-toolbar dark color="#19A7CE" dense flat>
                </v-toolbar>

                <v-layout row wrap fill-height class="pa-0 ma-0" justify-center>
                    <v-flex
                        v-for="(url, index) in urls_kamar"
                        :key="index"
                        class="preview-img-flex ma-2 mr-2 mb-2"
                        shrink
                    >
                        <v-layout column>
                            <!-- <v-card elevation-0> -->
                                <v-img
                                    v-if="url"
                                    :src="url"
                                    width="350"
                                    height="200"
                                    fill
                                    class="grey lighten-5"
                                    alt="Kost Putri Jogja"
                                ></v-img>
                            <!-- </v-card> -->
                        </v-layout>
                    </v-flex>
                </v-layout>

                <v-card-actions py-0 px-4 ma-0>
                    <v-flex class="ma-0 pa-2 mt-6 justify-center">
                        <v-btn elevation="0" class="white--text btn__go-edit" width="30%" @click="imageDialogKamar = false">Close</v-btn>
                        <!-- raised round color="primary" -->
                    </v-flex>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialogKonfirmasiBooking" persistent content-class="landing-booking__dialog">
            <v-card class="pa-4">
                <div class="landing-booking__dialog--parent">
                    <div class="landing-booking__dialog--child-1">
                        <p class="regular-text__medium paragraph" style="text-align: center">Harap Hubungi Pengelola Terlebih Dahulu Sebelum Pesan Kamar</p>
                    </div>
                    <div class="landing-booking__dialog--child-2">
                        <v-btn color="#19A7CE" outlined elevation="0" class="button__lihat-foto" href="https://api.whatsapp.com/send/?phone=6282214006189&text=Halo,%20Saya%20ingin%20mendapatkan%20informasi%20mengenai%20Kost%20Catleya&type=phone_number&app_absent=0" target="_blank">Tanya Pengelola</v-btn>
                    </div>
                    <div class="landing-booking__dialog--child-3">
                        <div class="landing-booking__dialog--child-3--1">
                            <v-btn outlined class="landing-booking__dialog--child-3__btn" @click="dialogKonfirmasiBooking = false">Tutup</v-btn>
                        </div>
                        <div class="landing-booking__dialog--child-3--2">
                            <v-btn color="#146C94" class="landing-booking__dialog--child-3__btn white--text" @click="validateForm()">Pesan Sekarang</v-btn>
                        </div>
                    </div>
                </div>
            </v-card>
        </v-dialog>

        <v-snackbar v-model="snackbarLoading" :color="color" timeout="-1" bottom class="white--text"><v-progress-circular
            indeterminate
            color="#fff"
        ></v-progress-circular> {{ snackbarLoading_message }}</v-snackbar>

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
    props:{
        api: {
            type: String,
            default: "no_data",
        },
        apiKamar: {
            type: String,
            default: "no_data",
        },
        apiKamarPhotos: {
            type: String,
            default: "no_data",
        },
        apiKamarFasilitas: {
            type: String,
            default: "no_data",
        },
        apiKamarHarga: {
            type: String,
            default: "no_data",
        },
    },
    name: "landing-page",
    data() {
        return{
            ready: false,
            snackbarLoading: false, 
            snackbarLoading_message: '',

            imageDialogKos: false,
            imageDialogKamar: false,
            urls_kos: [],
            urls_kamar: [],

            slides: [],

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
            kamar_fasilitas_model:{},

            locations : [],
            lengths : [],
            harga_kamar: '',
            total_kamar_kosong: null,
            kamar_kosong: [],
            rules: {
                required: value => !!value || 'Harus Diisi',
            },

            bulan_rules:[
                v => ( v && v >= 1 ) || "Bulan tidak boleh kosong",
            ],

            kamar_rules: [ 
                v => !!v || "Harus Diisi",
                v => ( v && v >= 1 ) || "Kamar tidak boleh kosong",
                v => ( v && v <= this.total_kamar_kosong ) || "Hanya tersisa " + this.total_kamar_kosong + ' kamar',
            ],

            status_kamar_terisi: false,
            menu_tgl_booking: false,

            param_pengelola: false,
            peraturan_kos_hypen: [],
            array_kamar_fasilitas: [],

            dialogKonfirmasiBooking: false,
            harga_axio: ''
        }
    },
    created(){
        this.initData();
        this.initHeader();
        this.axioHarga();
        this.sisaKamar();
        this.param_pengelola = this.check_pengelola();
        // this.reloadOnce();

        this.devLog('process.env.NODE_ENV');
        this.devLog(process.env.NODE_ENV);
    },  
    methods:{
        // reloadOnce(){
        //     this.devLog('reload test');
        //     window.onload = function () {
        //         if (!localStorage.justOnce) {
        //             localStorage.setItem("justOnce", "true");
        //             window.location.reload();
        //         }
        //     }
        // },

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
            this.snackbarLoading_message = 'Loading';
            this.color = "#19A7CE";
            this.snackbarLoading = true;

            this.initModel();
            this.devLog('init data');
            this.$http.get(this.api)
            .then(response => {
                this.ready = true
                this.devLog("get kos result code: " + response.status);
                if(response.status == 200){
                    if(!response.data){
                        this.devLog('response fail')
                        this.snackbarLoading = false;
                    }else{
                        this.kos_model = response.data.data[0];
                        this.devLog(this.kos_model)
                        this.getKamarPhotos();
                        this.getKamarFasilitas();
                        this.checkHypen();

                        this.snackbarLoading = false;
                        // this.$router.push('/dashboard');
                    }
                }
            }).catch((err)=>{
                this.snackbarLoading = false;
                this.ready = true
                this.error_message = err.response.data;
                this.color = "#DF2E38";
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

                kos_fasilitas: [],
                kamar_spesifikasi: [],
                kos_photos: [],
            }

            this.kos_booking_model = {
                users_id: null,
                tanggal_mulai: new Date().toISOString().substr(0, 10),
                total_bulan: 1,
                total_kamar: 1,
                tanggal_selesai: '',
                total_price: null,
                harga_bulanan: null,
            }

            this.kamar_model = {
                photo_path: '',
            }
        },

        getKamarPhotos(){
            this.$http.get(this.apiKamarPhotos)
            .then(response => {
                this.devLog("get kos result code: " + response.status);
                if(response.status == 200){
                    if(!response.data){
                        this.devLog('response fail')
                    }else{
                        this.kamar_model = response.data.data;
                        this.devLog(this.kamar_model)
                        this.initPhoto();
                        this.initSlides();
                        // this.$router.push('/dashboard');
                    }
                }
            }).catch((err)=>{
                this.error_message = err.response.data;
                this.color = "#DF2E38";
                this.snackbar = true;
            });
        },

        getKamarFasilitas(){
            this.$http.get(this.apiKamarFasilitas)
            .then(response => {
                this.devLog("get kamar fasilitas result code: " + response.status);
                if(response.status == 200){
                    if(!response.data){
                        this.devLog('response fail')
                    }else{
                        this.devLog(response.data)
                        this.kamar_fasilitas_model = response.data.data;
                        this.sliceKamarFasilitas()
                        // this.$router.push('/dashboard');
                    }
                }
            }).catch((err)=>{
                this.error_message = err.response.data;
                this.color = "#DF2E38";
                this.snackbar = true;
            });
        },

        sliceKamarFasilitas(){
            // for(let i = 0; i < this.kamar_fasilitas_model.length; i++){
            //     this.array_kamar_fasilitas.push(this.kamar_fasilitas_model[i]);
            // }
            // this.kamar_fasilitas_model.forEach((element) => {
            //     this.array_kamar_fasilitas.push(element)
            // })
           this.array_kamar_fasilitas = Object.values(this.kamar_fasilitas_model);

            this.devLog('this.array_kamar_fasilitas')
            this.devLog(this.kamar_fasilitas_model[0])
            this.devLog(this.array_kamar_fasilitas)
        },

        axioHarga(){
            this.devLog('axio harga fx')
            this.$http.get(this.apiKamarHarga).then(response => {
                this.devLog("get harga kamar axio result code: " + response.status);
                if(response.status == 200){
                    if(!response.data){
                        this.devLog('response fail')
                    }else{
                        this.harga_axio = response.data.harga;
                        this.devLog(' harga axio' + this.harga_axio)
                        this.hargaKamar();
                        // this.$router.push('/dashboard');
                    }
                }
            }).catch((err)=>{
                this.error_message = err.response.data;
            });
        },

        initPhoto() {
            this.devLog('init photo');
            this.devLog(this.kamar_model);

            this.kos_model.kos_photos.forEach((element) => {
                this.urls_kos.push(element.photo_path);
            });

            this.kamar_model.forEach((element) => {
                this.urls_kamar.push(element.photo_path);
            })
        
        },

        initSlides(){
            for(let i = 0; i < this.urls_kos.length; i++){
                this.slides.push({
                    image: this.urls_kos[i],
                })
            }
        },

        hargaKamar(){
            let harga_utama = this.harga_axio;

            this.devLog('harga utama' + harga_utama)
            
            if(this.kos_booking_model.total_bulan == 1 && this.kos_booking_model.total_kamar == 1){
                this.harga_kamar = this.formatPrice(harga_utama);
            }else{
                let hargaTotal = this.kos_booking_model.total_bulan * this.kos_booking_model.total_kamar * harga_utama;
                this.harga_kamar = this.formatPrice(hargaTotal);
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
                    this.color = "#DF2E38";
                    this.snackbar = true;
                }
            }else{
                this.error_message = 'Anda Harus Login Terlebih Dahulu';
                this.color = "#DF2E38";
                this.snackbar = true;
            }

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
            this.kos_booking_model.total_price = this.harga_axio * total_bulan * total_kamar;
            this.kos_booking_model.date = this.getDateTime();
            this.kos_booking_model.harga_bulanan = this.harga_axio;

            let tgl_sekarang = this.getDate();

            this.devLog(tgl_sekarang);
            this.devLog(this.kos_booking_model.tanggal_mulai);

            if(this.kos_booking_model.tanggal_mulai >= tgl_sekarang){
                this.devLog(this.kos_booking_model)
                localStorage.setItem("justOnce", "false");
                localStorage.kosBooking = JSON.stringify(this.kos_booking_model);

                this.$router
                    .push({ path: '/pesanan' })
                    .then(() => { this.$router.go() })
            }else{
                this.error_message = 'Anda Memesan Tanggal yang Salah!';
                this.color = "#DF2E38";
                this.snackbar = true;
            }

        },

        sisaKamar(){
            this.devLog('api kamar ' + this.apiKamar)

            this.$http.get(this.apiKamar)
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
                this.error_message = err.response.data.emss;
                this.color = "#DF2E38";
                this.snackbar = true;
            });
        },

        checkScroll(){
            let path = document.URL.split('/');

            let mainPath = path.splice(0, path.length).join('/');
            let param_scroll = mainPath.includes('main_kos');
            this.devLog('mainPath ' + mainPath);
            this.devLog(param_scroll);

            return param_scroll;
        },

        checkHypen(){
            var split = this.kos_model.peraturan.split('- ');
            // this.devLog(split);
            this.peraturan_kos_hypen = split.filter(item => item);
            this.devLog(this.peraturan_kos_hypen);
        },

        getDate(){
            var now     = new Date(); 
            var year    = now.getFullYear();
            var month   = now.getMonth()+1; 
            var day     = now.getDate();
            if(month.toString().length == 1) {
                month = '0'+month;
            }
            if(day.toString().length == 1) {
                day = '0'+day;
            }   
            var date = year+'-'+month+'-'+day;   
            return date;
        },

        getDateTime() {
            var now     = new Date(); 
            var year    = now.getFullYear();
            var month   = now.getMonth()+1; 
            var day     = now.getDate();
            var hour    = now.getHours();
            var minute  = now.getMinutes();
            var second  = now.getSeconds(); 
            if(month.toString().length == 1) {
                month = '0'+month;
            }
            if(day.toString().length == 1) {
                day = '0'+day;
            }   
            if(hour.toString().length == 1) {
                hour = '0'+hour;
            }
            if(minute.toString().length == 1) {
                minute = '0'+minute;
            }
            if(second.toString().length == 1) {
                second = '0'+second;
            }   
            var dateTime = year+'-'+month+'-'+day+' '+hour+':'+minute+':'+second;   
            return dateTime;
        }, 
    },
    mounted(){
        this.devLog('mounted');
        let scroll = this.checkScroll();
        this.devLog('scroll ' +scroll);
        if(scroll){
            document.getElementById("main_kos")
                .scrollIntoView({ behavior: 'smooth' });
        }
    },
}

</script>

<style>
    .container.grid-list-md .layout:not(:only-child){
        margin: auto 0px;
    }

    .layout-main{
        margin-top: 6rem !important;
    }

    .theme--light.v-sheet.card__border{
        border: 0.25px solid rgba(3,3,3, .1) ;
    }
</style>
