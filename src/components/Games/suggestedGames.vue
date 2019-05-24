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
                    <span style="font-size:22px">Jeux PC</span>
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-divider color="#008080"></v-divider>
              <!--affiche les cards des jeux en attente de validation-->
              <v-flex v-if="!testgamesChargedForPC">
                <v-layout row wrap justify-start pa-3>
                  <v-flex
                    md3
                    xs12
                    sm8
                    pa-3
                    v-for="(item,i) in gamesChargedForPc"
                    :key="i"
                    :src="item"
                  >
                    <v-card light raised tile>
                      <v-card-title primary-title>{{item.nom}}</v-card-title>
                      <v-img max-height="250" :src="item.image"></v-img>
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
                              @click="moveToConfirmedGames(item.id,'PC')"
                            >fas fa-check</v-icon>
                          </v-btn>
                          <!--suppression du jeu car non accepter(rajouter une confirmation avant la suppression-->
                          <v-btn @click="rejectGame(item.id,'PC')" flat icon>
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

              <v-flex>
                <v-layout align-center fluid fill-height mx-3 mt-4>
                  <v-flex mb-4>
                    <span style="font-size:22px">Jeux PS</span>
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-divider color="#008080"></v-divider>
              <!--affiche les cards des jeux en attente de validation-->
              <v-flex v-if="!testgamesChargedForPS">
                <v-layout row wrap justify-start pa-3>
                  <v-flex
                    md6
                    xs12
                    sm6
                    lg4
                    xl3
                    pa-3
                    v-for="(item,i) in gamesChargedForPS"
                    :key="i"
                    :src="item"
                  >
                    <v-card light raised tile>
                      <v-card-title primary-title>{{item.nom}}</v-card-title>
                      <v-img max-height="250" :src="item.image"></v-img>
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
                              @click="moveToConfirmedGames(item.id,'PS')"
                            >fas fa-check</v-icon>
                          </v-btn>
                          <!--suppression du jeu car non accepter(rajouter une confirmation avant la suppression-->
                          <v-btn @click="rejectGame(item.id,'PS')" flat icon>
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
                  <v-flex md6 xs12 sm6 lg4 xl3 pa-3>
                    <v-img
                      width="250px"
                      src="https://firebasestorage.googleapis.com/v0/b/gpufinal.appspot.com/o/nosuggestion.png?alt=media&token=0d6d051c-73e1-4974-8581-1b319bf26e1d"
                    ></v-img>
                  </v-flex>
                </v-layout>
              </v-flex>

              <v-flex>
                <v-layout align-center fluid fill-height mx-3 mt-4>
                  <v-flex mb-4>
                    <span style="font-size:22px">Jeux Xbox</span>
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-divider color="#008080"></v-divider>
              <!--affiche les cards des jeux en attente de validation-->
              <v-flex v-if="!testgamesChargedForXBOX">
                <v-layout row wrap justify-start pa-3>
                  <v-flex
                    md6
                    xs12
                    sm6
                    lg4
                    xl3
                    pa-3
                    v-for="(item,i) in gamesChargedForXBOX"
                    :key="i"
                    :src="item"
                  >
                    <v-card light raised tile>
                      <v-card-title primary-title>{{item.nom}}</v-card-title>
                      <v-img max-height="250" :src="item.image"></v-img>
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
                              @click="moveToConfirmedGames(item.id,'XBOX')"
                            >fas fa-check</v-icon>
                          </v-btn>
                          <!--suppression du jeu car non accepter(rajouter une confirmation avant la suppression-->
                          <v-btn @click="rejectGame(item.id,'XBOX')" flat icon>
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

              <v-flex>
                <v-layout align-center fluid fill-height mx-3 mt-4>
                  <v-flex mb-4>
                    <span style="font-size:22px" id="testmsg">Jeux Switch</span>
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-divider color="#008080"></v-divider>
              <!--affiche les cards des jeux en attente de validation-->
              <v-flex v-if="!testgamesChargedForSWITCH">
                <v-layout row wrap justify-start pa-3>
                  <v-flex
                    md3
                    xs12
                    sm8
                    pa-3
                    v-for="(item,i) in gamesChargedForSWITCH"
                    :key="i"
                    :src="item"
                  >
                    <v-card light raised tile>
                      <v-card-title primary-title>{{item.nom}}</v-card-title>
                      <v-img max-height="250" :src="item.image"></v-img>
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
                              @click="moveToConfirmedGames(item.id,'SWITCH')"
                            >fas fa-check</v-icon>
                          </v-btn>
                          <!--suppression du jeu car non accepter(rajouter une confirmation avant la suppression-->
                          <v-btn @click="rejectGame(item.id,'SWITCH')" flat icon>
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
    gamesChargedForPc: function() {
      return this.$store.state.loadedSuggestedGamesPC;
    },
    gamesChargedForPS: function() {
      return this.$store.state.loadedSuggestedGamesPS;
    },
    gamesChargedForXBOX: function() {
      return this.$store.state.loadedSuggestedGamesXBOX;
    },
    gamesChargedForSWITCH: function() {
      return this.$store.state.loadedSuggestedGamesSWITCH;
    },
    testgamesChargedForSWITCH: function() {
      return this.$store.state.loadedSuggestedGamesSWITCH.length == 0;
    },
    testgamesChargedForPC: function() {
      return this.$store.state.loadedSuggestedGamesPC.length == 0;
    },
    testgamesChargedForXBOX: function() {
      return this.$store.state.loadedSuggestedGamesXBOX.length == 0;
    },
    testgamesChargedForPS: function() {
      return this.$store.state.loadedSuggestedGamesPS.length == 0;
    }
  },
  methods: {
    // Method to move game from Jeux suggeres to Jeux after being approved
    moveToConfirmedGames(gameId, src) {
      let oldRef = firebase
        .database()
        .ref("/JeuxSuggeres/" + src)
        .child(gameId);
      let newRef = firebase
        .database()
        .ref("/jeux/" + src)
        .child(gameId);
      alert(gameId);
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
    },
    rejectGame(gameId, src) {
      let ref = firebase
        .database()
        .ref("/JeuxSuggeres/" + src)
        .child(gameId)
        .remove()
        .catch(err => {
          console.log(err);
        });
      location.reload();
    }
  }
};
</script>

