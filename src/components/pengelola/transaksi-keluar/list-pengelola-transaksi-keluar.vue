<template>
    <v-container grid-list-md class="pt-0" v-if="ready">
        <div class="pengelola-trs-keluar__list-header">
            <div class="pengelola-trs-keluar__list-header--child-1">
                <p class="title__main">List Transaksi Keluar</p>
            </div>
            <div class="pengelola-trs-keluar__list-header--child-2">
                <div class="pengelola-trs-keluar__list-header--child-2__1">
                    <v-btn color="#146C94" elevation="0" class="white--text pengelola-trs-keluar__list-header__btn"  @click="tambahData()">Tambah Transaksi</v-btn>
                </div>
                <div class="pengelola-trs-keluar__list-header--child-2__2">
                    <v-btn color="#146C94" elevation="0" class="white--text pengelola-trs-keluar__list-header__btn"  @click="dialog_transaksi = true">Unduh Transaksi</v-btn>
                </div>
            </div>
        </div>

        <v-flex fill-height class="mt-4">
            <v-data-table
                :headers="list.headers"
                :items="ordersWithIndex"
                :items-per-page="10" 
                class="elevation-1"
            >         
                <template v-slot:[`item.actions`]="{ item }">
                    <v-icon small class="mr-2" @click="detailItem(item)">mdi-information</v-icon>
                    <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
                    <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
                </template>
            </v-data-table>
        </v-flex>
        <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom class="white--text">{{ error_message }}</v-snackbar>

        <v-dialog v-model="dialog_konfirmasi_hapus" persistent content-class="dialog-list__hapus">
            <v-card class="pa-4">
                <p class="regular-text__medium">Ingin Menghapus Transaksi {{ nomor_trs_temp }}?</p>
                <v-layout justify-center class="pt-4">
                    <v-btn outlined class="mr-2" @click="closeDialog()">Keluar</v-btn>
                    <v-btn color="red" class="ml-2 white--text" @click="hapusTransaksi()">Hapus</v-btn>
                </v-layout>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialog_transaksi" persistent content-class="dialog-list__unduh">
            <v-card class="pa-4">
                <p class="bigger--regular-text mb-6 pb-6">Unduh Transaksi Keluar</p>
                
                <v-layout row wrap fill-height>
                    <v-flex xs6 class="px-2">
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
                    <v-flex xs6 class="px-2">
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
                </v-layout>

                <v-layout justify-center class="pt-4">
                    <v-btn width="30%" elevation="0" class="white--text btn__close-dialog mr-2" @click="dialog_transaksi = false">Tutup</v-btn>
                    <v-btn elevation="0" class="white--text btn__unduh ml-2" @click="confirmExport()" width="30%">Unduh</v-btn>
                </v-layout>
             </v-card>
        </v-dialog>

        <v-snackbar v-model="snackbarLoading" :color="color" timeout="-1" bottom class="white--text"><v-progress-circular
            indeterminate
            color="#fff"
        ></v-progress-circular> {{ snackbarLoading_message }}</v-snackbar>

    </v-container>
</template>

