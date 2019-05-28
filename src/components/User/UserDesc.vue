<template>
  <v-container>
    <v-layout align-center>
      <v-flex xs12 sm10 offset-sm1 md10 offset-md1 lg8 offset-lg2>
        <v-card dark>
          <v-list>
            <v-layout pa-3 column>
              <v-flex>
                <v-layout px-3 pb-3>
                  <v-flex style="font-size:22px;font-weight:bold">{{nomJeux}}</v-flex>
                  <v-flex>
                    <v-avatar size="400">
                      <img src="https://vuetifyjs.com/apple-touch-icon-180x180.png">
                    </v-avatar>
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
                          >ID : mettre id de la session</span>
                        </v-flex>
                      </v-container>
                      <v-divider></v-divider>
                      <v-container pb-2>
                        <v-flex style="font-size:16px">
                          <span
                            style="font-size:16px;font-weight:bold;color:#66b2b2"
                          >nom : mettre nom</span>
                        </v-flex>
                      </v-container>
                      <v-divider></v-divider>
                      <v-container pb-2>
                        <v-flex style="font-size:16px">
                          <span
                            style="font-size:16px;font-weight:bold;color:#66b2b2"
                          >Prénom : mettre prénom</span>
                        </v-flex>
                      </v-container>
                      <v-divider></v-divider>
                      <v-container pb-2>
                        <v-flex style="font-size:16px">
                          <span
                            style="font-size:16px;font-weight:bold;color:#66b2b2"
                          >genre : mettre genre</span>
                        </v-flex>
                      </v-container>
                      <v-divider></v-divider>
                      <v-container pb-2>
                        <v-flex style="font-size:16px">
                          <span
                            style="font-size:16px;font-weight:bold;color:#66b2b2"
                          >Date de naissance : mettre date de naissance</span>
                        </v-flex>
                      </v-container>
                      <v-divider></v-divider>
                      <v-container pb-2>
                        <v-flex style="font-size:16px">
                          <span
                            style="font-size:16px;font-weight:bold;color:#66b2b2"
                          >@ : mettre e-mail</span>
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
                  >Liste jeux : mettre liste jeux</v-flex>
                </v-layout>
              </v-flex>

              <v-divider color="#008080"></v-divider>
              <v-flex>
                <v-layout pa-3 ma-2>
                  <v-flex
                    style="font-size:16px;font-weight:bold;color:#66b2b2"
                  >Liste d'envie : mettre lsite d'envie</v-flex>
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
      pseudo: "hhhh"
    };
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
        } else {
          this.$router.push("/404");
        }
      });
  }
};
</script>
