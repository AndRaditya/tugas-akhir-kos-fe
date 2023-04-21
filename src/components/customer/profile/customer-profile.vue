<template>
    <v-main>
        <v-layout align-center justify-center>
            <v-card class="card-form" elevation="2">
                <v-form @submit.prevent="validateForm()" v-model="valid" ref="form_profile" autofocus lazy-validation>
                    <v-container column fluid>
                        <v-layout column align-start>
                            <p class="title-paragraph">Profil Customer</p>
                            <p class="subtitle-paragraph">Silahkan Ubah Profil Anda</p>
                        </v-layout>
                        <v-layout column pt-4>
                            <v-layout column align-start>
                                <p class="thin-regular-text">Nama Lengkap</p>
                            </v-layout>
                            <v-text-field
                                outlined
                                label="Masukkan Nama Lengkap"
                                v-model="user.name"
                            ></v-text-field>
                            <v-layout column align-start>
                                <p class="thin-regular-text">Nomor Telepon</p>
                            </v-layout>
                            <v-text-field
                                outlined
                                label="Masukkan Nomor Telepon"
                                v-model="user.phone_number"
                            ></v-text-field>
                            <v-layout column align-start>
                                <p class="thin-regular-text">Email</p>
                            </v-layout>
                            <v-text-field
                                outlined
                                label="Masukkan Email"
                                v-model="user.email"
                                type="email"
                            ></v-text-field>

                            <v-layout column class="py-4">
                                <p class="medium-regular-text">Ubah Password Anda</p>
                                <v-layout column align-start>
                                    <p class="thin-regular-text">Password Lama</p>
                                </v-layout>
                                <!-- v-model="user.password"
                                :append-icon="model.show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                :rules="[rules.required]"
                                :type="model.show1 ? 'text' : 'password'"
                                @click:append="model.show1 = !model.show1" -->
                                <v-text-field
                                    outlined
                                    label="Masukkan Password Lama"
                                    placeholder="Password Lama"
                                    :append-icon="pass.old.visible ? 'mdi-eye' : 'mdi-eye-off'"
                                    @click:append="() => (pass.old.visible = !pass.old.visible)"
                                    v-model="pass.old.value"
                                    @input="checkOldPass()"
                                    :success="pass.old.ok==1 ? true : false"
                                    :error="pass.old.ok==-1 ? true : false"
                                    :rules="pass.old.rule"
                                    :type="!pass.old.visible ? 'password' : 'text'"
                                    >
                                </v-text-field>
                                <v-layout column align-start>
                                    <p class="thin-regular-text">Password Baru</p>
                                </v-layout>
                                <v-text-field
                                    outlined
                                    label="Masukkan Password Baru"
                                    :append-icon="pass.new.visible ? 'mdi-eye' : 'mdi-eye-off'"
                                    @click:append="() => (pass.new.visible = !pass.new.visible)"
                                    v-model="pass.new.value"
                                    @input="checkNewPass()"
                                    :success="pass.new.ok==1 ? true : false"
                                    :error="pass.new.ok==-1 ? true : false"
                                    :rules="pass.new.rule"
                                    :type="!pass.new.visible ? 'password' : 'text'"
                                    >
                                </v-text-field>
                                <v-layout column align-start>
                                    <p class="thin-regular-text">Konfirmasi Password Baru</p>
                                </v-layout>
                                <v-text-field
                                    outlined
                                    label="Konfirmasi Password Baru"
                                    :append-icon="pass.retype.visible ? 'mdi-eye' : 'mdi-eye-off'"
                                    @click:append="() => (pass.retype.visible = !pass.retype.visible)"
                                    v-model="pass.retype.value"
                                    @input="checkRePass()"
                                    :success="pass.new.ok==1 ? true : false"
                                    :error="pass.new.ok==-1 ? true : false"
                                    :rules="pass.retype.rule"
                                    :type="!pass.retype.visible ? 'password' : 'text'"
                                    >
                                </v-text-field>
                            </v-layout>

                            <v-btn color="#146C94" elevation="0" class="white--text btn-save-profile" ref="form_profile" type="submit">Simpan</v-btn>
                        </v-layout>
                    </v-container>
                </v-form>
            </v-card>
        </v-layout> 
        <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom class="white--text">{{ error_message }}</v-snackbar>

    </v-main>
</template>