<script>
export default {
    name: 'list-transaksi-keluar',
    props:{
        api: {
            type: String,
            required: true
        },
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
            dialog_konfirmasi_hapus: false,
            nomor_trs_temp: '',
            
            list:{
                headers: [],
                datas: [],
            },

            transaksi_keluar_mulai: new Date().toISOString().substr(0, 10),
            menu_trs_keluar_mulai: false,
            transaksi_keluar_selesai: new Date().toISOString().substr(0, 10),
            menu_trs_keluar_selesai: false,

            dialog_transaksi: false,

        }
    },
    created(){
        this.snackbarLoading_message = 'Loading';
        this.color = "#19A7CE";
        this.snackbarLoading = true;

        this.initHeader();
        this.axioData();
    },
    methods:{
        initHeader(){
            this.list.headers = [
                { text: "No.", value: "index", align: "left", sortable: true},
                { text: "Nomor Transaksi", value: "no", align: "left"},
                { text: "Tanggal Transaksi", value: "tanggal", align: "left"},
                { text: "Kategori Transaksi", value: "transaksi_keluar_kategori.name", align: "left"},
                { text: "Nilai", value: "nilai", align: "left"},
                { text: "Deskripsi", value: "desc", align: "left"},
                { text: "Actions", value: "actions", sortable: false, align: "center" },
            ];
        },
        axioData(){ 
            this.$http.get(this.api, {headers : {
                        Authorization: localStorage.token,
                    }})
            .then(response => {
                this.snackbarLoading = false;
                this.devLog("Login Result Code: " +response.status);
                if(response.status == 200){
                    if(response.data.api_status == "fail"){
                        this.devLog('response fail')
                        this.error_message = response.data.api_title;
                        this.color = "#DF2E38";
                        this.snackbar = true;
                    }else{
                        this.list.datas = response.data.data;
                        this.convertPrice();
                        this.devLog(this.list.datas);
                        this.ready = true;
                    }
                }
            }).catch((err)=>{
                this.snackbarLoading = false;
                this.error_message = err.response.data;
                this.color = "#DF2E38";
                this.snackbar = true;
                this.ready = false;
            });
        },
        convertPrice(){
            this.list.datas.forEach(element => {
                element.nilai = this.formatPrice(element.nilai);
            });
        },
        tambahData(){
            this.$router.push(this.$route.path+"/add");
        },
        detailItem(item){
            this.devLog(item);
            this.$router.push(this.$route.path+"/"+item.id);
        },
        editItem(item){
            this.devLog(item);
            this.$router.push(this.$route.path+"/edit/"+item.id);
        },
        deleteItem(item){
            this.devLog(item);
            this.dialog_konfirmasi_hapus = true;
            this.list_temp = item;
            this.nomor_trs_temp = item.no;
        },
        closeDialog(){
            this.dialog_konfirmasi_hapus = false;
            this.list_temp = null;
            this.nomor_trs_temp = '';
        },
        hapusTransaksi(){        
        this.snackbarLoading_message = 'Loading';
        this.color = "#19A7CE";
        this.snackbarLoading = true;

            const id_temp = this.list_temp.id;

            this.dialog_konfirmasi_hapus = false;
            this.devLog(this.api+'/'+id_temp)

            this.$http.delete(this.api+'/'+id_temp, {headers : {
                        Authorization: localStorage.token,
                    }})
                .then(response => {
                    this.snackbarLoading = false;
                    this.devLog(JSON.stringify(response));
                    if(response.status == 204){
                        this.axioData();
                        this.closeDialog();
                    }
                }).catch((err) => {
                    this.snackbarLoading = false;
                    this.error_message = err.response.data.message;
                        this.color = "#DF2E38";
                        this.snackbar = true;
                });
        },

        confirmExport(){
            this.exportData('transaksi-keluar', 'Transaksi Keluar')
        },

        exportData(url, filename){
        this.snackbarLoading_message = 'Loading';
        this.color = "#19A7CE";
        this.snackbarLoading = true;  

            let tanggal_mulai = this.transaksi_keluar_mulai
            let tanggal_selesai = this.transaksi_keluar_selesai
            this.devLog(this.apiExport+url+'?tanggal_mulai='+tanggal_mulai+'&tanggal_selesai='+tanggal_selesai);

            let axioUrl = this.apiExport+url+'?tanggal_mulai='+tanggal_mulai+'&tanggal_selesai='+tanggal_selesai;

            this.$http.get(axioUrl, {responseType: 'arraybuffer'})
            .then((response) => {
                this.snackbarLoading = false;
                this.devLog(response);
                this.devLog("unduh trs result code: " + response.status);
                if(response.status == 200){
                    if(!response.data){
                        this.devLog('response fail')
                        this.error_message = response;
                        this.color = "#DF2E38";
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
    },
    computed: {
        ordersWithIndex(){  
            return this.list.datas.map(
            (items, index) => ({
            ...items,
            index: index + 1
            }))
        }
    }
}
</script>

<style scoped>

</style>