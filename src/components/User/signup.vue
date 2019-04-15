<template>  
  <v-container fill-height fluid>
        <v-layout align-center>
            <v-flex xs10 offset-xs1 sm8 offset-sm2 md8 offset-md2 >
                <v-card dark height=400 align-center>
                    <v-card-text >
                        <v-container >
                            <v-form @submit.prevent="onSignUp()" justify-space-around fill-height>
                             <v-layout row wrap>
                                 <v-flex >
                                     <v-text-field
                                     name="email"
                                    label="Adresse email"
                                    id="email"
                                    v-model="email"
                                    type="email"
                                    required>
                                    </v-text-field> 
                                </v-flex>
                             </v-layout>

                             <v-layout row wrap>
                                 <v-flex >
                                     <v-text-field
                                     name="password"
                                    label="Mot de passe"
                                    id="password"
                                    v-model="password"
                                    type="password"
                                    required>
                                    </v-text-field> 
                                </v-flex>
                             </v-layout>

                             <v-layout row wrap>
                                 <v-flex >
                                     <v-text-field
                                     name="confirmPassword"
                                    label="Confirmez votre mot de passe"
                                    id="confirmPassword"
                                    v-model="confirmPassword"
                                    type="password"
                                    :rules="[comparePasswords]">
                                    </v-text-field> 
                                </v-flex>
                             </v-layout>
                             <v-layout row wrap>
                                 <v-btn type="submit" @click="onSignUp()">
                                     Envoyer
                                 </v-btn>
                             </v-layout>
                     
                             </v-form>
                        </v-container>
                        
                    </v-card-text>
                </v-card>
                
            </v-flex>
        </v-layout>
    </v-container >       
</template>
<script>
export default {
    data () {
        return {
            email:'',
            password:'',
            confirmPassword:''

        }
    },
    computed:{
        comparePasswords() {
            return this.password !== this.confirmPassword ? "Reverifiez votre mot de passe svp" : ''
        }
    },
    methods: {
        onSignUp () {
            this.$store.dispatch('signUserUp',{email:this.email, password:this.password})
        }
    }
}
</script>