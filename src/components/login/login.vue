<template>
    <v-container grid-list-md>
        <div class="login__grid">
            <div class="login__grid-card">
                <v-card class="card__form" elevation="2" v-if="!reset_password_card">
                    <div class="login__grid--form">
                        <div class="login__grid--form__child-1">
                            <v-layout column align-start v-if="!this.param_pengelola">
                                <p class="title__paragraph">Masuk Sekarang!</p>
                                <p class="subtitle__paragraph">Nikmati kemudahan memesan kos</p>
                            </v-layout>
                            <v-layout column align-start v-if="this.param_pengelola">
                                <p class="title__paragraph">Selamat Datang Pengelola!</p>
                            </v-layout>
                        </div>
                        <div class="login__grid--form__child-2">
                            <v-form @submit.prevent="validateForm()" v-model="valid" ref="form_login" autofocus lazy-validation>
                                <v-layout column pt-4>
                                    <v-layout column align-start wrap>
                                        <p class="regular-text__thin">Email</p>
                                    </v-layout>
                                    <v-text-field
                                        outlined
                                        label="Masukkan Email"
                                        v-model="login.email"
                                        :rules="email_rules"
                                        @input="checkEmail()"
                                        :success="email_ok==1 ? true : false"
                                        :error="email_ok==-1 ? true : false"
                                        type="email"
                                        ></v-text-field>
                                    <v-layout column align-start wrap>
                                        <p class="regular-text__thin">Password</p>
                                    </v-layout>
                                    <v-text-field
                                        outlined
                                        label="Masukkan Password"
                                        :append-icon="!pass.visible ? 'mdi-eye' : 'mdi-eye-off'"
                                        @click:append="() => (pass.visible = !pass.visible)"
                                        v-model="login.password"
                                        @input="checkPass()"
                                        :success="pass.ok==1 ? true : false"
                                        :error="pass.ok==-1 ? true : false"
                                        :rules="pass.rule"
                                        :type="!pass.visible ? 'password' : 'text'"
                                    ></v-text-field>
                                    <v-layout column align-end class="mb-4">
                                        <a class="regular-text__bold btn__daftar-anchor" @click="reset_password_card = true">Lupa Password?</a>
                                    </v-layout>
                                    <v-btn color="#146C94" elevation="0" class="white--text mt-4" type="submit">Masuk</v-btn>
                                </v-layout>
                            </v-form>
                        </div>
                        <div class="login__grid--form__child-3">
                            <v-layout column align-start pt-16 v-if="!this.param_pengelola">
                                <p class="paragraph regular-text__medium">Belum punya akun?</p>
                                <a class="regular-text__bold pt-3 btn__daftar-anchor" @click="register()">Daftar Sekarang</a>
                            </v-layout>
                        </div>
                    </div>
                </v-card>
                <v-card class="card__form" elevation="2" v-else-if="reset_password_card">
                    <div class="login__grid--form">
                        <div class="login__grid--form__child-1">
                            <v-layout column align-start>
                                <p class="title__paragraph">Lupa Password</p>
                                <p class="subtitle__paragraph"></p>
                            </v-layout>
                        </div>
                        <div class="login__grid--form__child-2">
                            <v-form @submit.prevent="requestReset()" v-model="valid" ref="form_reset_pass" autofocus lazy-validation>
                                <v-layout column pt-4>
                                    <v-layout column align-start wrap>
                                        <p class="regular-text__thin">Masukkan Email untuk Login</p>
                                    </v-layout>
                                    <v-text-field
                                        outlined
                                        label="Masukkan Email"
                                        v-model="login.email"
                                        :rules="email_rules"
                                        @input="checkEmail()"
                                        :success="email_ok==1 ? true : false"
                                        :error="email_ok==-1 ? true : false"
                                        type="email"
                                        ></v-text-field>
                                    <v-btn color="#146C94" elevation="0" class="white--text mt-4" type="submit">Reset</v-btn>
                                </v-layout>
                            </v-form>
                        </div>
                        <div class="login__grid--form__child-3">
                            <v-layout column align-start pt-16>
                                <p class="paragraph regular-text__medium">Ingat Password Anda?</p>
                                <a class="regular-text__bold pt-3 btn__daftar-anchor" @click="reset_password_card = false">Login Sekarang</a>
                            </v-layout>
                        </div>
                    </div>   
                </v-card>
            </div>
        </div>

        <v-snackbar v-model="snackbarLoading" :color="color" timeout="-1" bottom class="white--text"><v-progress-circular
            indeterminate
            color="#fff"
        ></v-progress-circular> {{ snackbarLoading_message }}</v-snackbar>

        <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom class="white--text">{{ error_message }}</v-snackbar>
    </v-container>
</template>

