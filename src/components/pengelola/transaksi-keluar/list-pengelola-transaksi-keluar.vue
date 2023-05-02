<template>
    <v-container grid-list-md class="pt-0">
        <v-layout align-start row>
            <v-layout align-start>
                <p class="main-title">List Transaksi Keluar</p>
            </v-layout>
            <v-layout justify-end row>
                <v-btn color="#146C94" elevation="0" class="white--text mr-2"  @click="tambahKamar()">Tambah Transaksi</v-btn>
                <v-btn color="#146C94" elevation="0" class="white--text ml-2"  @click="tambahKamar()">Unduh Transaksi</v-btn>
            </v-layout>
        </v-layout>
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

        <v-dialog v-model="dialog_konfirmasi_hapus" persistent max-width="25vw">
            <v-card class="pa-4">
                <p class="medium-regular-text">Ingin Menghapus Transaksi {{ nomor_trs_temp }}?</p>
                <v-layout justify-center class="pt-4">
                    <v-btn outlined class="mr-2" @click="closeDialog()">Keluar</v-btn>
                    <v-btn color="red" class="ml-2 white--text" @click="hapusTransaksi()">Hapus</v-btn>
                </v-layout>
            </v-card>
        </v-dialog>
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
    },
    data(){
        return{
            snackbar: '',
            color: '',
            error_message: '',
            dialog_konfirmasi_hapus: false,
            nomor_trs_temp: '',
            
            list:{
                headers: [],
                datas: [],
            },
        }
    },
    created(){
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
            this.$http.get(this.api)
            .then(response => {
                this.devLog("Login Result Code: " +response.status);
                if(response.status == 200){
                    if(response.data.api_status == "fail"){
                        this.devLog('response fail')
                        this.error_message = response.data.api_title;
                        this.color = "red";
                        this.snackbar = true;
                    }else{
                        this.list.datas = response.data.data;
                        this.devLog(this.list.datas);
                    }
                }
            }).catch((err)=>{
                this.error_message = err.response.data.message;
                this.color = "red";
                this.snackbar = true;
            });
        },
        tambahKamar(){
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
            const id_temp = this.list_temp.id;

            this.dialog_konfirmasi_hapus = false;
            this.devLog(this.api+'/'+id_temp)

            this.$http.delete(this.api+'/'+id_temp)
                .then(response => {
                    this.devLog(JSON.stringify(response));
                    if(response.status == 204){
                        this.axioData();
                        this.closeDialog();
                    }
                }).catch((err) => {
                    this.error_message = err.response.data.message;
                        this.color = "red";
                        this.snackbar = true;
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