<template>
    <v-main>
        <v-layout align-center justify-center>
            <v-card class="card-form" elevation="2">
                <v-container column fluid>
                    <v-layout column align-start>
                        <p class="title-paragraph">Masuk Sekarang!</p>
                        <p class="subtitle-paragraph">Nikmati kemudahan memesan kos</p>
                    </v-layout>
                    <v-layout column pt-4>
                        <v-layout column align-start wrap>
                            <p>Email</p>
                        </v-layout>
                        <v-text-field
                            outlined
                            label="Masukkan Email"
                            v-model="email"
                        ></v-text-field>
                        <v-layout column align-start wrap>
                            <p>Password</p>
                        </v-layout>
                        <v-text-field
                            outlined
                            label="Masukkan Password"
                            v-model="password"
                            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                            :rules="[rules.required]"
                            :type="show1 ? 'text' : 'password'"
                            @click:append="show1 = !show1"
                            >
                        </v-text-field>
                        <v-btn color="#146C94" elevation="0" class="white--text">Masuk</v-btn>
                    </v-layout>
                    <v-layout column align-start pt-12>
                        <p class="paragraph medium-text">Belum punya akun?</p>
                        <!-- <v-btn text color="#146C94" class="pa-0 pt-2">Daftar Sekarang</v-btn> -->
                        <a color="#146C94" class="bold-text pt-3">Daftar Sekarang</a>
                    </v-layout>
                </v-container>
            </v-card>
        </v-layout> 
    </v-main>
</template>

<script>
    export default{
        name: "login-page",

        data(){
            return{
                email: '',
                password: '',
                show1: false,
                rules: {
                    required: value => !!value || 'Required.'
                },
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