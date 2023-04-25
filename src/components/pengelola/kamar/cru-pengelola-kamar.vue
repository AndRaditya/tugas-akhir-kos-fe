<template>
    <v-container grid-list-md class="pt-0">
        <v-layout align-start>
            <v-layout align-start>
                <p class="main-title">{{ nav_title }} Kamar</p>
            </v-layout>
        </v-layout>
        <v-form @submit.prevent="validateForm()" v-model="valid" ref="form_data-kamar" autofocus lazy-validation>
            <v-layout row class="mt-6">
                <v-flex xs5>
                    <v-layout column>
                        <v-layout align-start column>
                            <p class="regular-text">Nomor Kamar</p>
                        </v-layout>
                        <v-select
                            v-model="kamar_model.number"
                            placeholder="Masukkan Nomor Kamar"
                            outlined
                            :items="nomor_kamar"
                            :readonly="!ubahNomor"
                        ></v-select>
                        <v-layout align-start column>
                            <p class="regular-text">Penyewa</p>
                        </v-layout>
                        <v-text-field
                            v-model="kamar_model.nama_penyewa"
                            placeholder="Masukkan Penyewa Kamar"
                            outlined
                            :readonly="!editable"
                        ></v-text-field>
                        <v-layout align-start column>
                            <p class="regular-text">Status Kamar</p>
                        </v-layout>
                        <v-select
                            v-model="kamar_model.status"
                            placeholder="Masukkan Status Kamar"
                            outlined
                            :items="status_kamar"
                            :readonly="!editable"
                        ></v-select>
                        <v-layout align-start column>
                            <p class="regular-text">Fasilitas Kamar</p>
                        </v-layout>
                        <v-select
                            v-model="kamar_model.status"
                            placeholder="Masukkan Status Kamar"
                            outlined
                            :items="status_kamar"
                            :readonly="!editable"
                        ></v-select>
                        <v-layout align-start column>
                            <p class="regular-text">Harga Kamar</p>
                        </v-layout>
                        <v-text-field
                            v-model="kamar_model.harga"
                            label="Masukkan Harga Kamar"
                            :prefix="prefix"
                            :readonly="!editable"
                            type="number"
                            hide-spin-buttons
                            outlined
                        ></v-text-field>

                    </v-layout>
                </v-flex>
                <v-flex xs6>
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
                </v-flex>
            </v-layout>
            <v-flex class="my-4" v-if="editable">
                <v-btn elevation="0" class="white--text btn-simpan-perubahan" ref="form_profile" type="submit" width="30%">Simpan Perubahan</v-btn>
            </v-flex>
        </v-form>
        <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom class="white--text">{{ error_message }}</v-snackbar>

    </v-container>
</template>

<script>
export default {
    name: 'cru-pengelola-kamar',
    props: {
        api: {
            type: String,
            default: "no_data",
        },
        editable: {
            type: Boolean,
            default: false,
        },
        ubahNomor: {
            type: Boolean,
            default: false,
        },
        prefix: {
			type: String,
            default: "Rp.",
		},
    },

    data(){
        return{
            id: null,
            valid: false,
            nav_title: "",
            nav_path: [],

            kamar_model:{},
            kamar_model_temp: {},
            kamar_fasilitas_model: {},
            kamar_photos: {},
            snackbar: '',
            color: '',
            error_message: '',

            status_kamar: ['Dipakai', 'Kosong'],
            nomor_kamar: [1, 2, 3, 4, 5, 6, 7, 8]
        }
    },
    created(){
        this.id = this.$route.params.id;
        this.devLog(this.editable + 'editable');
        this.initData();
        this.initAxio();
    },
    methods:{
        initData(){
            this.initModel();
            this.nav_path = this.$route.path.split("/");
            var last = this.nav_path.length -1;
            for (var i = 1; i <= last; i++) {
                switch (this.nav_path[i]) {
                case "pengelola-kamar":
                    this.nav_path[i] = "Pengelola Kamar";
                    break;
                case "add":
                    this.nav_title = "Tambah";
                    break;
                case "edit":
                    this.nav_title = "Ubah";
                    last -= 1;
                    break;

                default:
                    //Nothing
                    this.nav_title = "Detail";
                    break;
                }
            }
        },
        initAxio(){
            this.devLog(this.nav_title);
            if(this.nav_title == "Ubah" || this.nav_title == "Detail"){
                this.devLog('this.id');
                this.devLog(this.id);

                this.$http.get(this.api+this.id)
                    .then(response => {
                        this.devLog("get user result code: " + response.status);
                        if(response.status == 200){
                            if(!response.data){
                                this.devLog('response fail')
                            }else{
                                this.kamar_model = response.data.data[0];
                                this.devLog(this.kamar_model)
                                this.getNomorKamar();
                            }
                        }
                    }).catch((err)=>{
                        this.error_message = err.response.data.message;
                        this.color = "red";
                        this.snackbar = true;
                    });
            }

        },
        getNomorKamar(){
            this.$http.get(this.api)
                .then(response => {
                    this.devLog("get user result code: " + response.status);
                    if(response.status == 200){
                        if(!response.data){
                            this.devLog('response fail')
                        }else{
                            this.kamar_model_temp = response.data.data;
                            this.devLog(this.kamar_model_temp)
                            if(this.nav_title == "Tambah"){
                                this.tambahKamarNomor();
                            }
                        }
                    }
                }).catch((err)=>{
                    this.error_message = err.response.data.message;
                    this.color = "red";
                    this.snackbar = true;
                });
        },
        initModel(){
            this.kamar_model = {
                id: null,
                number: null,
                kamar_fasilitas_id: null,
                status: '',
                harga: null,
                nama_penyewa: '',
            }
            
            this.kamar_model_temp = {
                id: null,
                number: null,
                kamar_fasilitas_id: null,
                status: '',
                harga: null,
                nama_penyewa: '',
            }
        },
        tambahKamarNomor(){
            const nomor_model  = [];
            
            for(let i = 0; i < this.kamar_model_temp.length; i++){
                nomor_model.push(this.kamar_model_temp[i].number)
            }

            this.nomor_kamar = this.nomor_kamar.filter(function(val) {
                return nomor_model.indexOf(val) == -1;
            });

            this.devLog('this.nomor_kamar');
            this.devLog(this.nomor_kamar);
        },
    }
}
</script>

<style scoped>

</style>