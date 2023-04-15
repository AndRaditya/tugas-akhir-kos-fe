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
                                <p>Nama Lengkap</p>
                            </v-layout>
                            <v-text-field
                                outlined
                                label="Masukkan Nama Lengkap"
                                v-model="model.nama_lengkap"
                            ></v-text-field>
                            <v-layout column align-start>
                                <p>Nomor Telepon</p>
                            </v-layout>
                            <v-text-field
                                outlined
                                label="Masukkan Nomor Telepon"
                                v-model="model.nomor_telepon"
                            ></v-text-field>
                            <v-layout column align-start>
                                <p>Email</p>
                            </v-layout>
                            <v-text-field
                                outlined
                                label="Masukkan Email"
                                v-model="model.email"
                                type="email"
                            ></v-text-field>
                            <v-layout column align-start>
                                <p>Password</p>
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


                            <v-btn color="#146C94" elevation="0" class="white--text" ref="form_register" type="submit">Masuk</v-btn>
                            <v-btn color="#19A7CE" outlined text elevation="0" style="margin-top: 12px;" class="outline-btn">Sudah Punya Akun? Masuk Sekarang</v-btn>
                        </v-layout>
                    </v-container>
                </v-form>
            </v-card>
        </v-layout> 
    </v-main>
</template>

<script>
    export default{
        name: "register-page",

        data(){
            return{
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
                    nama_lengkap: '',
                    nomor_telepon: '',
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
                this.devLog(this.model)
            }
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