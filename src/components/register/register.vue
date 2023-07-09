<template>
    <v-container grid-list-md>
        <v-layout align-center justify-center>
            <v-card class="card__form" elevation="2"
                data-aos="fade-zoom-ing"
                data-aos-offset="50"
                data-aos-delay="50"
                data-aos-duration="500"
                data-aos-easing="ease-in-back"
                data-aos-mirror="false"
                data-aos-once="true"
                data-aos-anchor-placement="top-center">
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
                                    label="Masukkan Nomor"
                                    v-model="model.phone_number"
                                    :rules="phone_number_rules"
                                    @input="checkPhoneNumber()"
                                    :success="phone_number_ok==1 ? true : false"
                                    :error="phone_number_ok==-1 ? true : false"
                                ></v-text-field>
                                <v-layout column align-start>
                                    <p class="regular-text__thin">Email</p>
                                </v-layout>
                                <v-text-field
                                    outlined
                                    label="Masukkan Email"
                                    v-model="model.email"
                                    :rules="email_rules"
                                    @input="checkEmail()"
                                    :success="email_ok==1 ? true : false"
                                    :error="email_ok==-1 ? true : false"
                                    type="email"
                                ></v-text-field>
                                <v-layout column align-start>
                                    <p class="regular-text__thin">Password</p>
                            </v-layout>
                            <v-text-field
                                outlined
                                label="Masukkan Password"
                                v-model="model.password"
                                :append-icon="model.show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                :rules="pass.rule"
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
                    required: value => !!value || 'Harus Diisi',
                    min: v => v.length >= 8 || 'Minimal 8 karakter',
                },
                pass: {
                    visible: false,
                    ok: 0,
                    rule: [
                        v => (v != "") || 'Password tidak boleh kosong!',
                        v => (v.length >= 5) || 'Password tidak boleh kurang dari 5 karakter',
                    ],
                },
                email_rules: [
                    v => !!v || "Harus Diisi",
                    v => /^[^@]+@\w+(\.\w+)+\w$/.test(v) || 'E-mail harus benar'
                ],
                email_ok: 0,
                phone_number_rules: [
                    v => !!v || "Harus Diisi",
                    // v => (v.length <= 9 || v.length > 11) || 'Phone Number between 10 - 13', 
                    v => /^(\+62|62)?[\s-]?0?8[1-9]{1}\d{1}[\s-]?\d{4}[\s-]?\d{2,5}$/.test(v) || 'Nomor Telepon harus benar',
                ],
                phone_number_ok: 0,
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
            checkEmail() {
                if(	/^[^@]+@\w+(\.\w+)+\w$/.test(this.model.email) && this.model.email.length > 0){
                    this.email_ok = 1;
                }else{
                    this.email_ok = -1;
                }
            },
            checkPhoneNumber(){
                if(	/^(\+62|62)?[\s-]?0?8[1-9]{1}\d{1}[\s-]?\d{4}[\s-]?\d{2,5}$/.test(this.model.phone_number) && this.model.phone_number.length > 0){
                    this.phone_number_ok = 1;
                }else{
                    this.phone_number_ok = -1;
                }
            },
            validateForm () {
                this.devLog('valid')
                this.devLog("validating");
                // this.devLog(this.valid);
                this.valid = (this.$refs.form_register).validate();
                this.devLog(this.valid);
                this.checkEmail();
                this.checkPhoneNumber();

                if (this.valid == true && this.email_ok == 1 && this.phone_number_ok == 1) {
                    this.submitForm();
                }else{
                    window.scrollTo(0,0);
                }
            },

            submitForm(){
                this.snackbarLoading_message = 'Loading';
                this.color = "#19A7CE";
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
                            this.color = "#DF2E38";
                            this.snackbar = true;
                        }else{
                            this.snackbarLoading = false;

                            this.error_message = 'Berhasil, Silahkan Login';
                            this.color = "#519259";
                            this.snackbar = true;

                            this.$router
                                .push({ path: '/login' })
                                .then(() => { this.$router.go() })
                            // this.$router.push('/dashboard');
                        }
                    }
                }).catch((err)=>{
                    this.snackbarLoading = false;
                    this.error_message = err.response.data.message;
                    this.color = "#DF2E38";
                    this.snackbar = true;
                });
            },

            login(){
                this.$router
                    .push({ path: '/login' })
                    // .then(() => { this.$router.go() })
            },
        }

    }
</script>

<style scoped>
    .btn__outline{
        border: thin solid #19A7CE;
    }
</style>