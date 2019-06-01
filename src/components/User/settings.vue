<template>
  <v-form v-model="valid">
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

                <v-layout align-center fluid fill-height mx-3 mt-3 column>
                  <v-flex mb-4>
                    <span style="font-size:16px">Avatar</span>
                  </v-flex>
                  <v-flex v-if="image == null" xs12 sm6 md8 mb-4>
                    <v-avatar size="200" tile>
                      <v-img ref="avatar" :src="getLogoFromStore()">
                        <v-layout row justify-end align-end fill-height>
                          <v-tooltip color="rgb(0,128,128)" left>
                            <template v-slot:activator="{ on }">
                              <v-btn @click="$refs.inputUpload.click()" v-on="on" icon>
                                <v-icon>fas fa-edit</v-icon>
                              </v-btn>
                            </template>
                            <span style="font-size:9px">NB : Taille max de l'image 8Mo</span>
                          </v-tooltip>
                        </v-layout>
                      </v-img>
                    </v-avatar>
                  </v-flex>
                  <v-flex v-else xs12 sm6 md8 mb-4>
                    <v-avatar size="200" tile>
                      <v-img :src="imageRefresh">
                        <v-layout row justify-end align-end fill-height>
                          <v-tooltip color="rgb(0,128,128)" left>
                            <template v-slot:activator="{ on }">
                              <v-btn @click="$refs.inputUpload.click()" v-on="on" icon>
                                <v-icon>fas fa-edit</v-icon>
                              </v-btn>
                            </template>
                            <span style="font-size:9px">NB : Taille max de l'image 8Mo</span>
                          </v-tooltip>
                        </v-layout>
                      </v-img>
                    </v-avatar>
                  </v-flex>
                  <input v-show="false" ref="inputUpload" type="file" @change="onFilePicked">
                </v-layout>

                <v-divider color="#008080"></v-divider>

                <v-layout column ma-3>
                  <v-flex mb-4>
                    <span style="font-size:16px" id="text">Vos données personnelles</span>
                  </v-flex>
                  <v-form ref="form">
                  <v-layout column align-space-between fluid>
                    <v-flex mb-1>
                      <v-text-field
                        color="#F5DCD7"
                        v-model="currentPassword"
                        name="currentpassword"
                        label="Ancien mot de passe (obligatoire)"
                        type="password"
                        :rules="passwordRules"
                        required
                      ></v-text-field>
                    </v-flex>
                    <v-flex mb-1>
                      <v-text-field
                        color="#F5DCD7"
                        v-model="newPassword"
                        name="newpassword"
                        label="Nouveau mot de passe"
                        type="password"
                      ></v-text-field>
                    </v-flex>
                    <v-flex mb-5>
                      <v-text-field
                        color="#F5DCD7"
                        name="confpassword"
                        v-model="confirmPassword"
                        label="Confirmer votre nouveau mot de passe"
                        type="password"
                        required
                        :rules="passwordConfirmationRules"
                      ></v-text-field>
                    </v-flex>

                    <v-flex mb-1>
                      <v-text-field
                        color="#F5DCD7"
                        name="nickname"
                        v-model="newPseudo"
                        label="Nouveau Pseudo"
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                  </v-form>
                </v-layout>
                
                <v-divider color="#008080"></v-divider>
              </v-layout>
            </v-list>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn outline @click="validate()" color="#008080">
                <span style="font-weight: bold">Valider</span>
                <v-icon right>fas fa-check</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>
<script>
import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'
import settings from "./settings";
import { store } from "../../store";
export default {
  data() {
    return {
      newPassword: "",
      confirmPassword: "",
      currentPassword: "",
      image: null,
      newPseudo: "",
      valid: true,
      passwordRules: [
        (v) => !!v || 'Ce champ est obligatoire',
        (v) => v.length > 6 || 'Votre mot de passe doit contenir 6 caractères minimum'
      ],
      passwordConfirmationRules: [
        (v) => (v.localeCompare(this.newPassword) == 0)  || 'Les mots de passes ne sont pas identiques'
      ]
    };
  },
  computed: {
    imageRefresh() {
      this.image=inputUpload
    }
  },
  watch: {
    image: function() {}
  },
  methods: {
    validate(){
      if(this.$refs.form.validate())
      {
        this.updateData();
      }
    },
    getLogoFromStore() {
      if(this.$store.state.user.image != null && this.$store.state.user.image != undefined && this.$store.state.user.image.toString().localeCompare("")!=0)
      {
        return this.$store.state.user.image;
      }
      else
      {
      return "https://firebasestorage.googleapis.com/v0/b/gpufinal.appspot.com/o/Portrait_placeholder.png?alt=media&token=49580b44-9483-4418-8c35-92fcd766e72d"
      }
    },
    onFilePicked(event) 
    {
      const files = event.target.files;
      let filename = files[0].name;
      if (filename.lastIndexOf(".") <= 0) {
        alert("Veuillez vérifier le type de votre fichier d'image"); 
      }
      else if ( (filename.lastIndexOf(".jpg")<= 0) 
          && (filename.lastIndexOf(".png")<= 0)  
          && (filename.lastIndexOf(".PNG")<= 0) 
          && (filename.lastIndexOf(".JPG")<= 0) 
          && (filename.lastIndexOf(".jpeg")<= 0) 
          && (filename.lastIndexOf(".JPEG")<= 0)){
        alert("Les types acceptés sont : .jpg , .jpeg et .png"); 
      }
      else{
        const fileReader = new FileReader();
        fileReader.addEventListener("load", () => {
          this.$refs.avatar.src = fileReader.result;
        });
        fileReader.readAsDataURL(files[0]);
        this.image = files[0];
        
      }
      
    },
    updateData() {
      if(this.newPseudo.localeCompare("") == 0)
      {
        this.newPseudo = this.$store.state.user.pseudo
      }

      if(this.newPassword.localeCompare("") == 0)
      {
        this.newPassword = this.currentPassword
      }

      this.$store.dispatch("editProfile", {
        currentPassword: this.currentPassword,
        newPassword: this.newPassword,
        newPseudo: this.newPseudo
      });
      this.$store.dispatch("updateUserAvatar", { image: this.image });
    },
    getAvatar() {}
  }
};
</script>


    
