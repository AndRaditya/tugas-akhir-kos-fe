<template>
    <v-container grid-list-md class="pt-6" v-if="ready">
        <v-form @submit.prevent="validateForm()" v-model="valid" ref="form_transaksi_masuk" autofocus lazy-validation>
            <v-layout column>
                <v-layout align-start justify-center row class="mt-6">
                    <v-flex xs5>
                        <v-layout align-start column>
                            <p class="title__main">{{ nav_title }} Transaksi Masuk</p>
                        </v-layout>
                    </v-flex>
                    <v-flex xs5>
                        <v-layout align-end justify-end v-if="!editable">
                            <v-btn elevation="0" class="white--text btn__go-edit" width="30%" slot="page-button" @click="goEdit()">Edit</v-btn>
                        </v-layout>
                    </v-flex>
                </v-layout>
                <v-layout align-start justify-center row class="mt-6">
                    <v-flex xs5>
                        <v-layout column>
                            <v-layout align-start column>
                                <p class="regular-text">Nomor Transaksi</p>
                            </v-layout>
                            <v-text-field
                                v-model="transaksi_masuk_model.no"
                                placeholder="Nomor Transaksi Otomatis Generate"
                                outlined
                                disabled
                            ></v-text-field>
                            <v-layout align-start column>
                                <p class="regular-text">Kategori Transaksi</p>
                            </v-layout>
                            <v-select
                                v-model="transaksi_masuk_model.transaksi_masuk_kategori_id"
                                placeholder="Masukkan Kategori Transaksi"
                                outlined
                                :readonly="!editable"
                                :items="kategori_transaksi_masuk"
                                :rules="requiredRule"
                                clearable
                            ></v-select>
                            <v-layout align-start column>
                                <p class="regular-text">Nilai Transaksi</p>
                            </v-layout>
                            <v-text-field
                                v-model="transaksi_masuk_model.nilai"
                                label="Masukkan Nilai Transaksi"
                                :prefix="prefix"
                                :readonly="!editable"
                                type="number"
                                hide-spin-buttons
                                outlined
                                :rules="nilaiTrsRule"
                                @input="biayaTambahan()"
                                clearable
                            ></v-text-field>
                            <v-layout align-start column>
                                <p class="regular-text">Deskripsi Transaksi</p>
                            </v-layout>
                            <v-textarea
                                v-model="transaksi_masuk_model.desc"
                                label="Masukkan Deskripsi Transaksi"
                                :readonly="!editable"
                                outlined
                                :rules="requiredRule"
                                clearable
                            ></v-textarea>
                            <v-layout align-start column>
                                <p class="regular-text">Total Nilai Transaksi</p>
                                <p class="bigger--regular-text__medium ">Rp{{ total_nilai_temp }}</p>
                            </v-layout>
                            <v-layout align-start column>
                                <p class="regular-text mb-2 mt-6">Upload Bukti Transfer (Opsional)</p>
                                <p class="thin-smaller-regular-text">di luar transaksi website</p>
                            </v-layout>
                            <v-layout v-if="editable">
                                <v-btn 
                                    color="#146C94" 
                                    width="50%" 
                                    class="white--text" 
                                    elevation="0" 
                                    :loading="isSelecting" 
                                    @click="onPickFile()"
                                >
                                Unggah Bukti Transfer
                                </v-btn>
                                <input type="file" class="form-control" ref="file" @change="onFileChange($event.target.files)" style="display: none">
                            </v-layout>
                            <v-layout align-start column class="mb-6">
                                <p class="regular-text__medium mt-6">{{ fileName }}</p>
                                <v-card elevation-0>
                                    <v-img
                                        v-if="url"
                                        :src="url"
                                        width="350"
                                        height="300"
                                        contain
                                        class="grey lighten-5"
                                        @click="imageDialog = true" 
                                    ></v-img>
                                </v-card>
                                <v-flex v-if="url && editable" mt-2>
                                    <v-btn
                                        icon
                                        small
                                        class="error my-auto"
                                        @click="removeImage()"
                                        ><span class="material-icons">
                                        delete
                                        </span></v-btn>
                                </v-flex>
                            </v-layout>

                        </v-layout>
                    </v-flex>
                    <v-flex xs5 class="ml-6">
                        <v-layout column>
                            <v-layout align-start column>
                                <p class="regular-text">Tanggal Transaksi</p>
                            </v-layout>
                            <v-text-field
                                v-model="transaksi_masuk_model.tanggal"
                                outlined
                                disabled
                            ></v-text-field>
                            <v-layout align-start column>
                                <p class="regular-text">Nama Penyewa</p>
                            </v-layout>
                            <v-text-field
                                v-model="transaksi_masuk_model.nama_penyewa"
                                label="Nama Penyewa"
                                readonly
                                outlined
                                clearable
                            ></v-text-field>
                            <v-layout align-start column>
                                <p class="regular-text">Nomor Kamar</p>
                            </v-layout>
                            <v-select
                                v-model="transaksi_masuk_model.nomor_kamar"
                                placeholder="Masukkan Nomor Kamar"
                                outlined
                                :readonly="!editable"
                                :items="nomor_kamar"
                                :rules="transaksi_masuk_model.transaksi_masuk_kategori_id != 6 ? [fillRule] : []"
                                :required="transaksi_masuk_model.transaksi_masuk_kategori_id != 6"
                                @input="selectNamaPenyewa()"
                                clearable
                            ></v-select>
                            <v-layout align-start column>
                                <p class="regular-text">Nomor Pesanan/Booking</p>
                            </v-layout>
                            <v-autocomplete
                                v-model="transaksi_masuk_model.nomor_booking"
                                label="Masukkan Nomor Pesanan atau Booking"
                                :readonly="!editable"
                                :items="kode_booking"
                                outlined
                                 v-bind="attrs"
                                v-on="listeners"
                                return-object
                                hide-selected
                                clearable
                            ></v-autocomplete>
                            <v-layout align-start column class="mt-4">
                                <p class="regular-text paragraph">Pakai Biaya Tambahan</p>
                                <v-switch
                                    v-model="switch_harga"
                                    label="Biaya Tambahan"
                                ></v-switch>
                            </v-layout>
                            <v-layout column v-if="switch_harga" class="mb-6">
                                <v-text-field
                                    v-model="transaksi_masuk_model.biaya_tambahan.name"
                                    label="Masukkan Nama Biaya Tambahan"
                                    :readonly="!editable"
                                    outlined
                                    :rules="requiredRule"
                                ></v-text-field>
                                <v-text-field
                                    v-model="transaksi_masuk_model.biaya_tambahan.nilai"
                                    label="Masukkan Total Biaya Tambahan"
                                    :prefix="prefix"
                                    :readonly="!editable"
                                    type="number"
                                    hide-spin-buttons
                                    outlined
                                    :rules="biayaTambahanRule"
                                    @input="biayaTambahan()"
                                ></v-text-field>
                                <v-text-field
                                    v-model="transaksi_masuk_model.biaya_tambahan.desc"
                                    label="Masukkan Deskripsi Biaya Tambahan"
                                    :readonly="!editable"
                                    outlined
                                    :rules="requiredRule"
                                ></v-text-field>
                            </v-layout>
                        </v-layout>
                    </v-flex>
                </v-layout>
            </v-layout>
            <v-flex class="my-8" v-if="editable">
                <v-btn elevation="0" class="white--text btn__simpan-perubahan" ref="form_profile" type="submit" width="30%">Simpan Perubahan</v-btn>
            </v-flex>
        </v-form>
        <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom class="white--text">{{ error_message }}</v-snackbar>
        <v-dialog v-model="imageDialog" :lazy="true" max-width="40vw">
            <v-card class="rounded-card">
                <v-toolbar dark color="primary" dense flat>
                </v-toolbar>

                <v-layout row wrap fill-height class="pa-0 ma-0">
                    <v-flex class="text-xs-center pa-0 ma-0">
                        <v-img
                            :src="url"
                            max-width="100%"
                            contain
                            class="grey lighten-5"
                        ></v-img>
                    </v-flex>
                </v-layout>

                <v-card-actions py-0 px-4 ma-0>
                    <v-flex class="ma-0 pa-2 justify-center">
                        <v-btn small raised round color="primary" class="right mx-2" @click="imageDialog = false" dark>Close</v-btn>
                    </v-flex>
                </v-card-actions>
            </v-card>
        </v-dialog>

    </v-container>
    
