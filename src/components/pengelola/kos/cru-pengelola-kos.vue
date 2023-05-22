<template>
    <v-container grid-list-md v-if="ready">
        <div class="pengelola-kos__grid">
            <div class="pengelola-kos__grid-1">
                <p class="title__main ">Ubah Data Kos</p>
            </div>
            <div class="pengelola-kos__grid-2">
                <v-form @submit.prevent="validateForm()" v-model="valid" ref="form_data_kos" autofocus lazy-validation>
                    <div class="pengelola-kos__grid-2__parent">
                        <div class="pengelola-kos__grid-2__form-1">
                            <v-layout column align-start>
                                <p class="regular-text__medium">Tipe Kos</p>
                            </v-layout>
                            <v-select
                                outlined
                                label="Masukkan Tipe Kos"
                                v-model="kos_model.tipe"
                                :items="tipe_kos"
                            ></v-select>
                            <v-layout column align-start>
                                <p class="regular-text__medium">Ukuran Kamar</p>
                            </v-layout>
                            <v-text-field
                                outlined
                                label="Masukkan Ukuran Kamar"
                                v-model="ukuran_kamar"
                            ></v-text-field>
                            <div class="pengelola-kos__grid-2__form-1__listrik">
                                <div class="pengelola-kos__grid-2__form-1__listrik--child-1">
                                    <p class="regular-text__medium paragraph">Listrik</p>
                                </div>
                                <div class="pengelola-kos__grid-2__form-1__listrik--child-2">
                                    <p class="regular-text__thin paragraph">Termasuk Listrik</p>
                                </div>
                                <div class="pengelola-kos__grid-2__form-1__listrik--child-3">
                                    <v-radio-group row class="ma-0 pa-0 ml-4" v-model="termasuk_listrik">
                                        <v-radio label="Ya" value="Termasuk Listrik"></v-radio>
                                        <v-radio label="Tidak" value="Tidak Termasuk Listrik"></v-radio>
                                    </v-radio-group>
                                </div>
                                <div class="pengelola-kos__grid-2__form-1__listrik--child-4">
                                    <p class="regular-text__thin paragraph">Jenis Listrik</p>
                                </div>
                                <div class="pengelola-kos__grid-2__form-1__listrik--child-5">
                                    <v-radio-group row class="ma-0 pa-0 ml-4" v-model="jenis_listrik">
                                        <v-radio label="Token" value="Listrik Token"></v-radio>
                                        <v-radio label="Meteran" value="Listrik Meteran"></v-radio>
                                    </v-radio-group>
                                </div>
                            </div>
                            <v-layout column align-start class="mt-4">
                                <p class="regular-text__medium">Fasilitas Kos</p>
                            </v-layout>
                            <v-select
                                outlined
                                label="Masukkan Fasilitas Kos"
                                v-model="kos_model.kos_fasilitas"
                                multiple
                                chips
                                :items="kos_fasilitas_items"
                            ></v-select>
                            <v-layout column align-start class="mt-4">
                                <p class="regular-text__medium">Deskripsi Kos</p>
                            </v-layout>
                            <v-textarea
                                outlined
                                label="Masukkan Deskripsi Kos"
                                v-model="kos_model.deskripsi"
                            ></v-textarea>
                            <v-layout column align-start>
                                <p class="regular-text__medium">Peraturan Kos</p>
                            </v-layout>
                            <v-textarea
                                outlined
                                label="Masukkan Peraturan Kos"
                                v-model="kos_model.peraturan"
                            ></v-textarea>
                        </div>
                        <div class="pengelola-kos__grid-2__form-2">
                            <div class="pengelola-kos__grid-2__form-2--child-1">
                                <p class="regular-text__medium paragraph">Foto Kos</p>
                            </div>
                            <div class="pengelola-kos__grid-2__form-2--child-2">
                                <div class="pengelola-kos__grid-2__form-2--child-2__photo-1" :style="{backgroundImage: `url(${urls[0]})`}">
                                    <v-btn icon small class="error my-auto pengelola-kos__grid-2__form-2--child-2__button" 
                                    @click="removeImage(0)" v-if="urls[0]">
                                    <span class="material-icons">delete</span>
                                    </v-btn>
                                </div>
                                <div class="pengelola-kos__grid-2__form-2--child-2__photo-2" :style="{backgroundImage: `url(${urls[1]})`}">
                                    <v-btn icon small class="error my-auto pengelola-kos__grid-2__form-2--child-2__button" 
                                    @click="removeImage(1)" v-if="urls[1]">
                                    <span class="material-icons">delete</span>
                                    </v-btn>
                                </div>
                                <div class="pengelola-kos__grid-2__form-2--child-2__photo-3" :style="{backgroundImage: `url(${urls[2]})`}">
                                    <v-btn icon small class="error my-auto pengelola-kos__grid-2__form-2--child-2__button" 
                                    @click="removeImage(2)" v-if="urls[2]">
                                    <span class="material-icons">delete</span>
                                    </v-btn>
                                </div>
                                <div class="pengelola-kos__grid-2__form-2--child-2__photo-4" :style="{backgroundImage: `url(${urls[3]})`}">
                                    <v-btn icon small class="error my-auto pengelola-kos__grid-2__form-2--child-2__button" 
                                    @click="removeImage(3)" v-if="urls[3]">
                                    <span class="material-icons">delete</span>
                                    </v-btn>
                                </div>
                                <div class="pengelola-kos__grid-2__form-2--child-2__photo-5" :style="{backgroundImage: `url(${urls[4]})`}">
                                    <v-btn icon small class="error my-auto pengelola-kos__grid-2__form-2--child-2__button" 
                                    @click="removeImage(4)" v-if="urls[4]">
                                    <span class="material-icons">delete</span>
                                    </v-btn>
                                </div>
                                <div class="pengelola-kos__grid-2__form-2--child-2__photo-6" :style="{backgroundImage: `url(${urls[5]})`}">
                                    <v-btn icon small class="error my-auto pengelola-kos__grid-2__form-2--child-2__button" 
                                    @click="removeImage(5)" v-if="urls[5]">
                                    <span class="material-icons">delete</span>
                                    </v-btn>
                                </div>

                            </div>
                            <div class="pengelola-kos__grid-2__form-2--child-3">
                                <v-btn outlined elevation="0" mx-0 color="#333" class="button__lihat-foto" @click="imageDialog = true">
                                    <span class="material-symbols-outlined">
                                    photo_camera
                                    </span>
                                    &nbsp;Lihat Semua Foto
                                </v-btn>
                            </div>
                            <div class="pengelola-kos__grid-2__form-2--child-4">
                                <v-btn      
                                    outlined                           
                                    elevation="0" 
                                    @click="onPickFile()" 
                                    class="btn__tambah-foto" >
                                    Tambahkan Foto
                                </v-btn>
                                <input type="file" class="form-control" ref="file" @change="onFileChange($event.target.files)" style="display: none">
                            </div>
                        </div>
                        <div class="pengelola-kos__grid-2__form-3">
                            <v-btn elevation="0" class="white--text btn__simpan-perubahan" ref="form_profile" type="submit">Simpan Perubahan</v-btn>
                        </div>
                    </div>
                </v-form>
            </div>
        </div>

        <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom class="white--text">{{ error_message }}</v-snackbar>

        <v-dialog v-model="imageDialog" :lazy="true" max-width="60vw">
            <v-card class="rounded-card">
                <v-toolbar dark color="primary" dense flat>
                </v-toolbar>

                <v-layout row align-center justify-center wrap fill-height class="pa-0 ma-0">
                    <v-flex
                        v-for="(url, index) in urls"
                        :key="index"
                        class="preview-img-flex ma-2 mr-2 mb-2"
                        shrink
                    >
                        <v-layout column>
                            <v-card elevation-0>
                                <v-img
                                    v-if="url"
                                    :src="url"
                                    width="300"
                                    height="200"
                                    contain
                                    class="grey lighten-5"
                                ></v-img>
                            </v-card>
                            <v-flex v-if="url" mt-2>
                                <v-btn
                                    icon
                                    small
                                    class="error my-auto"
                                    @click="removeImage(index)"
                                    ><span class="material-icons">
                                    delete
                                    </span></v-btn>
                            </v-flex>
                        </v-layout>
                    </v-flex>
                </v-layout>

                <v-card-actions py-0 px-4 ma-0>
                    <v-flex class="ma-0 pa-2 justify-center">
                        <v-btn raised round color="primary" class="right mx-2" @click="imageDialog = false" dark>Close</v-btn>
                    </v-flex>
                </v-card-actions>
            </v-card>
        </v-dialog>

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
        apiKosFasilitas: {
            type: String,
            required: true
        },
        apiPhoto: {
            type: String,
            required: true
        },
    },
    data(){
        return{
            ready: false,
            id : 2,
            deletedImages: [],
            urls: [],
            valid: false,
            imageDialog: false, 

            model: {},
            snackbar: '',
            color: '',
            error_message: '',
            fileName: '',

            tipe_kos: ['Kost Putri', 'Kost Putra', 'Kost Campuran'],
            kos_fasilitas_items: [],

            kos_model:{},
            kamar_spesifikasi_model:{},
            kos_fasilitas:{},
            kos_photos:{},

            termasuk_listrik: '',
            jenis_listrik: '',
            ukuran_kamar: '',
            kamar_spesifikasi_temp: [],
        }
    },
    created(){
        this.initModel();
        this.initData();
    },
    methods:{
        initData(){
            this.getKosFasilitas();
            this.initAxio();
        },

        initModel(){
            this.kos_model = {
                id: null,
                name: '',
                tipe: '',
                peraturan: '',
                deskripsi: '',
                kos_photos: [],
                kos_fasilitas: [],
                kamar_spesifikasi: [],
            }
        },
        kamarSpesifikasi(){
            this.kamar_spesifikasi_temp.push({
                jenis: 'termasuk_listrik',
                desc: this.termasuk_listrik,
            });

            this.kamar_spesifikasi_temp.push({
                jenis: 'jenis_listrik',
                desc: this.jenis_listrik,
            });
            
            this.kamar_spesifikasi_temp.push({
                jenis: 'ukuran_kamar',
                desc: this.ukuran_kamar,
            });
        },

        validateForm () {
                this.devLog('valid')
                this.devLog("validating");
                this.valid = (this.$refs.form_data_kos).validate();
                this.devLog(this.valid);

                if (this.valid == true) {
                    this.submitForm();
                }else{
                    window.scrollTo(0,0);
                }
        },

        initAxio(){
            this.$http.get(this.api+this.id, {headers : {
                Authorization: localStorage.token,
            }})
            .then(response => {
                this.devLog("Axio: " +response.status);
                if(response.status == 200){
                    if(response.data.api_status == "fail"){
                        this.devLog('response fail')
                        this.error_message = response.data.api_title;
                        this.color = "red";
                        this.snackbar = true;
                    }else{
                        this.kos_model = response.data.data[0];
                        this.devLog(this.kos_model)
                        this.getTextKamarSpec();
                        this.getKosFasilitasAxio();
                        this.ready = true;
                        this.initPhoto();

                        // for (let i = 0; i < this.kos_model.kos_photos.length; i++) {
                        //     if (this.kos_model.kos_photos[i].url) {
                        //         this.updatePhoto(i);
                        //     }
                        // }
                    }
                }
            }).catch((err)=>{
                this.devLog(err);
                this.ready = false;
                this.error_message = err.response.data;
                this.color = "red";
                this.snackbar = true;
            });
        },  
        
        submitForm(){
            this.kamarSpesifikasi();
            this.kos_model.kamar_spesifikasi = this.kamar_spesifikasi_temp;

            this.devLog(this.api+this.id)
            this.devLog(JSON.stringify(this.kos_model));
            this.devLog(this.kos_model);
            this.devLog(this.deletedImages);

            this.$http.put(this.api+this.id, this.kos_model, {headers : {
                Authorization: localStorage.token,
            }})
            .then(response => {
                this.devLog("update kos: " +response.status);
                if(response.status == 202){
                    if(response.data.api_status == "fail"){
                        this.devLog('response fail')
                        this.error_message = response.data.api_title;
                        this.color = "red";
                        this.snackbar = true;
                    }else{
                        if (this.deletedImages.length > 0) {
                            for (let j = 0; j < this.deletedImages.length; j++) {
                                this.removeImageWithAPI(this.deletedImages[j]);
                            }
                            this.devLog("image deleted with api");
                        }

                        this.error_message = 'Berhasil Update Data';
                        this.color = "green";
                        this.snackbar = true;
                    }
                }
            }).catch((err)=>{
                this.error_message = err.response.data;
                this.color = "red";
                this.snackbar = true;
            });
        },  

        getKosFasilitasAxio(){
            let kos_fasilitas_temp = [];
            kos_fasilitas_temp = this.kos_model.kos_fasilitas;
            this.kos_model.kos_fasilitas = [];

            this.devLog('kos_fasilitas_temp');
            this.devLog(kos_fasilitas_temp);

            kos_fasilitas_temp.forEach((element) => {
                this.kos_model.kos_fasilitas.push(element.name)
            })
        },

        getTextKamarSpec(){
            this.kos_model.kamar_spesifikasi.forEach((element) => {
                if(element.jenis == 'termasuk_listrik'){
                    this.termasuk_listrik = element.desc
                }
                else if(element.jenis == 'jenis_listrik'){
                    this.jenis_listrik = element.desc
                }
                else if(element.jenis == 'ukuran_kamar'){
                    this.ukuran_kamar = element.desc
                }
            })
        },

        getKosFasilitas(){
            this.kos_fasilitas_items = ['Kulkas', 'Parkir Luas', 'Wi-Fi', 'Dapur', 'Tempat Cuci Baju', 'Tempat Jemur'];
        },

        initPhoto() {
            this.kos_model.kos_photos.forEach((element) => {
                this.urls.push(element.photo_path);
            });
        },

        onPickFile() {
            this.$refs.file.click();
        },

        onFileChange(file) {
            let imageFile = file[0];
            if (file.length > 0) {
                if (!imageFile.type.match("image.*")) {
                    this.errorDialog = true;
                    this.errorText = "Please choose an image file";
                } else {
                    let imageURL = URL.createObjectURL(imageFile);
                    this.fileName = imageFile.name;

                    this.devLog("onfilechange");
                    let reader = new FileReader();
                    reader.onloadend = (e) => {
                        this.devLog(e.target);
                        let image_url = e.target.result;

                        this.kos_model.kos_photos.push({
                            image_url: image_url,
                        });
                    };
                    reader.readAsDataURL(imageFile);

                    this.urls.push(imageURL);
                }
            }
        },

        removeImage(index) {
            if(this.kos_model.kos_photos[index].photo_path){
                this.deletedImages.push(this.kos_model.kos_photos[index]);
            }
            this.devLog('delete image ');
            this.devLog(this.deletedImages);

            this.urls[index] = null;
            this.urls.splice(index, 1);
            this.kos_model.kos_photos.splice(index, 1);
        },

        removeImageWithAPI(deleteImage) {
            this.$http.put(this.apiPhoto + this.id, {kos_photos: deleteImage}, {headers : {
                Authorization: localStorage.token,
            }})
            .then((response) => {
                    if(response.status == 202){
                        if(response.data.api_status == "fail"){
                            this.devLog('response fail')
                            this.error_message = response.data.api_title;
                            this.color = "red";
                            this.snackbar = true;
                        }else{
                            this.error_message = 'Berhasil Update Data';
                            this.color = "green";
                            this.snackbar = true;
                        }
                    }
                })
            .catch((err) => {
                this.error_message = err.response.data.message;
                this.color = "red";
                this.snackbar = true;
            });
        },
    }
}
</script>

<style scoped>
    .preview-img-flex {
        flex: none;
    }
</style>