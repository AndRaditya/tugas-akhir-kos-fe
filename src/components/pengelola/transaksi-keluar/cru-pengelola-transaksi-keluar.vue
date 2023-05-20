<template>
    <v-container grid-list-md class="pt-6" v-if="ready">

        <v-form @submit.prevent="validateForm()" v-model="valid" ref="form_transaksi_keluar" autofocus lazy-validation>
            <div class="pengelola-trs-keluar__grid">
                <div class="pengelola-trs-keluar__child-1">
                    <div class="pengelola-trs-keluar__child-1__title-1">
                        <p class="title__main">{{ nav_title }} Transaksi Keluar</p>
                    </div>
                    <div class="pengelola-trs-keluar__child-1__title-2" v-if="!editable">
                        <v-btn elevation="0" class="white--text btn__go-edit pengelola-trs-keluar__btn" slot="page-button" @click="goEdit()">Edit</v-btn>
                    </div>
                </div>
                <div class="pengelola-trs-keluar__child-2">
                    <v-layout align-start column>
                        <p class="regular-text">Nomor Transaksi</p>
                    </v-layout>
                    <v-text-field
                        v-model="transaksi_keluar_model.no"
                        placeholder="Nomor Transaksi Otomatis Generate"
                        outlined
                        disabled
                    ></v-text-field>
                    <v-layout align-start column>
                        <p class="regular-text">Kategori Transaksi</p>
                    </v-layout>
                    <v-select
                        v-model="transaksi_keluar_model.transaksi_keluar_kategori_id"
                        placeholder="Masukkan Kategori Transaksi"
                        outlined
                        :items="kategori_transaksi_keluar"
                        :readonly="!editable"
                        :rules="requiredRule"
                    ></v-select>
                    <v-layout align-start column>
                        <p class="regular-text">Nilai Transaksi</p>
                    </v-layout>
                    <v-text-field
                        v-model="transaksi_keluar_model.nilai"
                        label="Masukkan Nilai Transaksi"
                        :prefix="prefix"
                        :readonly="!editable"
                        type="number"
                        hide-spin-buttons
                        outlined
                        :rules="requiredRule"
                    ></v-text-field>
                </div>
                <div class="pengelola-trs-keluar__child-3">
                    <v-layout align-start column>
                        <p class="regular-text">Nomor Transaksi</p>
                    </v-layout>
                    <v-text-field
                        v-model="transaksi_keluar_model.tanggal"
                        outlined
                        disabled
                    ></v-text-field>
                    <v-layout align-start column>
                        <p class="regular-text">Deskripsi Transaksi</p>
                    </v-layout>
                    <v-textarea
                        v-model="transaksi_keluar_model.desc"
                        label="Masukkan Deskripsi Transaksi"
                        :readonly="!editable"
                        outlined
                        :rules="requiredRule"
                    ></v-textarea>
                </div>
                <div class="pengelola-trs-keluar__child-4" v-if="editable">
                    <v-btn elevation="0" class="white--text btn__simpan-perubahan pengelola-trs-keluar__btn" ref="form_profile" type="submit">Simpan Perubahan</v-btn>
                </div>
            </div>
            <v-flex class="my-4" v-if="editable">
            </v-flex>
        </v-form>
        <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom class="white--text">{{ error_message }}</v-snackbar>

    </v-container>
    
</template>

<script>
export default {
    name: 'cru-transaksi-keluar',
    props:{
        api: {
            type: String,
            required: true
        },
        apiKategori: {
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
            valid: false,
            nav_title: "",
            nav_path: [],

            transaksi_keluar_model: {},
            transaksi_keluar_kategori_model: {},

            snackbar: '',
            color: '',
            error_message: '',

            kategori_transaksi_keluar: [],

            requiredRule: [
                v => !!v || 'This is required',
            ],
        }
    },
    created(){
        this.id = this.$route.params.id;
        this.devLog(this.editable + ' editable');
        this.initData();
        this.initAxio();
    },
    methods:{
        initData(){
            this.initModel();
            this.getKategori();
            this.nav_path = this.$route.path.split("/");
            var last = this.nav_path.length -1;
            for (var i = 1; i <= last; i++) {
                switch (this.nav_path[i]) {
                case "transaksi-keluar":
                    this.nav_path[i] = "Transaksi Keluar";
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
            this.transaksi_keluar_model = {
                id: null,
                no: '',
                tanggal: '',
                desc: '',
                nilai: null,
                kategori_transaksi: '',
            }       
        },

        initAxio(){
            this.devLog(this.nav_title);
            if(this.nav_title == "Ubah" || this.nav_title == "Detail"){
                this.devLog('this.id');
                this.devLog(this.api+this.id);

                this.$http.get(this.api+this.id, {headers : {
                        Authorization: localStorage.token,
                    }})
                    .then(response => {
                        this.devLog("get user result code: " + response.status);
                        if(response.status == 200){
                            if(!response.data){
                                this.devLog('response fail')
                            }else{
                                this.devLog(response.data)
                                this.transaksi_keluar_model = response.data.data[0];
                                this.devLog(this.transaksi_keluar_model)
                                this.ready = true
                            }
                        }
                    }).catch((err)=>{
                        this.error_message = err.response.data;
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
            this.transaksi_keluar_model.tanggal = dateTime;
        },

        getZeroBefore(item){
            if(item < 10){
                item = '0' + item
            }
            return item;
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
                            this.kategori_transaksi_keluar = response.data;
                            this.devLog(this.kategori_transaksi_keluar)
                        }
                    }
                }).catch((err)=>{
                    this.error_message = err.response.data.message;
                    this.color = "red";
                    this.snackbar = true;
                });
        
        },

        validateForm () {
            console.log('valid')
            this.devLog("validating");
            this.valid = (this.$refs.form_transaksi_keluar).validate();
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
            this.devLog(this.api)
            this.devLog(this.transaksi_keluar_model);

            this.$http.post(this.api, this.transaksi_keluar_model, {headers : {
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
                            .push({ path: '/transaksi-keluar' })
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
            this.devLog(JSON.stringify(this.transaksi_keluar_model));
            this.devLog(this.transaksi_keluar_model);

            this.$http.put(this.api+this.id, this.transaksi_keluar_model, {headers : {
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

                        this.error_message = 'Berhasil Update Data';
                        this.color = "green";
                        this.snackbar = true;

                        this.$router
                            .push({ path: '/transaksi-keluar' })
                            .then(() => { this.$router.go() })
                    }
                }
            }).catch((err)=>{
                this.error_message = err.response.data.message;
                this.color = "red";
                this.snackbar = true;
            });
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

</style>