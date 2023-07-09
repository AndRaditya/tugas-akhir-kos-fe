<template>
    <v-container grid-list-md class="pt-0" v-if="ready">
        <div class="transaksi-unduh__grid">
            <div class="transaksi-unduh__child-1">
                <p class="title__main">Unduh Transaksi</p>
            </div>
            <div class="transaksi-unduh__child-2">
                <div class="transaksi-unduh__tanggal">
                    <div class="transaksi-unduh__tanggal--child-1">
                        <p class="bigger--regular-text__medium paragraph">Transaksi Masuk</p>
                    </div>
                    <div class="transaksi-unduh__tanggal--child-2">
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
                    </div>
                    <div class="transaksi-unduh__tanggal--child-3">
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
                    </div>
                    <div class="transaksi-unduh__tanggal--child-4">
                        <v-btn elevation="0" class="white--text btn__unduh transaksi-unduh__tanggal--child-4__btn" @click="confirmExport('transaksi_masuk')">Unduh</v-btn>
                    </div>
                </div>
            </div>
            <div class="transaksi-unduh__child-3">
                <div class="transaksi-unduh__tanggal">
                    <div class="transaksi-unduh__tanggal--child-1">
                        <p class="bigger--regular-text__medium paragraph">Transaksi Keluar</p>
                    </div>
                    <div class="transaksi-unduh__tanggal--child-2">
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
                    </div>
                    <div class="transaksi-unduh__tanggal--child-3">
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
                    </div>
                    <div class="transaksi-unduh__tanggal--child-4">
                        <v-btn elevation="0" class="white--text btn__unduh transaksi-unduh__tanggal--child-4__btn" @click="confirmExport('transaksi_keluar')">Unduh</v-btn>
                    </div>
                </div>
            </div>
            <div class="transaksi-unduh__child-4">
                <div class="transaksi-unduh__tanggal">
                    <div class="transaksi-unduh__tanggal--child-1">
                        <p class="bigger--regular-text__medium paragraph">Semua Transaksi</p>
                    </div>
                    <div class="transaksi-unduh__tanggal--child-2">
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
                    </div>
                    <div class="transaksi-unduh__tanggal--child-3">
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
                    </div>
                    <div class="transaksi-unduh__tanggal--child-4">
                        <v-btn elevation="0" class="white--text btn__unduh transaksi-unduh__tanggal--child-4__btn" @click="confirmExport('transaksi_semua')">Unduh</v-btn>
                    </div>
                </div>
            </div>
            <div class="transaksi-unduh__child-5">
                <div class="transaksi-unduh__tanggal">
                    <div class="transaksi-unduh__tanggal--child-1">
                        <p class="bigger--regular-text__medium paragraph">Laporan Harian Semua Transaksi</p>
                    </div>
                    <div class="transaksi-unduh__tanggal--child-2">
                        <v-menu
                            ref="dialogTrsLaporan"
                            v-model="menu_trs_laporan_mulai"
                            :return-value.sync="transaksi_laporan_mulai"
                            :close-on-content-click="false"
                            elevation="0"
                            min-width="0%"
                        >
                            <template v-slot:activator="{ on }">
                                <v-text-field
                                    v-model="transaksi_laporan_mulai"
                                    label="Tanggal Mulai"
                                    append-icon="event"
                                    readonly
                                    v-on="on"
                                    outlined
                                ></v-text-field>
                            </template>
                            <v-date-picker v-model="transaksi_laporan_mulai" scrollable>
                                <v-spacer></v-spacer>
                                <v-btn text color="primary" @click="menu_trs_laporan_mulai = false">Cancel</v-btn>
                                <v-btn text color="primary" @click="$refs.dialogTrsLaporan.save(transaksi_laporan_mulai)">OK</v-btn>
                            </v-date-picker>
                        </v-menu>
                    </div>
                    <div class="transaksi-unduh__tanggal--child-3">
                        <v-menu
                            ref="dialogTrsLaporan2"
                            v-model="menu_trs_laporan_selesai"
                            :return-value.sync="transaksi_laporan_selesai"
                            :close-on-content-click="false"
                            elevation="0"
                            min-width="0%"
                        >
                            <template v-slot:activator="{ on }">
                                <v-text-field
                                    v-model="transaksi_laporan_selesai"
                                    label="Tanggal Selesai"
                                    append-icon="event"
                                    readonly
                                    v-on="on"
                                    outlined
                                ></v-text-field>
                            </template>
                            <v-date-picker v-model="transaksi_laporan_selesai" scrollable>
                                <v-spacer></v-spacer>
                                <v-btn text color="primary" @click="menu_trs_laporan_selesai = false">Cancel</v-btn>
                                <v-btn text color="primary" @click="$refs.dialogTrsLaporan2.save(transaksi_laporan_selesai)">OK</v-btn>
                            </v-date-picker>
                        </v-menu>
                    </div>
                    <div class="transaksi-unduh__tanggal--child-4">
                        <v-btn elevation="0" class="white--text btn__unduh transaksi-unduh__tanggal--child-4__btn" @click="confirmExport('transaksi_laporan')">Unduh</v-btn>
                    </div>
                </div>
            </div>
        </div>

        <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom class="white--text">{{ error_message }}</v-snackbar>

        <v-snackbar v-model="snackbarLoading" :color="color" timeout="3000" bottom class="white--text"><v-progress-circular
            indeterminate
            color="#fff"
        ></v-progress-circular> {{ snackbarLoading_message }}</v-snackbar>
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
            snackbarLoading: false, 
            snackbarLoading_message: '',

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

            transaksi_laporan_mulai: new Date().toISOString().substr(0, 10),
            menu_trs_laporan_mulai: false,
            transaksi_laporan_selesai: new Date().toISOString().substr(0, 10),
            menu_trs_laporan_selesai: false,

            transaksi_masuk_model:{},
            transaksi_keluar_model:{},
            transaksi_semua_model:{},
            transaksi_laporan_model:{},

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

            this.transaksi_laporan_model = {
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
            }else if(exporter == 'transaksi_laporan'){
                this.transaksi_laporan_model.tanggal_mulai = this.transaksi_laporan_mulai;
                this.transaksi_laporan_model.tanggal_selesai = this.transaksi_laporan_selesai;

                this.exportData(this.transaksi_laporan_model, 'transaksi-report', 'Laporan Harian Semua Transaksi')
            }
        },

        exportData(model, url, filename){
            this.snackbarLoading_message = 'Mengunduh Transaksi';
            this.color = "#19A7CE";
            this.snackbarLoading = true;

            let tanggal_mulai = model.tanggal_mulai
            let tanggal_selesai = model.tanggal_selesai
            let axioUrl = this.apiExport+url+'?tanggal_mulai='+tanggal_mulai+'&tanggal_selesai='+tanggal_selesai;
            this.$http.get(axioUrl, {responseType: 'arraybuffer'})
            .then((response) => {
                this.devLog(response);
                this.devLog("unduh trs result code: " + response.status);
                if(response.status == 200){
                    this.snackbarLoading = false;
                    let blob = new Blob([response.data], { type: 'application/pdf' });
                    let link = document.createElement('a');
                    link.href = window.URL.createObjectURL(blob);
                    link.download = filename+'.pdf';
                    link.click();
                            }
            }).catch((err)=>{
                this.snackbarLoading = false;
                if(!err.response){
                    this.error_message = err.response;
                    this.color = "#DF2E38";
                    this.snackbar = true;
                }else{
                    this.error_message = 'Code Error ' + err;
                    this.color = "#DF2E38";
                    this.snackbar = true;
                }
            });
        },
    }
}
</script>

<style scoped>
</style>