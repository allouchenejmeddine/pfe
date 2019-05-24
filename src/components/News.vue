<!--toutes les nouveautés du jeu video (articles)-->
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
                    <span style="font-size:22px">News</span>
                  </v-flex>
                  <v-btn round to="/suggest_article">
                    <v-icon small left>fas fa-plus-circle</v-icon>Ajouter des articles
                  </v-btn>
                </v-layout>
              </v-flex>
              <v-divider color="#008080"></v-divider>
              <v-flex>
                <v-layout row wrap justify-start pa-3>
                  <v-flex
                    md12
                    xs12
                    sm12
                    pa-3
                    v-for="(item,i) in articlesChargedForALL"
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
export default {
  name: "",
  data() {
    return {};
  },
  computed: {
    articlesChargedForALL: function() {
      var all = this.$store.state.loadedAllArticles;
      return all.sort(function(a, b) {
        return a.dateSortie.localeCompare(b.Sortie);
      });
    }
  }
};
</script>