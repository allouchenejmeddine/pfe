<template>
  <v-container>
    <v-layout fluid>
      <v-flex xs12 sm8 offset-sm2 md8 offset-md2>
        <v-card dark fill-height>
          <v-list>
            <v-layout column ma-3>
              <v-flex>
                <v-layout align-center fluid fill-height mx-3 mt-4>
                  <v-flex mb-4>
                    <span style="font-size:22px">Articles suggerés</span>
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-divider color="#008080"></v-divider>
              <!--affiche les cards des jeux en attente de validation-->
              <v-flex v-if="!testarticleCharged">
                <v-layout row wrap justify-start pa-3>
                  <v-flex
                    md12
                    xs12
                    sm12
                    pa-3
                    v-for="(item,i) in articleCharged"
                    :key="i"
                    :src="item"
                  >
                    <v-card light raised tile>
                      <v-layout row wrap fill-height align-start>
                        <v-flex md12 xs12 sm12 lg5>
                          <v-img max-height="250" :src="item.image">
                            <v-layout>
                              <v-flex pa-2>
                                <v-card pa-4 color="rgba(0, 128, 128,0.8)">
                                  <v-card-title>
                                    <v-layout align-center justify-space-around>{{item.titre}}</v-layout>
                                  </v-card-title>
                                </v-card>
                              </v-flex>
                            </v-layout>
                          </v-img>
                        </v-flex>
                        <v-flex>
                          <v-card-text>
                            <v-layout column>
                              <v-flex>{{item.resume}}</v-flex>
                              <v-flex>
                                <span>Rédigé le : {{item.dateSortie}}</span>
                              </v-flex>
                            </v-layout>
                          </v-card-text>
                        </v-flex>
                      </v-layout>

                      <v-card-actions>
                        <v-layout align-center justify-space-around>
                          <!-- affiche les details du jeu-->
                          <v-btn flat icon :href="item.page">
                            <v-icon color="#008080">fas fa-eye</v-icon>
                          </v-btn>
                          <!--acceptation du jeu et deplacementvers la liste des jeux confirmé-->
                          <v-btn flat icon>
                            <v-icon
                              color="green"
                              @click="moveToConfirmedArticles(item.id)"
                            >fas fa-check</v-icon>
                          </v-btn>
                          <!--suppression du jeu car non accepter(rajouter une confirmation avant la suppression-->
                          <v-btn flat icon>
                            <v-icon color="red">fas fa-times</v-icon>
                          </v-btn>
                        </v-layout>
                      </v-card-actions>
                    </v-card>
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex v-else>
                <v-layout row wrap justify-center pa-3>
                  <v-flex md3 pa-3>
                    <v-img
                      width="250px"
                      src="https://firebasestorage.googleapis.com/v0/b/gpufinal.appspot.com/o/nosuggestion.png?alt=media&token=0d6d051c-73e1-4974-8581-1b319bf26e1d"
                    ></v-img>
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
import firebase from "firebase";
export default {
  data() {
    return {};
  },
  computed: {
    articleCharged: function() {
      return this.$store.state.loadedArticles;
    },
    testarticleCharged: function() {
      return this.$store.state.loadedArticles.length == 0;
    }
  },
  methods: {
    // Method to move article from Articles suggeres to Articles after being approved
    moveToConfirmedArticles(articleId) {
      let oldRef = firebase
        .database()
        .ref("/ArticlesProposes/")
        .child(articleId);
      let newRef = firebase
        .database()
        .ref("/articles/")
        .child(articleId);
      alert(articleId);
      return new Promise((resolve, reject) => {
        oldRef
          .once("value")
          .then(snap => {
            return newRef.set(snap.val());
          })
          .then(() => {
            return oldRef.set(null);
          })
          .then(() => {
            console.log("Done!");
            location.reload();
            resolve();
          })
          .catch(err => {
            console.log(err.message);
            reject();
          });
      });
    }
  }
};
</script>

