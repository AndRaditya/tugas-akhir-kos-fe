<template>
    <v-container grid-list-md class="pt-0">
        <v-layout align-start>
            <p class="thin-title paragraph">Rincian Transaksi</p>
        </v-layout>
        <v-layout column class="layout-main" mt-6>
            <v-card class="card-regular">
                <v-layout column>
                    <v-layout row align-start>
                        <v-layout column align-start>
                            <p class="medium-bigger-regular-text">13 Maret 2023</p>
                            <p class="thin-bigger-regular-text">TRS-132012345</p>
                        </v-layout>
                        <v-layout justify-end class="mt-0">
                            <p class="belum--verifikasi-pengelola">Menunggu Verifikasi Pengelola</p>
                            <!-- <p class="sudah--verifikasi-pengelola">Menunggu Verifikasi Pengelola</p> -->
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
                                <p class="medium-bigger-regular-text">14 Maret 2023</p>
                                <p class="medium-bigger-regular-text">14 Juni 2023</p>
                                <p class="medium-bigger-regular-text">3 Bulan</p>
                                <p class="medium-bigger-regular-text">1 Kamar</p>
                            </v-layout>
                        </v-flex>
                    </v-layout>
                    <v-layout row class="mt-16">
                        <v-layout column align-start>
                            <p class="thin-bigger-regular-text">Total Biaya</p>
                            <p class="bold-bigger-regular-text paragraph">Rp4.500.000</p>
                        </v-layout>
                        <v-layout justify-end>
                            <v-btn color="#146C94" width="50%" class="white--text" elevation="0">Lakukan Pembayaran</v-btn>
                        </v-layout>
                    </v-layout>
                </v-layout>
            </v-card>
        </v-layout>
    </v-container>
</template>

<script>

</script>

<style>


</style>