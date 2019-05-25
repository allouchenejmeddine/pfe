<!--liste de tous les jeux PC-->
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
                    <span style="font-size:22px">Tout les jeux</span>
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
                    v-for="(item,i) in gamesChargedForALL"
                    :key="i"
                    :src="item"
                  >
                   
                      <v-card raised tile color="rgba(0, 128, 128,0.9)" :to="getSelectedGame(item.id,item.plateformeJeux)">
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
                      </v-card>
                    
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
  name: "",
  data() {
    return {
      url: "localhost:8081/NewGame",
      selectedGame: null
    };
  },
  computed: {
    gamesChargedForALL: function() {
      var all = this.$store.state.loadedGamesPC
        .concat(this.$store.state.loadedGamesPS)
        .concat(this.$store.state.loadedGamesXBOX)
        .concat(this.$store.state.loadedGamesSWITCH);

      return all.sort(function(a, b) {
        return a.nom.localeCompare(b.nom);
      }).slice(0,8);
    }
  },
  methods: {
    getSelectedGame(id, platform) {
      return "/Jeux_" + platform + "/" + id;
    }
  }
};
</script>
