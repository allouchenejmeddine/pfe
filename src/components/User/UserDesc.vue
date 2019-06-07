<template>
  <v-container>
    <v-layout align-center>
      <v-flex xs12 sm10 offset-sm1 md10 offset-md1 lg8 offset-lg2>
        <v-card dark>
          <v-list>
            <v-layout pa-3 column>
              <v-flex pa-3>
                <span style="font-size:22px;font-weight:bold">Profil de {{this.pseudo}}</span>
              </v-flex>
              <v-divider color="#008080"></v-divider>
              <v-flex>
                <v-layout py-3 align-center justify-center fill-height row wrap>
                  
                  <v-flex xs10 sm5 md5 lg5 xl4 >
                    <v-avatar size="200">
                      <v-img max-width="300px" :src="this.image"></v-img>
                    </v-avatar>
                  </v-flex>
               
                  <v-flex xs12 sm12 md8 lg5 xl4>
                    <v-list>
                      <v-container pb-2>
                        <v-flex style="font-size:16px">
                          <span><span
                            style="font-size:16px;font-weight:bold;color:#66b2b2"
                          > Nom : </span> {{this.nom}}</span>
                        </v-flex>
                      </v-container>
                      <v-divider></v-divider>
                      <v-container pb-2>
                        <v-flex style="font-size:16px">
                          <span><span
                            style="font-size:16px;font-weight:bold;color:#66b2b2"
                          >Prénom : </span> {{this.prenom}}</span>
                        </v-flex>
                      </v-container>
                      <v-divider></v-divider>
                      <v-container pb-2>
                        <v-flex style="font-size:16px">
                          <span><span
                            style="font-size:16px;font-weight:bold;color:#66b2b2"
                          >Sexe : </span><v-icon v-show="this.show">{{this.iconLogo}}</v-icon> {{this.genre}}</span>
                        </v-flex>
                      </v-container>
                      <v-divider></v-divider>
                      <v-container pb-2>
                        <v-flex style="font-size:16px">
                          <span><span
                            style="font-size:16px;font-weight:bold;color:#66b2b2"
                          >Date de naissance : </span>{{this.dateNaissance}}</span>
                        </v-flex>
                      </v-container>
                      <v-divider></v-divider>
                      <v-container pb-2>
                        <v-flex style="font-size:16px">
                          <span><span
                            style="font-size:16px;font-weight:bold;color:#66b2b2"
                          ><v-icon color='#66b2b2'>fas fa-envelope-open-text</v-icon> : </span>{{this.email}}</span>
                        </v-flex>
                      </v-container>
                    </v-list>
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-divider color="#008080"></v-divider>
              <v-flex pa-3>
                <span style="font-size:20px;font-weight:bold">Liste des jeux de {{this.pseudo}}</span>
              </v-flex>
              <v-flex>
                <v-layout>
                  <v-flex v-if="this.hasGame">
                    <v-layout row wrap justify-start pa-3>
                  <v-flex
                    md6
                    xs12
                    sm12
                    lg4
                    xl3
                    pa-3
                    v-for="(item,i) in this.listeJeuxCards"
                    :key="i"
                    :src="item"
                  >
                    <router-link :to="getSelectedGame(item.id,item.plateformeJeux)">
                      <v-card raised tile color="rgba(0, 128, 128,0.9)">
                        <v-img max-height="250" min-height="250" :src="item.image">
                          <v-layout>
                            <v-flex pa-2>
                              <v-card pa-4 color="rgba(0, 128, 128,0.9)">
                                <v-card-actions>
                                  <v-layout align-center justify-space-around>{{item.nom}}</v-layout>
                                </v-card-actions>
                              </v-card>
                            </v-flex>
                          </v-layout>
                        </v-img>

                        <v-card-text>
                          <span>Date de sortie : {{item.dateSortie}}</span>
                          <facebook :url="url" scale="1.2" class="right"></facebook>
                        </v-card-text>
                        <v-btn @click="remove(item.id)"><i class="fas fa-minus-circle"></i></v-btn>

                      </v-card>
                    </router-link>
                  </v-flex>
                </v-layout>
                  </v-flex>
                  <v-flex v-else align-center justify-center>
                    <v-layout row wrap justify-center pa-3>
                  <v-flex md3 pa-3>
                    <v-img
                      width="250px"
                      src="https://firebasestorage.googleapis.com/v0/b/gpufinal.appspot.com/o/nogames.png?alt=media&token=10a883a4-27b8-4890-93d4-acb0be28caa4"
                    ></v-img>
                  </v-flex>
                </v-layout>
                  </v-flex>
                </v-layout>
                
              </v-flex>

            
            </v-layout>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import firebase from "firebase/app";
