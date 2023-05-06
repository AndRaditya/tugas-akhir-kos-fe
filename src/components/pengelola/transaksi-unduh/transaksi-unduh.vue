<template>
    <v-container grid-list-md class="pt-0" v-if="ready">
        <v-layout align-start>
            <p class="main-title">Unduh Transaksi</p>
        </v-layout>
        <v-layout column class="mt-4">
            <v-flex xs6>
                <v-layout align-start column>
                    <p class="medium-bigger-regular-text pb-2">Transaksi Masuk</p>
                </v-layout>
                <v-layout row>
                    <v-flex xs2 sm2 class="pl-0">
                        <v-menu
                            ref="dialogTrsMasuk"
                            v-model="menu_trs_masuk_mulai"
                            :return-value.sync="transaksi_masuk_mulai"
                            :close-on-content-click="false"
                            elevation="0"
                            min-width="0%"
                        >
                            <template v-slot:activator="{ on }">
                                <v-text-field
                                    v-model="transaksi_masuk_mulai"
                                    label="Tanggal Mulai"
                                    append-icon="event"
                                    readonly
                                    v-on="on"
                                    outlined
                                ></v-text-field>
                            </template>
                            <v-date-picker v-model="transaksi_masuk_mulai" scrollable>
                                <v-spacer></v-spacer>
                                <v-btn text color="primary" @click="menu_trs_masuk_mulai = false">Cancel</v-btn>
                                <v-btn text color="primary" @click="$refs.dialogTrsMasuk.save(transaksi_masuk_mulai)">OK</v-btn>
                            </v-date-picker>
                        </v-menu>
                    </v-flex>
                    <v-flex xs2 sm2 class="mx-2">
                        <v-menu
                            ref="dialogTrsMasuk2"
                            v-model="menu_trs_masuk_selesai"
                            :return-value.sync="transaksi_masuk_selesai"
                            :close-on-content-click="false"
                            elevation="0"
                            min-width="0%"
                        >
                            <template v-slot:activator="{ on }">
                                <v-text-field
                                    v-model="transaksi_masuk_selesai"
                                    label="Tanggal Selesai"
                                    append-icon="event"
                                    readonly
                                    v-on="on"
                                    outlined
                                ></v-text-field>
                            </template>
                            <v-date-picker v-model="transaksi_masuk_selesai" scrollable>
                                <v-spacer></v-spacer>
                                <v-btn text color="primary" @click="menu_trs_masuk_selesai = false">Cancel</v-btn>
                                <v-btn text color="primary" @click="$refs.dialogTrsMasuk2.save(transaksi_masuk_selesai)">OK</v-btn>
                            </v-date-picker>
                        </v-menu>
                    </v-flex>
                    <v-flex xs2 sm2 class="mx-2">
                        <v-btn elevation="0" class="white--text btn-unduh" @click="confirmExport('transaksi_masuk')" width="75%">Unduh</v-btn>
                    </v-flex>
                </v-layout>
            </v-flex>

            <v-flex xs6>
                <v-layout align-start column>
                    <p class="medium-bigger-regular-text pb-2">Transaksi Keluar</p>
                </v-layout>
                <v-layout row>
                    <v-flex xs2 sm2 class="pl-0">
                        <v-menu
                            ref="dialogTrsKeluar"
                            v-model="menu_trs_keluar_mulai"
                            :return-value.sync="transaksi_keluar_mulai"
                            :close-on-content-click="false"
                            elevation="0"
                            min-width="0%"
                        >
                            <template v-slot:activator="{ on }">
                                <v-text-field
                                    v-model="transaksi_keluar_mulai"
                                    label="Tanggal Mulai"
                                    append-icon="event"
                                    readonly
                                    v-on="on"
                                    outlined
                                ></v-text-field>
                            </template>
                            <v-date-picker v-model="transaksi_keluar_mulai" scrollable>
                                <v-spacer></v-spacer>
                                <v-btn text color="primary" @click="menu_trs_keluar_mulai = false">Cancel</v-btn>
                                <v-btn text color="primary" @click="$refs.dialogTrsKeluar.save(transaksi_keluar_mulai)">OK</v-btn>
                            </v-date-picker>
                        </v-menu>
                    </v-flex>
                    <v-flex xs2 sm2 class="mx-2">
                        <v-menu
                            ref="dialogTrsKeluar2"
                            v-model="menu_trs_keluar_selesai"
                            :return-value.sync="transaksi_keluar_selesai"
                            :close-on-content-click="false"
                            elevation="0"
                            min-width="0%"
                        >
                            <template v-slot:activator="{ on }">
                                <v-text-field
                                    v-model="transaksi_keluar_selesai"
                                    label="Tanggal Selesai"
                                    append-icon="event"
                                    readonly
                                    v-on="on"
                                    outlined
                                ></v-text-field>
                            </template>
                            <v-date-picker v-model="transaksi_keluar_selesai" scrollable>
                                <v-spacer></v-spacer>
                                <v-btn text color="primary" @click="menu_trs_keluar_selesai = false">Cancel</v-btn>
                                <v-btn text color="primary" @click="$refs.dialogTrsKeluar2.save(transaksi_keluar_selesai)">OK</v-btn>
                            </v-date-picker>
                        </v-menu>
                    </v-flex>
                    <v-flex xs2 sm2 class="mx-2">
                        <v-btn elevation="0" class="white--text btn-unduh" @click="confirmExport('transaksi_keluar')" width="75%">Unduh</v-btn>
                    </v-flex>
                </v-layout>
            </v-flex>

            <v-flex xs6>
                <v-layout align-start column>
                    <p class="medium-bigger-regular-text pb-2">Semua Transaksi</p>
                </v-layout>
                <v-layout row>
                    <v-flex xs2 sm2 class="pl-0">
                        <v-menu
                            ref="dialogTrsSemua"
                            v-model="menu_trs_semua_mulai"
                            :return-value.sync="transaksi_semua_mulai"
                            :close-on-content-click="false"
                            elevation="0"
                            min-width="0%"
                        >
                            <template v-slot:activator="{ on }">
                                <v-text-field
                                    v-model="transaksi_semua_mulai"
                                    label="Tanggal Mulai"
                                    append-icon="event"
                                    readonly
                                    v-on="on"
                                    outlined
                                ></v-text-field>
                            </template>
                            <v-date-picker v-model="transaksi_semua_mulai" scrollable>
                                <v-spacer></v-spacer>
                                <v-btn text color="primary" @click="menu_trs_semua_mulai = false">Cancel</v-btn>
                                <v-btn text color="primary" @click="$refs.dialogTrsSemua.save(transaksi_semua_mulai)">OK</v-btn>
                            </v-date-picker>
                        </v-menu>
                    </v-flex>
                    <v-flex xs2 sm2 class="mx-2">
                        <v-menu
                            ref="dialogTrsSemua2"
                            v-model="menu_trs_semua_selesai"
                            :return-value.sync="transaksi_semua_selesai"
                            :close-on-content-click="false"
                            elevation="0"
                            min-width="0%"
                        >
                            <template v-slot:activator="{ on }">
                                <v-text-field
                                    v-model="transaksi_semua_selesai"
                                    label="Tanggal Selesai"
                                    append-icon="event"
                                    readonly
                                    v-on="on"
                                    outlined
                                ></v-text-field>
                            </template>
                            <v-date-picker v-model="transaksi_semua_selesai" scrollable>
                                <v-spacer></v-spacer>
                                <v-btn text color="primary" @click="menu_trs_semua_selesai = false">Cancel</v-btn>
                                <v-btn text color="primary" @click="$refs.dialogTrsSemua2.save(transaksi_semua_selesai)">OK</v-btn>
                            </v-date-picker>
                        </v-menu>
                    </v-flex>
                    <v-flex xs2 sm2 class="mx-2">
                        <v-btn elevation="0" class="white--text btn-unduh" @click="confirmExport('transaksi_semua')" width="75%">Unduh</v-btn>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
        <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom class="white--text">{{ error_message }}</v-snackbar>
    </v-container>