<script>

    function passField() {
        return {
            value: "",
            visible: false,
            ok: 0,
            rule: [],
        }
    }

    export default{
        name: "register-page",

        data(){
            return{
                valid: false,
                model: {},
                snackbar: '',
                color: '',
                error_message: '',
                
                user:{
                    id: null,
                    name: '',
                    email: '',
                    roles_id: null,
                    bank: '',
                    phone_number: '',
                },
                // rules: {
                //     required: value => !!value || 'Required.',
                //     min: v => v.length >= 8 || 'Min 8 characters',
                // },
                pass: {old: passField(), new: passField(), retype: passField()},

            }
        },
        created(){
            this.devLog("Component Product Item Created...");
            this.devLog(`WINDOW: { WIDTH: ${this.WINDOW.WIDTH} , HEIGHT: ${this.WINDOW.HEIGHT} }`);
            this.pass.old.rule= [
                // v => (v == "" ||  v.length >= 6) || 'Password must not be less than 6 characters',
            ];
            this.pass.new.rule= [
                v => (this.pass.old.value == "" || v != "") || 'Password is required',
                // v => (v == "" ||  v.length >= 6) || 'Password must not be less than 6 characters',
            ],
            this.pass.retype.rule = Array.from(this.pass.new.rule);
            this.pass.retype.rule.push(
                v => v == this.pass.new.value || 'Pasword must be the same with inputed New Password '+this.pass.new.value 
            );
            this.initData();
        },
        methods:{
            initData(){
                // this.initModel();
                this.devLog('init data');
                if(localStorage.userLogin){
                    let localStorageUser = localStorage.getItem('userLogin');
                    let user_login = JSON.parse(localStorageUser);

                    let user_id = user_login.id;

                    this.$http.get(this.API+'/users/'+user_id)
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
                                this.devLog(this.user)
                                localStorage.token= response.data.api_message;
                                this.devLog("Token: "+ localStorage.token);
                                this.devLog("Login Result Status: " +response.data.api_status);
                                // this.$router.push('/dashboard');
                            }
                        }
                    }).catch((err)=>{
                        this.error_message = err.response.data.message;
                        this.color = "red";
                        this.snackbar = true;
                    });

                }
            },
            initModel(){
                this.devLog('init model');
                this.model = {
                    id: null,
                    show1: false,
                }
            },
            validateForm () {
                console.log('valid')
                this.devLog("validating");
                // this.devLog(this.valid);
                this.valid = (this.$refs.form_profile).validate();
                this.devLog(this.valid);

                if (this.valid == true) {
                    this.submitForm();
                }else{
                    window.scrollTo(0,0);
                }
            },

            submitForm(){
                this.devLog(this.model)

                if((this.pass.old.value == "" && this.pass.old.ok !=-1) || (this.pass.new.ok == 1 && this.pass.old.ok == 1)){
                    if(this.pass.old.ok == 1){
                        this.user.oldPassword = this.pass.old.value;
                        this.user.newPassword = this.pass.new.value;
                        this.putPassword();
                    }else{
                        this.putData();
                    }
                }else{
                    alert("Please fill required data first!");
                }
                
            },

            putPassword(){
                this.devLog("Updating User Password: put to "+ this.API+'/users/'+this.user.id);
                this.devLog(JSON.stringify(this.user));
                this.$http.put(this.API + '/users', this.user).then(response => {
                    this.devLog("Loading "+ this.api + " - Result Status: " + JSON.stringify(response));
                    
                    // if(!response.data){
                        this.devLog('!response data')
                        if(response.data.api_status == "fail"){
                            this.devLog('error password')
                            // this.devLog(JSON.stringify(err));
                            this.error_message = response.data.message;
                            this.color = "red";
                            this.snackbar = true;

                            this.user.not_found = false;
                            this.devLog("user now: " + JSON.stringify(this.user));
                        }else{
                            this.putData();
                        }
                    // }
                }).catch((err) => {
                    this.devLog('error password')
                    this.devLog(JSON.stringify(err));
                    this.error_message = err.response.data.message;
                    this.color = "red";
                    this.snackbar = true;
                });
            },

                /// For updating user data
            putData() {
                // this.devLog("Updating User : put to "+ this.API+this.id);
                this.devLog("User : ");
                this.devLog(this.user);
                this.$http.put(this.API+ '/users/'+this.user.id, this.user)
                .then(response => {
                    this.devLog(response.status);
                    this.load = false;
                    if(response.status == 202){
                        this.devLog("Loading "+ this.API + " - Result Status: " +response.status);
                        this.devLog(response.data);
                        var me = JSON.parse(localStorage.userLogin);
                        this.devLog(`Me ID : ${me.id} vs User ID : ${this.user.id}`);
                        if(me.id === this.user.id){
                            this.devLog('me id === user id')
                            this.updateUserLogin(this.user.id);
                            this.error_message = 'Profile updated!';
                            this.color = "green";
                            this.snackbar = true;
                        } 
                        this.$router
                            .push({ path: '/dashboard' })
                            .then(() => { this.$router.go() })
                        // this.$router.replace(next);
                        
                    }
                }).catch((err) => {
                    this.devLog(JSON.stringify(err))
                    // this.error_message = err.response.data.message;
                    // this.color = "red";
                    // this.snackbar = true;
                });
            },

            checkOldPass() {
                // if(this.pass.old.value.length >= 6){
                    this.pass.old.ok = 1;
                // } else if(this.pass.old.value.length == 0){
                //     this.pass.old.ok = 0;
                // }else{
                    // this.pass.old.ok = -1;
                // }
            },
            checkNewPass() {
                this.pass.retype.value = "";
                this.checkOldPass();
            },
            checkRePass() {
                if(this.pass.new.value == this.pass.retype.value){
                    this.pass.new.ok = 1;
                } else {
                    this.pass.new.ok = -1;
                }
                this.checkOldPass();
            },
        }

    }
</script>

<style scoped>
</style>