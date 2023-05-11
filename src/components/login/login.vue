<template>
    <v-container grid-list-md>
        <v-layout align-center justify-center>
                    <v-card class="card-form" elevation="2">
                        <v-container column fluid>
                            <v-layout column align-start v-if="!this.param_pengelola">
                                <p class="title-paragraph">Masuk Sekarang!</p>
                                <p class="subtitle-paragraph">Nikmati kemudahan memesan kos</p>
                            </v-layout>
                            <v-layout column align-start v-if="this.param_pengelola">
                                <p class="title-paragraph">Selamat Datang Pengelola!</p>
                                <!-- <p class="subtitle-paragraph">Nikmati kemudahan memesan kos</p> -->
                            </v-layout>
                            <v-form @submit.prevent="validateForm()" v-model="valid" ref="form_login" autofocus lazy-validation>
                                <v-layout column pt-4>
                                        <v-layout column align-start wrap>
                                        <p class="thin-regular-text">Email</p>
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
                                        <p class="thin-regular-text">Password</p>
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
                                <v-btn color="#146C94" elevation="0" class="white--text mt-4" type="submit">Masuk</v-btn>
                            </v-layout>
                        </v-form>
                        <v-layout column align-start pt-12 v-if="!this.param_pengelola">
                            <p class="paragraph medium-regular-text">Belum punya akun?</p>
                            <a  class="bold-regular-text pt-3 daftar-anchor" @click="register()">Daftar Sekarang</a>
                        </v-layout>
                    </v-container>
                </v-card>
        </v-layout> 
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
        },
        data(){
            return{
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
                console.log('valid')
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
                let loginData = {
                    email: this.login.email,
                    password: this.login.password,
                };
                this.devLog("Trying to connect... "+ this.api + " with : " + JSON.stringify(loginData)) ;
                this.$http.post(this.api, loginData)
                .then(response => {
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
    .card-form{
        width: 28vw;
        padding: 48px;
        border-radius: 6px;
    }

    .title-paragraph{
        font-size: 28px;
        font-weight: 600;
    }

    .subtitle-paragraph{
        font-weight: 300;
        font-size: 18px;
    }
</style>