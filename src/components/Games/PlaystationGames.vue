<!--liste de tous les jeux PS-->
<template>
  <v-container>
    <v-layout fluid>
      <v-flex xs12 sm8 offset-sm2 md8 offset-md2>
        <v-card dark fill-height>
          <v-list>
            <v-layout column ma-3>
              <v-flex>
                <v-layout align-center row wrap fluid fill-height mx-3 mt-4>
                  <v-flex mb-4>
                    <span style="font-size:22px">Jeux PS</span>
                  </v-flex>
                  <v-btn round to="/suggest_game">
                    <v-icon small left>fas fa-plus-circle</v-icon>Ajouter des jeux
                  </v-btn>
                </v-layout>
              </v-flex>
              <v-divider color="#008080"></v-divider>
              <v-flex>
                <v-layout row wrap justify-start pa-3>
                  <v-flex
                    md6
                    xs12
                    sm12
                    lg4
                    xl3
                    pa-3
                    v-for="(item,i) in gamesChargedForPS"
                    :key="i"
                    :src="item"
                  >
                    <router-link :to="getSelectedGame(item.id)">
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
                          <facebook :url="url" scale="1.1" class="right"></facebook>
                        </v-card-text>
                      </v-card>
                    </router-link>
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
import { Facebook } from "vue-socialmedia-share";
export default {
  components: {
    Facebook
  },
  data() {
    return {
      url: "https://www.gameplayerunion.com/PsGames"
    };
  },
  computed: {
    gamesChargedForPS: function() {
      return this.$store.state.loadedGamesPS;
    }
  },
  methods: {
    getSelectedGame(id) {
      return "/Game_PS/" + id;
    }
  }
};
</script>
