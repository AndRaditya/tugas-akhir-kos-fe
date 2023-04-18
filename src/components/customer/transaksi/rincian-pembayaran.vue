<template>
    <v-container grid-list-md class="pt-0">
        <v-layout column>
            <v-layout row>
                <v-layout align-start column>
                    <p class="thin-title paragraph">Rincian Pembayaran</p>
                    <p class="thin-bigger-regular-text">TRS-132012345</p>
                </v-layout>
                <v-layout justify-end class="mt-0" column style="width: 5%">
                    <p class="sudah--verifikasi-pengelola">Pesanan Sudah Diverifikasi Pengelola</p>
                    <p>&nbsp;</p>
                </v-layout>
            </v-layout>
            <v-flex style="width: 90%;">
                <v-card class="card-regular">
                    <v-layout row>
                        <v-layout>
                            <p class="thin-bigger-regular-text paragraph">Silahkan transfer sebelum</p>
                        </v-layout>
                        <v-layout>

                        </v-layout>
                    </v-layout>
                </v-card>
                <v-card class="card-regular">
                    <v-layout row>
                        <v-layout column align-start>
                            <p class="medium-regular-text">13 Maret 2023 - 13 Juni 2023</p>
                            <p class="medium-regular-text">1 Kamar</p>
                        </v-layout>
                        <v-layout justify-end align-start class="mt-0">
                            <p class="medium-regular-text">3 Bulan</p>
                            <p>&nbsp;</p>
                        </v-layout>
                    </v-layout>
                    <v-layout row>
                        <v-layout align-start>
                            <p class="regular-text">Harga Kamar Bulanan</p>
                        </v-layout>
                        <v-layout justify-end>
                            <p class="thin-regular-text">Rp1.500.000</p>
                        </v-layout>
                    </v-layout>
                    <hr>
                    <v-layout row class="mt-6">
                        <v-layout align-start>
                            <p class="paragraph thin-bigger-regular-text">Total Biaya</p>
                        </v-layout>
                        <v-layout justify-end>
                            <p class="paragraph bold-bigger-regular-text">Rp4.500.000</p>
                        </v-layout>
                    </v-layout>
                </v-card>
                <v-card class="card-regular">
                    <v-layout row >
                        <v-flex xs4>
                            <v-layout align-start>
                                <p class="thin-bigger-regular-text">Transfer Biaya</p>
                            </v-layout>
                        </v-flex>
                        <v-flex xs8>
                            <v-layout column align-start>
                                <p class="bold-bigger-regular-text">Mandiri</p>
                                <p class="bold-bigger-regular-text">123412341234</p>
                            </v-layout>
                        </v-flex>
                    </v-layout>
                    Bukti Transfer
                    <v-layout column align-start class="mt-12">
                        <p class="thin-regular-text">Silahkan tekan tombol Bayar</p>
                        <p class="paragraph thin-regular-text">Jika Anda sudah Unggah Bukti Transfer</p>
                    </v-layout>
                </v-card>
                <v-layout align-start class="my-12">
                    <v-btn color="#146C94" width="25%" class="white--text" elevation="0">Bayar</v-btn>
                </v-layout>

            </v-flex>
            
        </v-layout>
    </v-container>
</template>

<script>
</script>

<style>
</style>