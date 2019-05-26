<template>
    <v-container>
        <v-layout align-center justify-center fill-height>
            <v-flex  sm12 md8 lg8 pt-5>
            <v-card
                style="border:5px solid #008080;border-radius:20px;-moz-border-radius:20px;-webkit-border-radius:20px;background-color:#424242"
                height="500"
            >
            <v-layout column >
                <form @submit.prevent="onSignIn()">
                <v-flex>
                    <v-layout row justify-center ma-5>
                        <img height="30px" width="30px" src="https://firebasestorage.googleapis.com/v0/b/gpufinal.appspot.com/o/Lgo.png?alt=media&token=2339af89-71f7-4070-b815-99db4f3d2f1d"></img>
                        <span style="font-size:18px;color:#F5DCD7">Identifiez-vous</span>
                    </v-layout>
                </v-flex>

                <v-flex  xs12 sm8 offset-sm2 md8 offset-md2>
                <v-layout column justify-center>

                    <v-flex mx-5 mt-3>
                        <v-text-field dark v-model="email" label="Pseudo/Email" prepend-inner-icon="fas fa-user" color="#F5DCD7"></v-text-field>
                    </v-flex>

                    <v-flex mx-5 mt-3>
                        <v-text-field
                        dark
                        type="password"
                        v-model="password"
                        label="Mot de passe"
                        prepend-inner-icon="fas fa-unlock-alt"
                        color="#F5DCD7"
                    
                        ></v-text-field>
                    </v-flex>

                    <v-flex mx-5 mt-3>
                        <router-link to="/signup"><div>Pas de compte ? Crée-en-un</div></router-link>
                    </v-flex>
                </v-layout>
                </v-flex>
            
                
                <v-layout column wrap align-center justify-center mx-5>
                    <v-flex >
                        <v-btn type="submit" color="#F5DCD7">
                            <div>Se Connecter</div>
                        </v-btn>
                    </v-flex>
                    <v-flex>
                        <v-btn color="#F5DCD7" disabled class="mx-3" icon>
                            <v-icon size="24px">fab fa-google</v-icon>
                        </v-btn>
                    
                        <v-btn color="#F5DCD7" disabled class="mx-3" icon>
                            <v-icon size="24px">fab fa-facebook</v-icon>
                        </v-btn>
                    </v-flex>
                </v-layout>
                
        </form>
        </v-layout>
        </v-card>
           </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            email:'',
            password:''
        }
    },

    methods: {
        onSignIn() {
            this.$store.dispatch('signUserIn',{email:this.email, password:this.password})
            }
        }
    }
</script>

<style>

</style>