</template>

<script>
export default {
    name: 'cru-transaksi-masuk',
    props:{
        api: {
            type: String,
            required: true
        },
        apiKategori: {
            type: String,
            required: true
        },
        apiDeletePhoto: {
            type: String,
            required: true
        },
        apiKamarNumber: {
            type: String,
            required: true
        },
        apiKodeBooking: {
            type: String,
            required: true
        },
        editable: {
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
            ready: false,
            id: null,
            imageDialog: false,

            deletedImages: [],
            url: '',

            valid: false,
            nav_title: "",
            nav_path: [],
            switch_harga: false,

            transaksi_masuk_model: {},
            kamar_model: {},

            snackbar: '',
            color: '',
            error_message: '',
            nomor_kamar: [],
            kategori_transaksi_masuk: [],

            total_nilai_temp: '',
            total_nilai_temp_float: null,

            requiredRule: [
                v => !!v || 'This is required',
            ],

            fillRule: (v) => !!v || 'This field is required',

            nilaiTrsRule: [ 
                v => !!v || "This field is required",
                v => ( v && v >= 1 ) || "Tidak boleh kurang dari Rp1",
            ],

            biayaTambahanRule: [ 
                v => !!v || "This field is required",
                v => ( v && v >= 1 ) || "Tidak boleh kurang dari 0",
            ],

            isSelecting: false,
            selectedFile: null,
            kode_booking: [],
            
            fileName: '',
            file: '',
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
            this.getKategori();
            this.getNomorKamar();
            this.getKodeBooking();
            this.nav_path = this.$route.path.split("/");
            var last = this.nav_path.length -1;
            for (var i = 1; i <= last; i++) {
                switch (this.nav_path[i]) {
                case "transaksi-masuk":
                    this.nav_path[i] = "Transaksi Masuk";
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

        initModel(){
            this.transaksi_masuk_model = {
                id: null,
                no: '',
                tanggal: '',
                desc: '',
                nilai: null,
                nomor_kamar: null,
                bukti_transfer: '',
                nomor_booking: '',
                total_nilai: null,

                transaksi_masuk_kategori_id: '',
                biaya_tambahan: {},
            }

            this.kamar_model = {
                number: '',
                nama_penyewa: '',
            }
        },

        initAxio(){
            this.devLog(this.nav_title);
            if(this.nav_title == "Ubah" || this.nav_title == "Detail"){
                this.devLog('this.id');
                this.devLog(this.id);

                this.$http.get(this.api+this.id, {headers : {
                        Authorization: localStorage.token,
                    }})
                    .then(response => {
                        this.devLog("init axio result code: " + response.status);
                        if(response.status == 200){
                            if(!response.data){
                                this.devLog('response fail')
                            }else{
                                this.ready = true;
                                this.transaksi_masuk_model = response.data.data[0];
                                this.devLog(this.transaksi_masuk_model)
                                this.total_nilai_temp = this.transaksi_masuk_model.total_nilai.toLocaleString("de-DE")
                                this.devLog('init axio')
                                this.initPhoto()

                                if(this.transaksi_masuk_model.biaya_tambahan.length > 0){
                                    this.getBiayaTambahan();
                                }

                                // if (this.transaksi_masuk_model.bukti_transfer.photo_path) {
                                //     this.updatePhoto();
                                // }
                            }
                        }
                    }).catch((err)=>{
                        this.devLog(err)
                        this.error_message = 'Data Empty';
                        this.color = "red";
                        this.snackbar = true;
                        this.ready = false;
                    });
            }else if(localStorage.userLogin){
                this.devLog('add trs')
                this.ready = true;
            }
            else{
                setInterval(this.getNow(), 1000);
            }
        },

        getBiayaTambahan(){
            this.switch_harga = true;
            this.devLog('biaya tambahan')
            let biayaTambahanTemp = this.transaksi_masuk_model.biaya_tambahan[0];
            this.transaksi_masuk_model.biaya_tambahan = {};

            this.devLog(biayaTambahanTemp);
            this.transaksi_masuk_model.biaya_tambahan.name = biayaTambahanTemp.name;
            this.transaksi_masuk_model.biaya_tambahan.nilai = biayaTambahanTemp.nilai;
            this.transaksi_masuk_model.biaya_tambahan.desc = biayaTambahanTemp.desc;
            this.total_nilai_temp = this.transaksi_masuk_model.total_nilai.toLocaleString("de-DE")
        },

        getNow() {
            const today = new Date();

            const month = this.getZeroBefore(today.getMonth()+1);  
            const day = this.getZeroBefore(today.getDate())
            const hours = this.getZeroBefore(today.getHours())
            const minutes = this.getZeroBefore(today.getMinutes())
            const second = this.getZeroBefore(today.getSeconds())

            const date = today.getFullYear()+'-'+ month +'-'+ day;
            const time = hours + ":" + minutes + ":" + second;
            const dateTime = date +' '+ time;
            this.transaksi_masuk_model.tanggal = dateTime;
        },

        getZeroBefore(item){
            if(item < 10){
                item = '0' + item
            }
            return item;
        },

        getNomorKamar(){
            this.$http.get(this.apiKamarNumber, {headers : {
                Authorization: localStorage.token,
            }})
            .then(response => {
                this.devLog("init axio result code: " + response.status);
                if(response.status == 200){
                    if(!response.data){
                        this.devLog('response fail')
                    }else{
                        this.ready = true;
                        this.kamar_model = response.data.data;

                        this.kamar_model.forEach((element) => {
                            this.nomor_kamar.push(element.number)
                        });
                    }
                }
            }).catch((err)=>{
                this.devLog(err)
                this.error_message = 'Data Empty';
                this.color = "red";
                this.snackbar = true;
                this.ready = false;
            });
        },

        getKodeBooking(){
            this.$http.get(this.apiKodeBooking, {headers : {
                Authorization: localStorage.token,
            }})
            .then(response => {
                this.devLog("init axio result code: " + response.status);
                if(response.status == 200){
                    if(!response.data){
                        this.devLog('response fail')
                    }else{
                        this.ready = true;
                        this.kode_booking = response.data;
                    }
                }
            }).catch((err)=>{
                this.devLog(err)
                this.error_message = 'Data Empty';
                this.color = "red";
                this.snackbar = true;
                this.ready = false;
            });
        },

        validateForm () {
            console.log('valid')
            this.devLog("validating");
            this.valid = (this.$refs.form_transaksi_masuk).validate();
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
                    this.devLog('post data')
                    this.postData();
                break;

                default:
                    this.devLog('put data')
                    this.putData();
                break;
            }
        },

        postData(){
            this.devLog('this.switch_harga ' + this.switch_harga);
            this.devLog('this.total_nilai_temp_float ' + this.total_nilai_temp_float);

            this.transaksi_masuk_model.total_nilai = parseFloat(this.total_nilai_temp_float);

            this.devLog('submit form')
            this.devLog(this.api)
            this.devLog(JSON.stringify(this.transaksi_masuk_model));
            this.devLog(this.transaksi_masuk_model);

            this.$http.post(this.api, this.transaksi_masuk_model, {headers : {
                        Authorization: localStorage.token,
                    }})
            .then(response => {
                this.devLog("post data trs: " +response.status);
                if(response.status == 201){
                    if(response.data.api_status == "fail"){
                        this.devLog('response fail')
                        this.error_message = response.data.api_title;
                        this.color = "red";
                        this.snackbar = true;
                    }else{
                        this.error_message = 'Berhasil Submit Data';
                        this.color = "green";
                        this.snackbar = true;

                        this.$router
                            .push({ path: '/transaksi-masuk' })
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

            this.devLog('this.switch_harga ' + this.switch_harga);
            this.devLog('this.total_nilai_temp_float ' + this.total_nilai_temp_float);

            if(this.total_nilai_temp_float){
                this.transaksi_masuk_model.total_nilai = this.total_nilai_temp_float;
            }

            this.devLog(JSON.stringify(this.transaksi_masuk_model));
            this.devLog(this.transaksi_masuk_model);
            
            this.$http.put(this.api+this.id, this.transaksi_masuk_model, {headers : {
                        Authorization: localStorage.token,
                    }})
            .then(response => {
                this.devLog("update trs masuk: " +response.status);
                if(response.status == 202){
                    if(response.data.api_status == "fail"){
                        this.devLog('response fail')
                        this.error_message = response.data.api_title;
                        this.color = "red";
                        this.snackbar = true;
                    }else{
                        if (this.deletedImages.length > 0) {
                            this.devLog('api delete image')
                            this.removeImageWithAPI(this.deletedImages[0]);
                            this.devLog("image deleted with api");
                        }

                        this.error_message = 'Berhasil Update Data';
                        this.color = "green";
                        this.snackbar = true;

                        this.$router
                            .push({ path: '/transaksi-masuk' })
                            .then(() => { this.$router.go() })
                    }
                }
            }).catch((err)=>{
                this.error_message = err.response.data.message;
                this.color = "red";
                this.snackbar = true;
            });
        },  

        removeImageWithAPI(deleteImage) {
            this.$http.put(this.apiDeletePhoto + this.id, {bukti_transfer: deleteImage}, {headers : {
                        Authorization: localStorage.token,
                    }})
            .then((response) => {
                    this.devLog(JSON.stringify(response));
                    if (response.status == 200) {
                        this.devLog(this.model.product_channel_images);
                    } else {
                        this.devLog(response)
                    }
                })
            .catch((err) => {
                this.error_message = err.response.data.message;
                this.color = "red";
                this.snackbar = true;
            });
        },

        getKategori(){
            this.devLog('this.id');
            this.devLog(this.apiKategori);

            this.$http.get(this.apiKategori, {headers : {
                        Authorization: localStorage.token,
                    }})
                .then(response => {
                    this.devLog("get kategori result code: " + response.status);
                    if(response.status == 200){
                        if(!response.data){
                            this.devLog('response fail')
                        }else{
                            this.devLog(response.data)
                            this.kategori_transaksi_masuk = response.data;
                            this.devLog(this.kategori_transaksi_masuk)
                        }
                    }
                }).catch((err)=>{
                    this.error_message = err.response.data.message;
                    this.color = "red";
                    this.snackbar = true;
                });        
        },

        nomorKamarRule(){
            if(this.transaksi_masuk_model.transaksi_masuk_kategori_id != 6){
                return 'Required'
            }else{
                return true;
            }
        },

        initPhoto() {
            this.devLog(' === init photo')
            if(this.transaksi_masuk_model.bukti_transfer){
                this.url = this.transaksi_masuk_model.bukti_transfer.photo_path
            }
        },

        selectNamaPenyewa(){
            this.devLog('nama penyewa 1');
            for(let i = 0; i < this.kamar_model.length ; i++){
                this.devLog('nama penyewa 2 ');
                if(this.kamar_model[i].number == this.transaksi_masuk_model.nomor_kamar){
                    this.devLog('nama penyewa 3');
                    this.transaksi_masuk_model.nama_penyewa = this.kamar_model[i].nama_penyewa
                }
            }
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

                        this.transaksi_masuk_model.bukti_transfer = image_url;

                        // this.transaksi_masuk_model.bukti_transfer.push({
                        //     url: image_url,
                        // });
                    };
                    reader.readAsDataURL(imageFile);

                    this.url = imageURL;
                }
            }
        },

        removeImage() {
            this.deletedImages.push(this.transaksi_masuk_model.bukti_transfer);
            this.devLog(this.deletedImages);

            this.url = '';
            this.transaksi_masuk_model.bukti_transfer = '';
            this.fileName = '';
        },

        updatePhoto() {
            let url = this.transaksi_masuk_model.bukti_transfer.photo_path;
            fetch(url)
                .then((res) => res.blob())
                .then((blob) => {
                    this.readFile(blob);
                });
        },

        readFile(input) {
            const fr = new FileReader();
            fr.readAsDataURL(input);
            this.devLog(fr.result);
            fr.addEventListener("load", () => {
                this.devLog(fr);
                const res = fr.result;
                this.transaksi_masuk_model.bukti_transfer.photo_path = res;

                this.devLog("this.transaksi_masuk_model.bukti_transfer.photo_path");
                this.devLog(this.transaksi_masuk_model.bukti_transfer.photo_path);
            });
        },

        biayaTambahan(){
            // this.devLog('biaya tambahan')
            // let nilai_trs = null;
            let nilai_trs;

            if(!this.switch_harga){
                nilai_trs = parseFloat(this.transaksi_masuk_model.nilai);
            }else{
                nilai_trs = parseFloat(this.transaksi_masuk_model.nilai) + parseFloat(this.transaksi_masuk_model.biaya_tambahan.nilai);
            }

            this.total_nilai_temp_float = nilai_trs;
            this.total_nilai_temp = nilai_trs.toLocaleString("de-DE");
        },

        goEdit(){
            let mainPath = this.$route.path.split('/');
            mainPath = mainPath.splice(0, mainPath.length-1).join('/');
            // this.devLog(mainPath);
            // this.$router.push(mainPath+'/edit/'+this.id);

             this.$router
                .push({ path: mainPath+'/edit/'+this.id })
                .then(() => { this.$router.go() })


        },
    }
}
</script>

<style scoped>
    .thin-smaller-regular-text{
        font-weight: 300;
        font-size: 1.6rem;
    }
</style>