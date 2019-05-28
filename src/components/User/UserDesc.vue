<template>
  <v-container>
    <v-layout align-center>
      <v-flex xs12 sm10 offset-sm1 md10 offset-md1 lg8 offset-lg2>
        <v-card dark>
          <v-list>
            <v-layout pa-3 column>
              <v-flex>
                <v-layout px-3 pb-3 align-center>
                  <v-flex align-center>
                      <v-img max-width="300px" :src="this.image"></v-img>
                  </v-flex>
                </v-layout>
                <span style="font-size:22px;font-weight:bold">{{this.pseudo}}</span>
              </v-flex>

              <v-divider color="#008080"></v-divider>
              <v-flex>
                <v-layout py-3 align-center justify-center fill-height row wrap>
                  <v-flex xs12 sm12 md8 lg5 xl4>
                    <v-list>
                      <v-container pb-2>
                        <v-flex style="font-size:16px">
                          <span
                            style="font-size:16px;font-weight:bold;color:#66b2b2"
                          > Nom : {{this.nom}}</span>
                        </v-flex>
                      </v-container>
                      <v-divider></v-divider>
                      <v-container pb-2>
                        <v-flex style="font-size:16px">
                          <span
                            style="font-size:16px;font-weight:bold;color:#66b2b2"
                          >Prénom : {{this.prenom}}</span>
                        </v-flex>
                      </v-container>
                      <v-divider></v-divider>
                      <v-container pb-2>
                        <v-flex style="font-size:16px">
                          <span
                            style="font-size:16px;font-weight:bold;color:#66b2b2"
                          >genre : {{this.genre}}</span>
                        </v-flex>
                      </v-container>
                      <v-divider></v-divider>
                      <v-container pb-2>
                        <v-flex style="font-size:16px">
                          <span
                            style="font-size:16px;font-weight:bold;color:#66b2b2"
                          >Date de naissance : {{this.dateNaissance}}</span>
                        </v-flex>
                      </v-container>
                      <v-divider></v-divider>
                      <v-container pb-2>
                        <v-flex style="font-size:16px">
                          <span
                            style="font-size:16px;font-weight:bold;color:#66b2b2"
                          >@ : {{this.email}}</span>
                        </v-flex>
                      </v-container>
                    </v-list>
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-divider color="#008080"></v-divider>
              <v-flex>
                <v-layout pa-3 ma-2>
                  <v-flex
                    style="font-size:16px;font-weight:bold;color:#66b2b2"
                  >Liste jeux : {{this.listeJeuxMod}}</v-flex>
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
export default {
  props: ["id"],
  data() {
    return {
      idd: this.id,
      user: null,
      pseudo: ""
    };
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
        alert("im here ");
        if (snapshot.exists()) {
          this.user = snapshot.val();
          this.pseudo = snapshot
            .child(this.id)
            .child("pseudo")
            .val();
          this.nom = snapshot.child(this.id).child("nom").val()
          this.prenom = snapshot.child(this.id).child("prenom").val()
          this.genre = snapshot.child(this.id).child("genre").val()
          this.dateNaissance = snapshot.child(this.id).child("dateNaissance").val()
          this.email = snapshot.child(this.id).child("email").val()
          this.listeJeux = snapshot.child(this.id).child("listeJeux").val()
          this.image = snapshot.child(this.id).child("image").val()


        } else {
          this.$router.push("/404");
        }
      });
  }
};
</script>