<script>
    export default{
        name: "login-page",

        props: {
            api: {
                type: String,
                required: true
            },
            apiForgot: {
                type: String,
                required: true
            },
        },
        data(){
            return{
                reset_password_card: false,
                snackbarLoading: false, 
                snackbarLoading_message: '',

                email: '',
                snackbar: '',
                color: '',
                error_message: '',
                password: '',
                valid: false,
                show1: false,
                param_pengelola: false,
                rules: {
                    required: value => !!value || 'Required.'
                },
                pass: {
                    visible: false,
                    ok: 0,
                    rule: [
                        v => (v != "") || 'Password must not be empty!',
                        v => (v.length >= 5) || 'Password must not be less than 5 characters!',
                    ],
                },
                email_rules: [
                    v => !!v || "Field is required",
                    v => /^[^@]+@\w+(\.\w+)+\w$/.test(v) || 'E-mail must be valid'
                ],
                email_ok: 0,

                login: {},
            }
        },
        created(){
            this.param_pengelola = this.check_pengelola();
        },  
        methods:{
            initModel(){
                this.login = {
                    email: '',
                    password: '',
                }
            },
            checkEmail() {
                if(	/^[^@]+@\w+(\.\w+)+\w$/.test(this.login.email) && this.login.email.length > 0){
                    this.email_ok = 1;
                }else{
                    this.email_ok = -1;
                }
            },
            checkPass() {
                if(this.login.password.length >= 5){
                    this.pass.ok = 1;
                }else{
                    this.pass.ok = -1;
                }
            },

            validateForm () {
                this.devLog('valid')
                this.devLog("validating");
                // this.devLog(this.valid);
                this.valid = (this.$refs.form_login).validate();
                this.checkPass();
                this.checkEmail();

                if (this.valid == true && this.pass.ok == 1 && this.email_ok == 1) {
                    this.submitForm();
                }else{
                    window.scrollTo(0,0);
                }
            },

            submitForm(){
                this.snackbarLoading_message = 'Loading';
                this.color = "orange darken-2";
                this.snackbarLoading = true;


                let loginData = {
                    email: this.login.email,
                    password: this.login.password,
                    firebase_token: localStorage.getItem('firebaseToken')
                };
                this.devLog("Trying to connect... "+ this.api + " with : " + JSON.stringify(loginData)) ;
                this.$http.post(this.api, loginData)
                .then(response => {
                    this.snackbarLoading = false;
                    this.devLog("Login Result Code: " +response.status);
                    if(response.status == 200){
                        if(response.data.api_status == "fail"){
                            this.devLog('response fail')
                            this.error_message = response.data.api_title;
                            this.color = "red";
                            this.snackbar = true;
                        }else{
                            this.user = response.data.data[0];
                            localStorage.token= response.data.api_message;
                            this.devLog("Token: "+ localStorage.token);
                            this.devLog("Login Result Status: " +response.data.api_status);
                            localStorage.userLogin = JSON.stringify(this.user);
                            this.devLog(JSON.parse(localStorage.userLogin));

                            if(!this.param_pengelola && this.user.roles_id == 2){
                                this.$router
                                    .push({ path: '/dashboard' })
                                    .then(() => { this.$router.go() })
                            }else if(this.param_pengelola && this.user.roles_id == 1){
                                this.$router
                                    .push({ path: '/' })
                                    .then(() => { this.$router.go() })
                            }else if(this.user.roles_id == 1){
                                this.$router
                                    .push({ path: '/pengelola' })
                                    .then(() => { this.$router.go() })
                            }
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

            requestReset(){
                this.checkEmail();
                if(this.email_ok == 1){
                    this.devLog("Email Seems OK, requesting...");
                    this.sendEmail();
                }
            },

            sendEmail(){
                this.snackbarLoading_message = 'Loading';
                this.color = "orange darken-2";
                this.snackbarLoading = true;

                let loginData = {
                    email: this.login.email,
                };
                this.devLog("Trying to connect... "+ this.api + " with : " + JSON.stringify(loginData)) ;
                this.error_message = 'Loading..';
                this.color = "green";
                this.snackbar = true;
                this.$http.post(this.apiForgot, loginData)
                .then(response => {
                    this.snackbarLoading = false;
                    this.devLog("Login Result Code: " +response.status);

                    if(response.status == 200){
                        this.error_message = response.data;
                        this.color = "green";
                        this.snackbar = true;
                    }
                }).catch((err)=>{
                    this.snackbarLoading = false;
                    this.error_message = err.response.data.message;
                    this.color = "red";
                    this.snackbar = true;
                });
            },

            register(){
                this.$router
                    .push({ path: '/register' })
                    .then(() => { this.$router.go() })
            },

            refreshPage(){
                window.location.reload(true);
            }
        }
    }
</script>

<style scoped>
    .title__paragraph{
        font-size: 28px;
        font-weight: 600;
    }

    .subtitle__paragraph{
        font-weight: 300;
        font-size: 18px;
    }
</style>