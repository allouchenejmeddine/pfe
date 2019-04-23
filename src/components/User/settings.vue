<template>
    <v-container fill-height fluid>
        <v-layout align-center>
            <v-flex xs12 sm8 offset-sm2 md8 offset-md2>
                <v-card dark fill-height>
                    <v-list>
                        <v-layout column ma-3>
                            <v-layout align-center fluid fill-height mx-3 mt-3>
                                <v-flex mb-4>
                                    <span style="font-size:22px">Paramètres de Compte</span>
                                </v-flex>
                            </v-layout>
                        
                            <v-divider color="#008080"></v-divider>
                        
                            <v-layout align-start fluid fill-height mx-3 mt-3 column>
                                <v-flex mb-4>
                                    <span style="font-size:16px">Avatar</span>
                                </v-flex>
                                <v-flex mb-4> 
                                    <v-avatar size="170" tile>
                                        <v-img  src="https://cdn.pixabay.com/photo/2016/08/20/05/38/avatar-1606916_960_720.png">
                                            <v-layout row justify-end align-end fill-height>
                                            
                                                <v-tooltip color="rgb(0,128,128)" left>
                                                    <template v-slot:activator="{ on }">
                                                        <v-btn light v-on="on" icon><v-icon >fas fa-edit</v-icon></v-btn>
                                                    </template>
                                                    <span style="font-size:9px">NB : Taille max de l'image 8Mo</span>
                                                </v-tooltip>
                                            
                                            </v-layout>
                                        </v-img>
                                    </v-avatar>
                                </v-flex>
                            </v-layout>

                            <v-divider color="#008080"></v-divider>
                        
                            <v-layout column ma-3>
                                <v-flex mb-4>
                                    <span style="font-size:16px">Vos données personnelles</span>
                                </v-flex>
                                <v-layout column align-space-between fluid>
                                <v-flex mb-1> 
                                    <v-text-field
                                    color="#F5DCD7"
                                    v-model="oldPassword"
                                    name="oldpassword"
                                    label="Ancien mot de passe"
                                    type="password"
                                    required>
                                    </v-text-field> 
                                </v-flex>
                                <v-flex mb-1> 
                                    <v-text-field
                                    color="#F5DCD7"
                                    v-model="newPassword"
                                    name="newpassword"
                                    label="Nouveau mot de passe"
                                    type="password"
                                    required>
                                    </v-text-field> 
                                </v-flex>
                                <v-flex mb-5> 
                                    <v-text-field color="#F5DCD7"
                                    name="confpassword"
                                    v-model="confirmPassword"
                                    label="Confirmer votre nouveau mot de passe"
                                    type="password"
                                    required
                                    :rules="[comparePasswords]">
                                    </v-text-field> 
                                </v-flex>

                                <v-flex mb-1> 
                                    <v-text-field
                                    color="#F5DCD7"
                                    name="nickname"
                                    label="Nouveau Pseudo"
                                    >
                                    </v-text-field> 
                                </v-flex>
                            
                            </v-layout>
                            
                        </v-layout>
                            <v-divider color="#008080"></v-divider>
                        </v-layout>
                    </v-list>
                    <v-card-actions > 
                        <v-spacer></v-spacer>
                        <v-btn outline color="#008080"><span style="font-weight: bold">Valider</span><v-icon right>fas fa-check</v-icon></v-btn> 
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
export default {
    data () {
        return {
            newPassword:'',
            confirmPassword:'',
            oldPassword:''
        }
    },
    computed:{
        comparePasswords() {
            return this.newPassword !== this.confirmPassword ? "Reverifiez votre mot de passe svp" : ''
        }
    }
}
</script>


    
