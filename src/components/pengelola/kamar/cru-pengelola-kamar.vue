<template>
    <v-container grid-list-md class="pt-0">
        <v-layout align-start>
            <v-layout align-start>
                <p class="main-title">{{ nav_title }} Kamar</p>
            </v-layout>
        </v-layout>
        <v-form @submit.prevent="validateForm()" v-model="valid" ref="form_data_kamar" autofocus lazy-validation>
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
                            :rules="requiredRule"
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
                            :rules="requiredRule"
                        ></v-select>
                        <v-layout align-start column>
                            <p class="regular-text">Fasilitas Kamar</p>
                        </v-layout>
                        <v-select
                            v-model="kamar_model.kamar_fasilitas"
                            placeholder="Masukkan Fasilitas Kamar"
                            outlined
                            :items="kamar_fasiitas_items"
                            :readonly="!editable"
                            multiple
                            chips
                            :rules="requiredRule2"
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
                <v-flex xs6 class="ml-8">
                    <v-layout row wrap class="">
                        <v-flex
                            v-for="(url, index) in urls"
                            :key="index"
                            class="preview-img-flex ma-2 mr-2 mb-2"
                            shrink
                        >
                            <v-layout v-if="index < 6" column>
                                <v-card elevation-0 style="cursor: pointer">
                                    <v-img
                                        v-if="url"
                                        :src="url"
                                        width="275"
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
                    <v-layout justify-end class="pb-4">
                        <v-btn outlined elevation="0" mx-0 color="#333" class="foto-btn">
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
            deletedImages: [],
            urls: [],

            valid: false,
            nav_title: "",
            nav_path: [],

            kamar_model:{},
            kamar_model_temp: {},

            kamar_photos: {},
            snackbar: '',
            color: '',
            error_message: '',

            status_kamar: ['Dipakai', 'Kosong'],
            nomor_kamar: [1, 2, 3, 4, 5, 6, 7, 8],
            kamar_fasiitas_items: [],

            requiredRule: [
                v => !!v || 'This is required',
            ],
            requiredRule2: [
                v => v.length>0|| 'This is required',
            ],
        }
    },
    created(){
        this.id = this.$route.params.id;
        this.devLog(this.editable + 'editable');
        this.initData();
        this.initAxio();

        this.devLog(this.api);
    },
    methods:{
        initData(){
            this.initModel();
            this.getKamarFasilitas();
            this.getNomorKamar();

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
                                this.getKamarFasilitasAxio();
                                this.initPhoto();
                            }
                        }
                    }).catch((err)=>{
                        this.error_message = err.response.data.message;
                        this.color = "red";
                        this.snackbar = true;
                    });
            }

        },

        initModel(){
            this.kamar_model = {
                id: null,
                number: null,
                status: '',
                harga: null,
                nama_penyewa: '',
                kamar_photos: [],
                kamar_fasilitas: [],
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

        getKamarFasilitas(){
            this.kamar_fasiitas_items = ['Kasur ukuran 90x90', 'TV', 'Meja', 'Nakas', 'Lemari', 'Kamar Mandi Dalam', 'Water Heater', 'Kloset Duduk'];
        },

        getNomorKamar(){
            this.devLog('get nomor kamar')
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

        validateForm () {
            console.log('valid')
            this.devLog("validating");
            this.valid = (this.$refs.form_data_kamar).validate();
            this.devLog(this.valid);

            if (this.valid == true) {
                this.submitForm();
            }else{
                window.scrollTo(0,0);
            }
        },

        submitForm(){
            switch (this.nav_title) {
                case "Tambah":
                    this.postData();
                break;

                default:
                    this.putData();
                break;
            }
        },

        postData(){
            this.devLog(this.api)
            this.devLog(JSON.stringify(this.kamar_model));
            this.devLog(this.kamar_model);

            this.$http.post(this.api, this.kamar_model)
            .then(response => {
                this.devLog("update kos: " +response.status);
                if(response.status == 201){
                    if(response.data.api_status == "fail"){
                        this.devLog('response fail')
                        this.error_message = response.data.api_title;
                        this.color = "red";
                        this.snackbar = true;
                    }else{
                        // if (this.deletedImages.length > 0) {
                        //     for (let j = 0; j < this.deletedImages.length; j++) {
                        //         this.removeImageWithAPI(this.deletedImages[j]);
                        //     }
                        //     this.devLog("image deleted with api");
                        // }

                        this.error_message = 'Berhasil Submit Data';
                        this.color = "green";
                        this.snackbar = true;

                        this.$router
                            .push({ path: '/kamar' })
                            .then(() => { this.$router.go() })
                    }
                }
            }).catch((err)=>{
                this.error_message = err.response.data.message;
                this.color = "red";
                this.snackbar = true;
            });
        },  

        putData(){
            this.devLog(this.api+this.id)
            this.devLog(JSON.stringify(this.kamar_model));
            this.devLog(this.kamar_model);

            this.$http.put(this.api+this.id, this.kamar_model)
            .then(response => {
                this.devLog("update kos: " +response.status);
                if(response.status == 202){
                    if(response.data.api_status == "fail"){
                        this.devLog('response fail')
                        this.error_message = response.data.api_title;
                        this.color = "red";
                        this.snackbar = true;
                    }else{
                        // if (this.deletedImages.length > 0) {
                        //     for (let j = 0; j < this.deletedImages.length; j++) {
                        //         this.removeImageWithAPI(this.deletedImages[j]);
                        //     }
                        //     this.devLog("image deleted with api");
                        // }

                        this.error_message = 'Berhasil Submit Data';
                        this.color = "green";
                        this.snackbar = true;

                        this.$router
                            .push({ path: '/kamar' })
                            .then(() => { this.$router.go() })
                    }
                }
            }).catch((err)=>{
                this.error_message = err.response.data.message;
                this.color = "red";
                this.snackbar = true;
            });
        },  



        getKamarFasilitasAxio(){
            this.devLog('get kamar fasilitas axio')
            let kamar_fasilitas_temp = [];
            kamar_fasilitas_temp = this.kamar_model.kamar_fasilitas;
            this.kamar_model.kamar_fasilitas = [];

            this.devLog('kamar_fasilitas_temp');
            this.devLog(kamar_fasilitas_temp);

            kamar_fasilitas_temp.forEach((element) => {
                this.kamar_model.kamar_fasilitas.push(element.name)
            })
        },

        initPhoto() {
            this.kamar_model.kamar_photos.forEach((element) => {
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

                        this.kamar_model.kamar_photos.push({
                            image_url: image_url,
                        });
                    };
                    reader.readAsDataURL(imageFile);

                    this.urls.push(imageURL);
                }
            }
        },

        removeImage(index) {
            this.deletedImages.push(this.kamar_model.kamar_photos[index]);
            this.devLog(this.deletedImages);

            this.urls[index] = null;
            this.urls.splice(index, 1);
            this.kamar_model.kamar_photos.splice(index, 1);
        },

    }
}
</script>

<style scoped>

</style>