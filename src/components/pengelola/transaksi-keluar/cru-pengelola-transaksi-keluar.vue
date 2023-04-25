<template>
    <v-container grid-list-md class="pt-0">
        <v-layout align-start row>
            <v-layout align-start>
                <p class="main-title">{{ nav_title }} Transaksi Keluar</p>
            </v-layout>
        </v-layout>
        <v-form @submit.prevent="validateForm()" v-model="valid" ref="form_transaksi_keluar" autofocus lazy-validation>
            <v-layout row class="mt-6">
                <v-flex xs6>
                    <v-layout column>
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
                            v-model="transaksi_keluar_model.no"
                            placeholder="Masukkan Kategori Transaksi"
                            outlined
                            :readonly="!editable"
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
                        ></v-text-field>
                    </v-layout>
                </v-flex>
                <v-flex xs5 class="ml-6">
                    <v-layout column>
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
                        ></v-textarea>
                        
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
    name: 'cru-transaksi-keluar',
    props:{
        api: {
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
            id: null,
            valid: false,
            nav_title: "",
            nav_path: [],

            transaksi_keluar_model: {},
            transaksi_keluar_kategori_model: {},

            snackbar: '',
            color: '',
            error_message: '',
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
            }

            this.transaksi_keluar_kategori_model = {

            }        
        },
        initAxio(){
            this.devLog(this.nav_title);
            if(this.nav_title == "Ubah" || this.nav_title == "Detail"){
                this.devLog('this.id');
                this.devLog(this.api+this.id);

                this.$http.get(this.api+this.id)
                    .then(response => {
                        this.devLog("get user result code: " + response.status);
                        if(response.status == 200){
                            if(!response.data){
                                this.devLog('response fail')
                            }else{
                                this.devLog(response.data)
                                this.transaksi_keluar_model = response.data.data[0];
                                this.devLog(this.transaksi_keluar_model)
                            }
                        }
                    }).catch((err)=>{
                        this.error_message = err.response.data.message;
                        this.color = "red";
                        this.snackbar = true;
                    });
            }else{
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
        }

    }
}
</script>

<style scoped>

</style>