</template>

<script>
export default {
    name: 'transaksi-unduh',
    props:{
        apiExport: {
            type: String,
            required: true
        },
    },
    data(){
        return{
            ready: false,
            snackbar: '',
            color: '',
            error_message: '',

            transaksi_masuk_mulai: new Date().toISOString().substr(0, 10),
            menu_trs_masuk_mulai: false,
            transaksi_masuk_selesai: new Date().toISOString().substr(0, 10),
            menu_trs_masuk_selesai: false,

            transaksi_keluar_mulai: new Date().toISOString().substr(0, 10),
            menu_trs_keluar_mulai: false,
            transaksi_keluar_selesai: new Date().toISOString().substr(0, 10),
            menu_trs_keluar_selesai: false,

            transaksi_semua_mulai: new Date().toISOString().substr(0, 10),
            menu_trs_semua_mulai: false,
            transaksi_semua_selesai: new Date().toISOString().substr(0, 10),
            menu_trs_semua_selesai: false,

            transaksi_masuk_model:{},
            transaksi_keluar_model:{},
            transaksi_semua_model:{},

        }
    },
    created(){
        this.initData();
    },
    methods:{
        initData(){
            if(localStorage.userLogin){
                this.ready = true;
            }
            this.initModel();
            // this.getData();
        },
        
        initModel(){
            this.transaksi_masuk_model = {
                tanggal_mulai : '',
                tanggal_selesai : '',
            },

            this.transaksi_keluar_model = {
                tanggal_mulai : '',
                tanggal_selesai : '',
            },

            this.transaksi_semua_model = {
                tanggal_mulai : '',
                tanggal_selesai : '',
            }
        },

        confirmExport(exporter){
            if(exporter == 'transaksi_masuk'){
                this.transaksi_masuk_model.tanggal_mulai = this.transaksi_masuk_mulai;
                this.transaksi_masuk_model.tanggal_selesai = this.transaksi_masuk_selesai;

                this.exportData(this.transaksi_masuk_model, 'transaksi-masuk', 'Transaksi Masuk')
            }else if(exporter == 'transaksi_keluar'){
                this.transaksi_keluar_model.tanggal_mulai = this.transaksi_keluar_mulai;
                this.transaksi_keluar_model.tanggal_selesai = this.transaksi_keluar_selesai;

                this.exportData(this.transaksi_keluar_model, 'transaksi-keluar', 'Transaksi Keluar')
            }else if(exporter == 'transaksi_semua'){
                this.transaksi_semua_model.tanggal_mulai = this.transaksi_semua_mulai;
                this.transaksi_semua_model.tanggal_selesai = this.transaksi_semua_selesai;

                this.exportData(this.transaksi_semua_model, 'transaksi-semua', 'Semua Transaksi')
            }
        },

        exportData(model, url, filename){
            this.devLog(JSON.stringify(model));
            let tanggal_mulai = model.tanggal_mulai
            let tanggal_selesai = model.tanggal_selesai
            this.devLog(this.apiExport+url+'?tanggal_mulai='+tanggal_mulai+'&tanggal_selesai='+tanggal_selesai);

            let axioUrl = this.apiExport+url+'?tanggal_mulai='+tanggal_mulai+'&tanggal_selesai='+tanggal_selesai;

            this.$http.get(axioUrl, {responseType: 'arraybuffer'})
            .then((response) => {
                this.devLog(response);
                this.devLog("unduh trs result code: " + response.status);
                if(response.status == 200){
                    if(!response.data){
                        this.devLog('response fail')
                        this.error_message = response;
                        this.color = "red";
                        this.snackbar = true;
                        
                    }else{
                        let blob = new Blob([response.data], { type: 'application/pdf' });
                        let link = document.createElement('a');
                        link.href = window.URL.createObjectURL(blob);
                        link.download = filename+'.pdf';
                        link.click();
                    }
                }
            }).catch((err)=>{
                if(!err.response){
                    this.error_message = err.response;
                    this.color = "red";
                    this.snackbar = true;
                }else{
                    this.error_message = 'Code Error ' + err;
                    this.color = "red";
                    this.snackbar = true;
                }
            });
        },
    }
}
</script>

<style scoped>
</style>