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
        <v-layout row wrap text-sm-center class="layout-main">
            <v-flex xs2 style="background-color: #146C94; border-radius: 6px; margin-bottom: 6px;">
                <p class="thin-title paragraph" style="color: #fff; padding: 8px 12px;">Kos Putri</p>
            </v-flex>

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

            <v-layout justify-end class="px-0">
                <v-btn outlined elevation="0" mx-0 color="#333" class="foto-btn">
                    <span class="material-symbols-outlined">
                    photo_camera
                    </span>
                    &nbsp;Lihat Semua Foto
                </v-btn>
            </v-layout>

            <v-layout class="px-0" row>
                <v-flex class="px-0 pt-0" xs8 >
                    <v-flex xs12 pl-0 >
                        <v-card class="card-border card-padding" outlined text-sm-left elevation="0" >
                            <v-layout column align-start>
                                <p class="main-title paragraph">Kost Catleya</p>
                                <div class="d-inline-flex align-center pt-2"><span class="material-symbols-outlined pr-2">
                                    location_on
                                </span><p class="paragraph sub-title">Depok, Sleman, Yogyakarta</p></div>
                            </v-layout>
                            <hr>
                            <v-layout align-start>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis ratione nostrum optio, sed exercitationem a quidem modi laudantium porro voluptatum blanditiis dicta voluptates neque laborum id? Eius quos sed excepturi!</p>
                            </v-layout>
                        </v-card>
                    </v-flex>
                    <v-flex xs12 pl-0>
                        <v-card class="card-border card-padding" outlined text-sm-left elevation="0" >
                            <v-layout align-start>
                                <p class="medium-title paragraph">Fasilitas Kos</p>
                            </v-layout>
                            <hr>
                            <v-flex>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci eveniet, animi quia sint exercitationem ullam illum odio inventore distinctio, consequuntur molestiae dignissimos nesciunt libero porro voluptatem aliquam repellat soluta id.
                            </v-flex>
                        </v-card>
                    </v-flex>
                </v-flex>
                <v-flex xs4>
                    <v-card class="card-border card-padding" outlined text-sm-left elevation="0">
                        <v-flex>
                            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15812.97476859342!2d110.3904599!3d-7.76396115!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sid!4v1681391601193!5m2!1sen!2sid" width="100%" height="250" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                        </v-flex>
                        <v-layout align-start column>
                            <p class="paragraph sub-title" py-6>Suasana Lingkungan Kos</p>
                            <div class="d-inline-flex align-center pt-3">
                                <span class="material-symbols-outlined pr-2">
                                    home
                                </span>
                                <p class="paragraph regular-text">Lingkungan Nyaman</p>
                            </div>
                            <div class="d-inline-flex align-center pt-3">
                                <span class="material-symbols-outlined pr-2">
                                    flood
                                </span>
                                <p class="paragraph regular-text">Bebas Banjir</p>
                            </div>
                        </v-layout>
                        <v-layout align-start column class="pt-4"> 
                            <p class="paragraph sub-title" >Lokasi Terdekat Kos</p>
                            <div class="d-flex justify-center pt-3">
                                <p class="paragraph regular-text">Coffee Shop</p>
                                <p class="paragraph regular-text">50 m</p>
                            </div>
                        </v-layout>
                    </v-card>
                </v-flex>
            </v-layout>

            <v-layout class="px-0 py-4" align-start column>
                <h3>Pesan Kamar Anda</h3>
            </v-layout>
            <hr>

            <!-- <v-layout class="px-0 py-4" row> -->
                <v-card class="card-border card-padding" outlined text-sm-left elevation="0">
                    <v-row>
                        <v-col cols="3"
                            md="3">
                            <div class="d-flex align-start flex-column">
                                <div style="background-color: black; height: 200px; width: 100%;"></div>
                                <div class="d-flex align-start flex-row pt-2">
                                    <img src="../../assets/Frame1.png" alt="" width="50%">
                                    <img src="../../assets/Frame1.png" alt="" width="50%">                                 
                                </div>
                                <a  class="bold-text pt-3 daftar-anchor">Lihat foto kamar lebih lanjut</a>

                                <!-- <v-btn color="#146C94" text elevation="0" class="btn-foto-kamar"></v-btn> -->
                            </div>
                            <v-flex>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur repellat totam magnam ea ipsam deserunt ex? Voluptatem praesentium ullam tempore tenetur, quia architecto perspiciatis, iusto mollitia odit corrupti non aspernatur?
                            </v-flex>
                        </v-col>
                        <v-col cols="15"
                                sm="9"
                                md="9" style="background-color: #FBF9F9;" ml-2 class="card-padding">
                            <v-row>
                                <v-col align="start">
                                        <p class="small-title paragraph">Spesifikasi Kamar</p>
                                        <ul>
                                            <li>3 x 5 m</li>
                                            <li>Tidak Termasuk Listrik</li>
                                            <li>3 x 5 m</li>
                                        </ul>
                                </v-col>
                                <v-col align="end">
                                    <p class="paragraph" style="font-size: 28px; font-weight: 700;">Tersisa 3 Kamar</p>
                                </v-col>
                            </v-row>
                            <hr>
                            <br>
                            <v-row>
                                <v-col>
                                    <v-form v-model="form">
                                        <v-flex align-start>
                                            <p>Masukkan Tanggal Mulai</p>
                                            <v-text-field
                                                v-model="tanggal_mulai"
                                                type="date"
                                                icon="event"
                                                placeholder="Placeholder"
                                                outlined
                                            ></v-text-field>
                                        </v-flex>
                                        <v-text-field
                                            v-model="jumlah_bulan"
                                            type="number"
                                            label="Masukkan Jumlah Bulan"
                                            placeholder=""
                                            outlined
                                        ></v-text-field>
                                        <v-text-field
                                            v-model="jumlah_kamar"
                                            type="number"
                                            label="Masukkan Jumlah Kamar"
                                            placeholder=""
                                            outlined
                                        ></v-text-field>
                                        <p>Rp1.500.000/bulan</p>
                                    </v-form>
                                    <v-btn color="#146C94" elevation="0" class="pengelola-btn" width="100%">Pesan Sekarang</v-btn>
                                </v-col>
                                <v-col align="end">
                                    <h3>Butuh Pertanyaan?</h3>
                                    <h4>Hubungi Pengelola</h4>
                                    <v-btn color="#19A7CE" outlined elevation="0" class="pengelola-btn" width="50%">Tanya Pengelola</v-btn>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                </v-card>
            <!-- </v-layout> -->

            <v-layout class="px-0" row> 
                <v-flex xs8>
                    <v-card class="card-border card-padding" outlined text-sm-left elevation="0">
                        <h3>Peraturan Kos</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse repudiandae pariatur odit incidunt temporibus! Soluta voluptatem reprehenderit placeat natus, error tempora eos itaque minima vel labore quam culpa eaque hic.</p>
                    </v-card>
                </v-flex>
                <v-flex xs4>
                    <v-card class="card-border card-padding" outlined text-sm-left elevation="0">
                        <h3>Biaya Tambahan</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde facere nesciunt, voluptates quibusdam ipsum exercitationem voluptatibus alias obcaecati esse sunt quasi eligendi minima commodi incidunt, officia repellendus aut rem earum!</p>
                    </v-card>
                </v-flex>
            </v-layout>

        </v-layout>
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
            form:[],
            tanggal_mulai: '',
            jumlah_bulan: '',
            jumlah_kamar: '',
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
