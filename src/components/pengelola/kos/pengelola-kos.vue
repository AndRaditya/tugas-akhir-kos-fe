<template>
    <v-container grid-list-md class="pt-0">
        <v-layout align-start>
            <p class="main-title">Ubah Data Kos</p>
        </v-layout>
        <v-form @submit.prevent="validateForm()" v-model="valid" ref="form_data_kos" autofocus lazy-validation>
            <v-layout row class="mt-4 pl-2">
                <v-flex xs4>
                    <v-layout column>
                        <v-layout column align-start>
                            <p class="medium-regular-text">Tipe Kos</p>
                        </v-layout>
                        <v-select
                            outlined
                            label="Masukkan Tipe Kos"
                            v-model="kos_model.tipe"
                        ></v-select>
                        <v-layout column align-start>
                            <p class="medium-regular-text">Ukuran Kamar</p>
                        </v-layout>
                        <v-text-field
                            outlined
                            label="Masukkan Ukuran Kamar"
                            v-model="kos_model.name"
                        ></v-text-field>
                        <v-layout column align-start>
                            <p class="medium-regular-text mb-6">Listrik</p>
                            <v-layout>
                                <p class="thin-regular-text paragraph mr-4">Termasuk Listrik</p>
                                <v-radio-group row class="ma-0 pa-0 ml-4">
                                    <v-radio label="Ya" value="1"></v-radio>
                                    <v-radio label="Tidak" value="2"></v-radio>
                                </v-radio-group>
                            </v-layout>
                            <v-layout>
                                <p class="thin-regular-text mr-6">Jenis Listrik</p>
                                <v-radio-group row class="ma-0 pa-0 ml-4">
                                    <v-radio label="Ya" value="1"></v-radio>
                                    <v-radio label="Tidak" value="2"></v-radio>
                                </v-radio-group>
                            </v-layout>
                        </v-layout>
                        <v-layout column align-start class="mt-4">
                            <p class="medium-regular-text">Fasilitas Kos</p>
                        </v-layout>
                        <v-select
                            outlined
                            label="Masukkan Fasilitas Kos"
                            v-model="kos_model.tipe"
                        ></v-select>
                        <v-layout column align-start class="mt-4">
                            <p class="medium-regular-text">Deskripsi Kos</p>
                        </v-layout>
                        <v-textarea
                            outlined
                            label="Masukkan Deskripsi Kos"
                            v-model="kos_model.deskripsi"
                        ></v-textarea>
                    </v-layout>
                </v-flex>
                <v-flex xs7 class="ml-8">
                    <v-layout column>
                        <v-layout></v-layout>
                        <v-layout justify-end class="pb-4">
                            <v-btn outlined elevation="0" mx-0 color="#333" class="foto-btn">
                                <span class="material-symbols-outlined">
                                photo_camera
                                </span>
                                &nbsp;Lihat Semua Foto
                            </v-btn>
                        </v-layout>
                        <v-layout justify-end class="pb-8">
                            <v-btn outlined elevation="0" class="tambah-foto-btn">Tambahkan Foto
                            </v-btn>
                        </v-layout>

                        <v-layout column align-start>
                            <p class="medium-regular-text">Peraturan Kos</p>
                        </v-layout>
                        <v-textarea
                            outlined
                            label="Masukkan Peraturan Kos"
                            v-model="kos_model.peraturan"
                        ></v-textarea>

                    </v-layout>
                </v-flex>
            </v-layout>
        </v-form>
        <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom class="white--text">{{ error_message }}</v-snackbar>
    </v-container>
</template>

<script>
export default {
    name: 'pengelola-kos',
    props:{
        api: {
            type: String,
            required: true
        },
    },
    data(){
        return{
            valid: false,
            model: {},
            snackbar: '',
            color: '',
            error_message: '',


            kos_model:{},
            kamar_spesifikasi:{},
            kos_fasilitas:{},
            kos_photos:{},
        }
    },
    created(){
        this.initModel();
    },
    methods:{
        initData(){

        },
        initModel(){
            this.kos_model = {
                id: null,
                name: '',
                tipe: '',
                peraturan: '',
                deskripsi: '',
            },
            this.kamar_spesifikasi = {
                name: '',
                kos_id: null,
            },
            this.kos_fasilitas = {
                name: '',
                kos_id: null,
            }
        },
        getData(){

        },
    }
}
</script>

<style scoped>

</style>