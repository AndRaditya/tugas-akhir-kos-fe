<template>
    <v-main>
        <v-layout align-center justify-center>
            <v-card class="card-form" elevation="2">
                <v-form @submit.prevent="validateForm()" v-model="valid" ref="form_register" autofocus lazy-validation>
                    <v-container column fluid>
                        <v-layout column align-start>
                            <p class="title-paragraph">Silahkan Daftar!</p>
                            <p class="subtitle-paragraph">Untuk akses fitur kami secara penuh</p>
                        </v-layout>
                        <v-layout column pt-4>
                            <v-layout column align-start>
                                <p class="thin-regular-text">Nama Lengkap</p>
                            </v-layout>
                            <v-text-field
                                outlined
                                label="Masukkan Nama Lengkap"
                                v-model="model.name"
                                :rules="[rules.required]"
                                ></v-text-field>
                                <v-layout column align-start>
                                    <p class="thin-regular-text">Nomor Telepon</p>
                                </v-layout>
                                <v-text-field
                                outlined
                                label="Masukkan Nomor Telepon"
                                v-model="model.phone_number"
                                :rules="[rules.required]"
                                ></v-text-field>
                                <v-layout column align-start>
                                    <p class="thin-regular-text">Email</p>
                                </v-layout>
                                <v-text-field
                                outlined
                                label="Masukkan Email"
                                v-model="model.email"
                                type="email"
                                :rules="[rules.required]"
                                ></v-text-field>
                                <v-layout column align-start>
                                    <p class="thin-regular-text">Password</p>
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
                            <v-btn color="#19A7CE" outlined text elevation="0" class="outline-btn mt-6" @click="login()">Sudah Punya Akun? Masuk Sekarang</v-btn>
                        </v-layout>
                    </v-container>
                </v-form>
            </v-card>
        </v-layout> 
        <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom class="white--text">{{ error_message }}</v-snackbar>
    </v-main>
</template>

<script>
    export default{
        name: "register-page",

        data(){
            return{
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
                console.log('valid')
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
                // this.devLog(this.model)
                this.devLog("Trying to connect... "+ this.API + " with : " + JSON.stringify(this.model)) ;

                this.$http.post(this.API+'/kos-booking', this.model)
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

                            this.$router
                                .push({ path: '/dashboard' })
                                .then(() => { this.$router.go() })
                            // this.$router.push('/dashboard');
                        }
                    }
                }).catch((err)=>{
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
    .card-form{
        width: 28vw;
        padding: 48px;
        border-radius: 6px;
        margin-bottom: 10rem;
    }

    .title-paragraph{
        font-size: 28px;
        font-weight: 600;
    }

    .subtitle-paragraph{
        font-weight: 300;
        font-size: 18px;
    }

    .outline-btn{
        border: thin solid #19A7CE;
    }
</style>