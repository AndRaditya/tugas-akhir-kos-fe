<template>
    <v-container>
        <div class="user-profile__grid">
            <div class="user-profile__grid--child">
                <v-card class="card__form" elevation="2">
                    <v-form @submit.prevent="validateForm()" v-model="valid" ref="form_profile" autofocus lazy-validation>
                        <v-container column fluid>
                            <v-layout column align-start>
                                <p class="title__paragraph" v-if="!this.param_pengelola">Profil Customer</p>
                                <p class="title__paragraph" v-else-if="this.param_pengelola">Profil Pengelola</p>
                                <p class="subtitle__paragraph">Silahkan Ubah Profil Anda</p>
                            </v-layout>
                            <v-layout column pt-4>
                                <v-layout column align-start>
                                    <p class="regular-text__medium">Nama Lengkap</p>
                                </v-layout>
                                <v-text-field
                                    outlined
                                    label="Masukkan Nama Lengkap"
                                    v-model="user.name"
                                    :rules="rules"
                                ></v-text-field>
                                <v-layout column align-start>
                                    <p class="regular-text__medium">Nomor Telepon</p>
                                </v-layout>
                                <v-text-field
                                    outlined
                                    label="Masukkan Nomor Telepon"
                                    v-model="user.phone_number"
                                    :rules="phone_number_rules"
                                    @input="checkPhoneNumber()"
                                    :success="phone_number_ok==1 ? true : false"
                                    :error="phone_number_ok==-1 ? true : false"
                                ></v-text-field>
                                <v-layout column align-start>
                                    <p class="regular-text__medium">Email</p>
                                </v-layout>
                                <v-text-field
                                    outlined
                                    label="Masukkan Email"
                                    v-model="user.email"
                                    :rules="email_rules"
                                    @input="checkEmail()"
                                    :success="email_ok==1 ? true : false"
                                    :error="email_ok==-1 ? true : false"
                                    type="email"
                                ></v-text-field>
                                <v-layout column v-if="this.param_pengelola">
                                    <v-layout column align-start>
                                        <p class="regular-text__medium">Nama Bank</p>
                                    </v-layout>
                                    <v-select
                                        outlined
                                        label="Masukkan Bank"
                                        v-model="user.bank"
                                        :items="nama_bank"
                                        :rules="rules"
                                    ></v-select>
                                    <v-layout column align-start>
                                        <p class="regular-text__medium">Nomor Rekening</p>
                                    </v-layout>
                                    <v-text-field
                                        outlined
                                        label="Masukkan Nomor Rekening"
                                        v-model="user.rekening"
                                        type="number"
                                        hide-spin-buttons
                                        :rules="rules"
                                    ></v-text-field>
                                </v-layout>
                                <v-layout column v-else>
                                    <v-layout column align-start>
                                        <p class="regular-text__thin">Alamat</p>
                                    </v-layout>
                                    <v-textarea
                                        outlined
                                        label="Masukkan Alamat"
                                        v-model="user.alamat"
                                        :rules="[rules.required]"
                                    ></v-textarea>
                                    <v-layout column align-start>
                                        <p class="regular-text__thin">Pekerjaan</p>
                                    </v-layout>
                                    <v-text-field
                                        outlined
                                        label="Masukkan Pekerjaan"
                                        v-model="user.pekerjaan"
                                        :rules="[rules.required]"
                                    ></v-text-field>
                                    <v-btn 
                                        color="#19A7CE" 
                                        class="white--text btn-transfer mt-2 mb-4" 
                                        elevation="0" 
                                        :loading="isSelecting" 
                                        @click="onPickFile()"
                                        v-if="!urls"
                                    >
                                    Harap unggah foto ktp
                                    </v-btn>
                                    <input type="file" class="form-control" ref="file" @change="onFileChange($event.target.files)" style="display: none">
                                    <div class="login__grid-card__photo my-6" :style="{backgroundImage: `url(${urls})`}" v-if="urls">
                                        <v-btn icon small class="error my-auto pengelola-kos__grid-2__form-2--child-2__button" 
                                        @click="removeImage()" v-if="urls">
                                        <span class="material-icons">delete</span>
                                        </v-btn>
                                    </div>
                                </v-layout>

                                <v-layout column class="py-4">
                                    <p class="regular-text__thin">Ubah Password Anda</p>
                                    <v-layout column align-start>
                                        <p class="regular-text__medium">Password Lama</p>
                                    </v-layout>
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
                                        <p class="regular-text__medium">Password Baru</p>
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
                                        <p class="regular-text__medium">Konfirmasi Password Baru</p>
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
            </div>
        </div>
        <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom class="white--text">{{ error_message }}</v-snackbar>

        <v-snackbar v-model="snackbarLoading" :color="color" timeout="-1" bottom class="white--text"><v-progress-circular
            indeterminate
            color="#fff"
        ></v-progress-circular> {{ snackbarLoading_message }}</v-snackbar>
    </v-container>
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

        props: {
            api: {
                type: String,
                required: true
            },
            apiPassword: {
                type: String,
                required: true
            },
        },

        data(){
            return{
                urls: '',
                isSelecting: false,
                selectedFile: null,
                errorText: "",
                fileName: '',
                file: '',

                snackbarLoading: false, 
                snackbarLoading_message: '',

                ready: false,
                valid: false,
                model: {},
                snackbar: '',
                color: '',
                nama_bank: ['BANK RAKYAT INDONESIA', 'BANK MANDIRI', 'BANK NEGARA INDONESIA', 'BANK CENTRAL ASIA',
                'BANK TABUNGAN NEGARA', 'BANK DANAMON INDONESIA', 'BANK PERMATA'],
                error_message: '',
                
                user:{
                    id: null,
                    name: '',
                    email: '',
                    roles_id: null,
                    bank: '',
                    phone_number: '',
                    rekening: '',
                    photo_path: '',
                    foto_ktp: '',
                },
                param_pengelola: false,

                rules: [
                    v => !!v || "Harus Diisi",
                ],
                email_rules: [
                    v => !!v || "Harus Diisi",
                    v => /^[^@]+@\w+(\.\w+)+\w$/.test(v) || 'E-mail must be valid'
                ],
                email_ok: 0,
                
                phone_number_rules: [
                    v => !!v || "Harus Diisi",
                    // v => (v.length <= 9 || v.length > 11) || 'Phone Number between 10 - 13', 
                    v => /^(\+62|62)?[\s-]?0?8[1-9]{1}\d{1}[\s-]?\d{4}[\s-]?\d{2,5}$/.test(v) || 'Phone Number must be valid',
                ],
                phone_number_ok: 0,

                
                // rules: {
                //     required: value => !!value || 'Harus Diisi',
                //     min: v => v.length >= 8 || 'Min 8 characters',
                // },
                pass: {old: passField(), new: passField(), retype: passField()},
            }
        },
        created(){
            this.snackbarLoading_message = 'Loading';
            this.color = "#19A7CE";
            this.snackbarLoading = true;

            this.param_pengelola = this.check_pengelola();
            this.devLog("Component Product Item Created...");
            this.devLog(`WINDOW: { WIDTH: ${this.WINDOW.WIDTH} , HEIGHT: ${this.WINDOW.HEIGHT} }`);
            this.pass.old.rule= [
                // v => (v == "" ||  v.length >= 6) || 'Password must not be less than 6 characters',
            ];
            this.pass.new.rule= [
                v => (this.pass.old.value == "" || v != "") || 'Password is required',
                v => (v == "" ||  v.length >= 5) || 'Password must not be less than 5 characters',
            ],
            this.pass.retype.rule = Array.from(this.pass.new.rule);
            this.pass.retype.rule.push(
                v => v == this.pass.new.value || 'Pasword must be the same with inputed New Password '+this.pass.new.value 
            );

            this.initData();
        },
        methods:{
            checkEmail() {
                if(	/^[^@]+@\w+(\.\w+)+\w$/.test(this.user.email) && this.user.email.length > 0){
                    this.email_ok = 1;
                }else{
                    this.email_ok = -1;
                }
            },
            checkPhoneNumber(){
                if(	/^(\+62|62)?[\s-]?0?8[1-9]{1}\d{1}[\s-]?\d{4}[\s-]?\d{2,5}$/.test(this.user.phone_number) && this.user.phone_number.length > 0){
                    this.phone_number_ok = 1;
                }else{
                    this.phone_number_ok = -1;
                }
            },

            initData(){
                // this.initModel();
                this.devLog('init data');
                if(localStorage.userLogin){
                    let localStorageUser = localStorage.getItem('userLogin');
                    let user_login = JSON.parse(localStorageUser);

                    let user_id = user_login.id;

                    this.$http.get(this.api+user_id,  {
                        headers: {
                            Authorization: localStorage.token,
                        },
                    })
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
                                this.ready = true;
                                this.user = response.data.data[0];
                                this.devLog(this.user)
                                // localStorage.token= response.data.api_message;
                                this.devLog("Token: "+ localStorage.token);
                                this.devLog("Login Result Status: " +response.data.api_status);
                                // this.$router.push('/dashboard');
                                this.initPhoto();
                            }
                        }
                    }).catch((err)=>{
                        this.snackbarLoading = false;
                        this.error_message = err.response.data.message;
                        this.color = "#DF2E38";
                        this.snackbar = true;
                    });
                }
                else{
                    this.ready = false;
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
                this.snackbarLoading_message = 'Loading';
                this.color = "#19A7CE";
                this.snackbarLoading = true;
                
                this.devLog('valid')
                this.devLog("validating");
                // this.devLog(this.valid);
                this.valid = (this.$refs.form_profile).validate();
                this.devLog(this.valid);
                
                this.checkEmail();
                this.checkPhoneNumber();

                this.devLog(this.email_ok)
                this.devLog(this.phone_number_ok)

                if (this.valid == true && this.email_ok == 1 && this.phone_number_ok == 1) {
                    this.submitForm();
                }else{
                    window.scrollTo(0,0);
                    this.snackbarLoading = false;
                }
            },

            submitForm(){
                if(this.urls && ((this.pass.old.value == "" && this.pass.old.ok !=-1) || (this.pass.new.ok == 1 && this.pass.old.ok == 1))){
                    if(this.pass.old.ok == 1){
                        this.user.oldPassword = this.pass.old.value;
                        this.user.newPassword = this.pass.new.value;
                        this.putPassword();
                    }else{
                        this.putData();
                    }
                }else if(!this.urls){
                    this.snackbarLoading = false;
                    this.error_message = 'Anda belum unggah foto KTP';
                    this.color = "#DF2E38";
                    this.snackbar = true;
                } 
                else{
                    alert("Please fill required data first!");
                }
            },

            putPassword(){
                this.$http.put(this.apiPassword, this.user, {
                    headers: {
                        Authorization: localStorage.token,
                    }})
                    .then(response => {
                        this.snackbarLoading = false;
                        if(response.data.api_status == "fail"){
                            this.error_message = response.data.message;
                            this.color = "#DF2E38";
                            this.snackbar = true;
                            this.user.not_found = false;
                        }else{
                            this.putData();
                        }
                    }).catch((err) => {
                        this.snackbarLoading = false;
                        this.error_message = err.response.data.message;
                        this.color = "#DF2E38";
                        this.snackbar = true;
                    });
            },

            // For updating user data
            putData() {
                this.devLog(JSON.stringify(this.user))

                this.$http.put(this.api+this.user.id, this.user,  {headers: {
                    Authorization: localStorage.token,},
                })
                .then(response => {
                    this.load = false;
                    if(response.status == 202){
                        this.snackbarLoading = false;
                        var me = JSON.parse(localStorage.userLogin);
                        if(me.id == this.user.id){
                            this.error_message = 'Profile updated!';
                            this.color = "#519259";
                            this.snackbar = true;
                        }   
                    }
                }).catch((err) => {                   
                    this.snackbarLoading = false;
                    this.error_message = err.response.data.message;
                    this.color = "#DF2E38";
                    this.snackbar = true;
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

            initPhoto() {
                this.urls = this.user.photo_path
            },

            onPickFile() {
                this.$refs.file.click();
            },

            onFileChange(file) {
                const { maxSize } = this
                let imageFile = file[0];
                let size = imageFile.size / maxSize / maxSize
                if (file.length > 0) {
                    if (!imageFile.type.match("image.*")) {
                        this.errorDialog = true;
                        this.errorText = "Please choose an image file";
                    } else if(size>1){
                        this.errorDialog = true
                        this.errorText = 'Gambar anda terlalu besar! Pilih gambar dibawah 1MB'
                    }else {
                        let imageURL = URL.createObjectURL(imageFile);
                        this.fileName = imageFile.name;

                        this.devLog("onfilechange");
                        let reader = new FileReader();
                        reader.onloadend = (e) => {
                            this.devLog(e.target);
                            let image_url = e.target.result;

                            this.user.foto_ktp = image_url;
                        };
                        reader.readAsDataURL(imageFile);
                        this.urls = imageURL;
                    }
                }
            },

            removeImage() {
                this.urls = '';
            },

        }

    }
</script>

<style scoped>
</style>