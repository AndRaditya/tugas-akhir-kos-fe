<template>
    <!-- <v-main> -->
        <v-container grid-list-md class="pt-0">
            <v-layout align-start>
                <p class="thin-title paragraph">Rincian Pesanan</p>
            </v-layout>
            <v-layout column class="layout-main" mt-6>
                <v-layout align-start row> 
                    <v-flex xs7>
                        <v-layout column>
                            <v-card class="card-pesanan">
                                <v-layout align-start class="pb-4">
                                    <p class="sub-title paragraph">Rincian Pemesan</p>
                                </v-layout>
                                <hr>
                                <v-layout row align-start class="pt-4">
                                    <v-layout column align-start>
                                        <p class="thin-text">Nama Lengkap</p>
                                        <p class="thin-text">Nomor Telepon</p>
                                        <p class="thin-text">Email</p>
                                    </v-layout>
                                    <v-layout column align-start>
                                        <p class="bold-regular-text">Andreas Raditya</p>
                                        <p class="bold-regular-text">Andreas Raditya</p>
                                        <p class="bold-regular-text">Andreas Raditya</p>
                                    </v-layout>
                                </v-layout>

                            </v-card>
                            <v-card class="card-pesanan">
                                <v-layout column>
                                    <v-layout row class="layout-price-bg">
                                        <v-flex xs6>
                                            <v-layout column align-start>
                                                <p class="regular-text">Harga Kamar Bulanan</p>
                                                <p class="regular-text">Biaya Pesanan</p>
                                            </v-layout>
                                        </v-flex>
                                        <v-flex xs6>
                                            <v-layout column align-start>
                                                <p class="bold-regular-text">Rp1.500.000</p>
                                                <p class="bold-regular-text" style="color: #19A7CE;">Gratis</p>
                                            </v-layout>
                                        </v-flex>
                                    </v-layout>

                                    <v-layout row align-start class="mt-6">
                                        <v-flex xs6>
                                            <v-layout column align-start>
                                                <p class="regular-text">Total Biaya</p>
                                            </v-layout>
                                        </v-flex>
                                        <v-flex xs6>
                                            <v-layout column align-start>
                                                <p class="bold-regular-text">Rp4.500.000</p>
                                            </v-layout>
                                        </v-flex>
                                    </v-layout>

                                    <v-btn color="#146C94" width="30%" class="white--text">Pesan</v-btn>

                                    <v-layout column align-start mt-12>
                                        <p class="paragraph">Masih Ragu dengan Pesanan Anda?</p>
                                        <a  class="bold-text pt-2 batal-anchor">Batalkan Pesanan</a>
                                    </v-layout>
                                </v-layout>
                            </v-card>
                        </v-layout>
                    </v-flex>
                    <v-flex xs4 class="ml-4">
                        <v-layout column>
                            <v-card class="card-pesanan">
                                <v-layout column align-start>
                                    <p class="thin-sub-title paragraph">Kost Catleya</p>
                                    <div class="d-inline-flex align-center pt-2"><span class="material-symbols-outlined pr-2">
                                    location_on
                                </span><p class="bold-regular-text paragraph">Depok, Sleman, Yogyakarta</p></div>
                                </v-layout>
                            </v-card>
                            <v-card class="card-pesanan">
                                <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15812.97476859342!2d110.3904599!3d-7.76396115!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sid!4v1681391601193!5m2!1sen!2sid" width="100%" height="250" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                                <v-layout align-start>
                                    <a class="bold-text pt-3 daftar-anchor">Lihat lokasi terdekat</a>
                                </v-layout>
                            </v-card>
                            <v-card class="card-pesanan">
                                <v-layout column align-start>
                                    <p class="bold-regular-text">13 Maret 2023 - 13 Juni 2023</p>
                                    <p class="bold-regular-text">3 Bulan</p>
                                    <p class="bold-regular-text pt-4">1 Kamar Kos</p>
                                    <img src="../../../assets/Frame1.png" alt="" width="100%">

                                </v-layout>
                            </v-card>
                        </v-layout>
                    </v-flex>
                </v-layout>
            </v-layout>
        </v-container>
    <!-- </v-main> -->
</template>

<script>
    export default{
        name:"rincian-pesanan"
    }
</script>

<style scoped>
    .card-pesanan{
        margin-top: 12px;
        padding: 32px;
    }
    .layout-price-bg{
        margin: -12px !important;
        padding: 12px;
        background-color: #FBF9F9;
    }

    .batal-anchor{
        color:#DF2E38 !important;
    }
</style>