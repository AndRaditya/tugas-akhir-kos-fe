<template>
    <v-container grid-list-md class="pa-" v-if="ready">
        <v-layout align-start wrap class="mt-4 ml-6">
            <p class="main-title ">Ubah Data Kos</p>
        </v-layout>
        <v-form @submit.prevent="validateForm()" v-model="valid" ref="form_data_kos" autofocus lazy-validation>
            <v-layout align-start justify-center row class="mt-4 pl-2">
                <v-flex xs4>
                    <v-layout column>
                        <v-layout column align-start>
                            <p class="medium-regular-text">Tipe Kos</p>
                        </v-layout>
                        <v-select
                            outlined
                            label="Masukkan Tipe Kos"
                            v-model="kos_model.tipe"
                            :items="tipe_kos"
                        ></v-select>
                        <v-layout column align-start>
                            <p class="medium-regular-text">Ukuran Kamar</p>
                        </v-layout>
                        <v-text-field
                            outlined
                            label="Masukkan Ukuran Kamar"
                            v-model="ukuran_kamar"
                        ></v-text-field>
                        <v-layout column align-start>
                            <p class="medium-regular-text mb-6">Listrik</p>
                            <v-layout>
                                <p class="thin-regular-text paragraph mr-4">Termasuk Listrik</p>
                                <v-radio-group row class="ma-0 pa-0 ml-4" v-model="termasuk_listrik">
                                    <v-radio label="Ya" value="Termasuk Listrik"></v-radio>
                                    <v-radio label="Tidak" value="Tidak Termasuk Listrik"></v-radio>
                                </v-radio-group>
                            </v-layout>
                            <v-layout>
                                <p class="thin-regular-text mr-6">Jenis Listrik</p>
                                <v-radio-group row class="ma-0 pa-0 ml-4" v-model="jenis_listrik">
                                    <v-radio label="Token" value="Listrik Token"></v-radio>
                                    <v-radio label="Meteran" value="Listrik Meteran"></v-radio>
                                </v-radio-group>
                            </v-layout>
                        </v-layout>
                        <v-layout column align-start class="mt-4">
                            <p class="medium-regular-text">Fasilitas Kos</p>
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
                            <p class="medium-regular-text">Deskripsi Kos</p>
                        </v-layout>
                        <v-textarea
                            outlined
                            label="Masukkan Deskripsi Kos"
                            v-model="kos_model.deskripsi"
                        ></v-textarea>
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
                <v-flex xs7 class="ml-8">
                    <v-layout column>
                        <v-layout column align-start>
                            <p class="medium-regular-text">Foto Kos</p>
                        </v-layout>
                        <v-layout row wrap class="">
                            <v-flex
                                v-for="(url, index) in urls.slice(0, 6)"
                                :key="index"
                                class="preview-img-flex ma-2 mr-2 mb-2"
                                shrink
                            >
                                <v-layout v-if="index < 6" column>
                                    <v-card elevation-0 style="cursor: pointer">
                                        <v-img
                                            v-if="url"
                                            :src="url"
                                            width="310"
                                            height="200"
                                            contain
                                            class="grey lighten-5"
                                            @click="openDialogImage(url)"
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
                        <v-layout justify-end class="pb-4">
                            <v-btn outlined elevation="0" mx-0 color="#333" class="foto-btn" @click="imageDialog = true">
                                <span class="material-symbols-outlined">
                                photo_camera
                                </span>
                                &nbsp;Lihat Semua Foto
                            </v-btn>
                        </v-layout>
                        <v-layout justify-end class="pb-8">
                            <v-btn      
                                outlined                           
                                elevation="0" 
                                @click="onPickFile()" 
                                class="tambah-foto-btn" >
                                Tambahkan Foto
                            </v-btn>
                            <input type="file" class="form-control" ref="file" @change="onFileChange($event.target.files)" style="display: none">
                        </v-layout>
                    </v-layout>
                </v-flex>
            </v-layout>
            <v-flex class="my-4">
                <v-btn elevation="0" class="white--text btn-simpan-perubahan" ref="form_profile" type="submit" width="30%">Simpan Perubahan</v-btn>
            </v-flex>
        </v-form>
        <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom class="white--text">{{ error_message }}</v-snackbar>

        <v-dialog v-model="imageDialog" :lazy="true" max-width="60vw">
            <v-card class="rounded-card">
                <v-toolbar dark color="primary" dense flat>
                </v-toolbar>

                <v-layout row wrap fill-height class="pa-0 ma-0">
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
                                    width="350"
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
                console.log('valid')
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
            this.$http.put(this.apiPhoto + this.id, {kos_photos: deleteImage})
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

        // updatePhoto(index) {
        //     let url = this.kos_model.kos_photos[index].url;
        //     fetch(url)
        //         .then((res) => res.blob())
        //         .then((blob) => {
        //             this.devLog("index i " + index);
        //             this.readFile(blob, index);
        //         });
        // },

        // readFile(input, index) {
        //     const fr = new FileReader();
        //     fr.readAsDataURL(input);
        //     this.devLog(fr.result);
        //     fr.addEventListener("load", () => {
        //         this.devLog(fr);
        //         const res = fr.result;
        //         this.devLog("index " + index);
        //         this.kos_model.kos_photos[index].image_url = res;

        //         this.devLog("this.kos_model.kos_photos[index]");
        //         this.devLog(this.kos_model.kos_photos[index]);
        //     });
        // },
    }
}
</script>

<style scoped>
    .preview-img-flex {
        flex: none;
    }
</style>