<template>
    <v-container grid-list-md>
        <v-layout align-center justify-center>
            <v-card class="card__form" elevation="2">
                <v-form @submit.prevent="validateForm()" v-model="valid" ref="form_register" autofocus lazy-validation>
                    <v-container column fluid>
                        <v-layout column align-start>
                            <p class="title__paragraph">Silahkan Daftar!</p>
                            <p class="subtitle__paragraph">Untuk akses fitur kami secara penuh</p>
                        </v-layout>
                        <v-layout column pt-4>
                            <v-layout column align-start>
                                <p class="regular-text__thin">Nama Lengkap</p>
                            </v-layout>
                            <v-text-field
                                outlined
                                label="Masukkan Nama Lengkap"
                                v-model="model.name"
                                :rules="[rules.required]"
                                ></v-text-field>
                                <v-layout column align-start>
                                    <p class="regular-text__thin">Nomor Telepon</p>
                                </v-layout>
                                <v-text-field
                                outlined
                                label="Masukkan Nomor Telepon"
                                v-model="model.phone_number"
                                :rules="[rules.required]"
                                ></v-text-field>
                                <v-layout column align-start>
                                    <p class="regular-text__thin">Email</p>
                                </v-layout>
                                <v-text-field
                                outlined
                                label="Masukkan Email"
                                v-model="model.email"
                                type="email"
                                :rules="[rules.required]"
                                ></v-text-field>
                                <v-layout column align-start>
                                    <p class="regular-text__thin">Password</p>
                            </v-layout>
                            <v-text-field
                                outlined
                                label="Masukkan Password"
                                v-model="model.password"
                                :append-icon="model.show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                :rules="[rules.required]"
                                :type="model.show1 ? 'text' : 'password'"
                                @click:append="model.show1 = !model.show1"
                                >
                            </v-text-field>


                            <v-btn color="#146C94" elevation="0" class="white--text" ref="form_register" type="submit">Daftar Sekarang</v-btn>
                            <hr class="mt-6">

                            <div class="btn-akun--1">
                                <v-btn color="#19A7CE" outlined text elevation="0" class="btn__outline mt-6" @click="login()">Sudah Punya Akun? Masuk Sekarang</v-btn>
                            </div>
                            <div class="btn-akun--2">
                                <div class="btn-akun--2__child-1">
                                    <p class="regular-text__medium paragraph" style="text-align: left">Sudah punya akun?</p>
                                </div>
                                <div class="btn-akun--2__child-2">
                                    <v-layout align-start>
                                        <v-btn color="#19A7CE" outlined text elevation="0" class="btn__outline" @click="login()">Masuk Sekarang</v-btn>
                                    </v-layout>
                                </div>
                            </div>
                            
                        </v-layout>
                    </v-container>
                </v-form>
            </v-card>
        </v-layout> 
        <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom class="white--text">{{ error_message }}</v-snackbar>
        <v-snackbar v-model="snackbarLoading" :color="color" timeout="-1" bottom class="white--text"><v-progress-circular
            indeterminate
            color="#fff"
        ></v-progress-circular> {{ snackbarLoading_message }}</v-snackbar>

    </v-container>
</template>

<script>
    export default{
        name: "register-page",

        data(){
            return{
                snackbarLoading: false, 
                snackbarLoading_message: '',

                snackbar: '',
                color: '',
                error_message: '',
                valid: false,
                model: {},
                
                user:[],
                rules: {
                    required: value => !!value || 'Required.',
                    min: v => v.length >= 8 || 'Min 8 characters',
                },
            }
        },
        created(){
            this.devLog("Component Product Item Created...");
            this.devLog(`WINDOW: { WIDTH: ${this.WINDOW.WIDTH} , HEIGHT: ${this.WINDOW.HEIGHT} }`);
            this.initData();
        },
        methods:{
            initData(){
                this.initModel();
                this.devLog('init data');
            },
            initModel(){
                this.devLog('init model');
                this.model = {
                    id: null,
                    show1: false,

                    email: '',
                    password: '',
                    passwordUlang: '',
                    name: '',
                    phone_number: '',
                }
            },
            validateForm () {
                this.devLog('valid')
                this.devLog("validating");
                // this.devLog(this.valid);
                this.valid = (this.$refs.form_register).validate();
                this.devLog(this.valid);

                if (this.valid == true) {
                    this.submitForm();
                }else{
                    window.scrollTo(0,0);
                }
            },

            submitForm(){
                this.snackbarLoading_message = 'Loading';
                this.color = "orange darken-2";
                this.snackbarLoading = true;

                // this.devLog(this.model)
                this.devLog("Trying to connect... "+ this.API + " with : " + JSON.stringify(this.model)) ;

                this.$http.post(this.API+'/register', this.model)
                .then(response => {
                    this.devLog("register Result Code: " +response.status);
                    if(response.status == 201){
                        if(response.data.api_status == "fail"){
                            this.devLog('response fail')
                            this.error_message = response.data.api_title;
                            this.color = "red";
                            this.snackbar = true;
                        }else{
                            this.snackbarLoading = false;

                            this.error_message = 'Berhasil, Silahkan Login';
                            this.color = "green";
                            this.snackbar = true;

                            // this.$router
                            //     .push({ path: '/dashboard' })
                            //     .then(() => { this.$router.go() })
                            // this.$router.push('/dashboard');
                        }
                    }
                }).catch((err)=>{
                    this.snackbarLoading = false;
                    this.error_message = err.response.data.message;
                    this.color = "red";
                    this.snackbar = true;
                });
            },

            login(){
                this.$router
                    .push({ path: '/login' })
                    .then(() => { this.$router.go() })
            },
        }

    }
</script>

<style scoped>
    .btn__outline{
        border: thin solid #19A7CE;
    }
</style>