import { Facebook } from "vue-socialmedia-share";
export default {
  components: {
    Facebook
  },
  props: ["id"],
  data() {
    return {
      idd: this.id,
      user: null,
      pseudo: "",
      iconLogo: null,
      show: false,
      nom: "Non Communiqué",
      prenom: "Non Communiqué",
      genre:"",
      email:"Non Communiqué",
      listeJeux: "",
      dateNaissance: "Non Communiqué",
      listeJeuxCards: [],
      url: "localhost:8081/Games",
      hasGame: true
    };
  },
  methods: {
    getSelectedGame(id, platform) {
      return "/Jeux_" + platform + "/" + id;
    },
    remove(id){
      firebase.database().ref('comptes/'+this.$store.state.user.id).child('listeJeux').once('value', function(snapshot) {        
      }).then((snap)=>{
        var liste = snap.val()

        var liste = liste.filter(function(value, index, arr){
            return value !== id;
        });
        firebase.database().ref('comptes/'+this.$store.state.user.id).update({listeJeux:liste})
        this.$store.state.user.listeJeux=liste
      }).catch((err)=>{
        alert(err)
      })
      
      
    },
    loadGameList(){
      var list = this.$store.state.loadedGames
      if(this.listeJeux != null)
      {
      var listejeu = this.listeJeux.toString().split(",")
      var finallist = []
      var i;
      var j;
      for (i = 0 ; i < listejeu.length; i++)
      {
        for (j = 0 ; j < list.length; j++){
            if(listejeu[i].localeCompare(list[j].id) == 0)
              {
                finallist.push(list[j]);
                break;
              }
            else if (listejeu[i].localeCompare("") == 0)
            {
              break;
            }
        }      
      }

      this.listeJeuxCards = finallist.sort(function(a, b) {return a.nom.localeCompare(b.nom);})
      }
      else
      {
        this.hasGame = false
        return null
      }
    }
  },
  computed : {
    listeJeuxMod(){
      return this.listeJeux+''
    }
  },
  created: function() {
    firebase
      .database()
      .ref("/comptes")
      .orderByChild("id")
      .equalTo(this.id)
      .once("value", snapshot => {
        if (snapshot.exists()) {
          this.user = snapshot.val();
          this.pseudo = snapshot
            .child(this.id)
            .child("pseudo")
            .val();
          this.nom = snapshot.child(this.id).child("nom").val()
          if(this.nom.localeCompare('') == 0 || this.nom == null)
          {
              this.nom = "Non Communiqué"
          }

          this.prenom = snapshot.child(this.id).child("prenom").val()
          if(this.prenom.localeCompare('') == 0 || this.prenom == null)
          {
                this.prenom = "Non Communiqué"
          }

          this.genre = snapshot.child(this.id).child("listeGenre").val()
          if(this.genre.localeCompare('') == 0 || this.genre == null)
          {
            this.show = false
            this.genre = "Neutre"
          }
          else if(this.genre.localeCompare('Homme') == 0){
            this.show = true
              this.iconLogo = "fas fa-mars"
          }
          else
          {
            this.show = true
            this.iconLogo = "fas fa-venus"
          }

          this.dateNaissance = snapshot.child(this.id).child("dateNaissance").val()
          if(this.dateNaissance.localeCompare('') == 0 || this.dateNaissance == null)
          {
              this.dateNaissance = "Non Communiqué"
          }

          this.email = snapshot.child(this.id).child("email").val()
          if(this.email.localeCompare('') == 0 || this.email == null)
          {
            this.email = "Non Communiqué"
          }

          this.listeJeux = snapshot.child(this.id).child("listeJeux").val()
          this.image = snapshot.child(this.id).child("image").val()
          if(this.image==null)
          {
            this.image = "https://firebasestorage.googleapis.com/v0/b/gpufinal.appspot.com/o/Portrait_placeholder.png?alt=media&token=49580b44-9483-4418-8c35-92fcd766e72d"
          }

          document.title = "Profil de "+this.pseudo+" - Game Player Union"
          this.loadGameList();

        } else {
          this.$router.push("/404");
        }
      });
  }
};
</script>
