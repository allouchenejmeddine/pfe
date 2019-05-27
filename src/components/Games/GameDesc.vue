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
                </v-layout>
                <v-btn round  @click="addGameToUserList()">
                  <v-icon small left>fas fa-plus-circle</v-icon>Ajouter a ma liste
                </v-btn>
                <v-alert
                  :value="gamealert"
                  type="success"
                  transition="scale-transition"
                  style="border:5px solid #008080;border-radius:20px;-moz-border-radius:20px;-webkit-border-radius:20px;"
                >le jeu a bien été ajouter a votre liste :)</v-alert>
              </v-flex>

              <v-divider color="#008080"></v-divider>
              <v-flex>
                <v-layout py-3 align-center justify-center fill-height row wrap>
                  <v-flex xs11 sm12 md8 lg6 xl3 pr-5>
                    <v-layout column align-center justify-center fill-height>
                      <v-flex pb-1 xs12 sm8 md5 lg4 xl3>
                        <v-img
                          :lazy-src="this.simple"
                          v-model="logo"
                          height="250px"
                          width="200px"
                          :src="this.logo"
                        ></v-img>
                      </v-flex>

                      <v-layout row>
                        <v-flex grow pa-1>
                          <v-rating
                            v-model="rating"
                            color="#008080"
                            background-color="#008080"
                            empty-icon="far fa-star"
                            half-icon="fas fa-star-half-alt"
                            full-icon="fas fa-star"
                            half-increments
                            hover
                            small
                          ></v-rating>
                        </v-flex>
                        <v-flex shrink pa-1>
                          <v-btn icon @click="alert=!alert,showrating()">
                            <v-icon left color="green">fas fa-check-circle</v-icon>
                          </v-btn>
                        </v-flex>
                      </v-layout>

                      <v-alert
                        :value="alert"
                        type="success"
                        transition="scale-transition"
                        style="border:5px solid #008080;border-radius:20px;-moz-border-radius:20px;-webkit-border-radius:20px;"
                      >Votre vote a bien été prit en compte :)</v-alert>
                    </v-layout>
                  </v-flex>
                  <v-flex xs12 sm12 md8 lg5 xl4>
                    <v-list>
                      <v-container pb-2>
                        <v-flex style="font-size:16px">
                          <span
                            style="font-size:16px;font-weight:bold;color:#66b2b2"
                          >Date de Sortie :</span>
                          {{dateSortie}}
                        </v-flex>
                      </v-container>
                      <v-divider></v-divider>
                      <v-container pb-2>
                        <v-flex style="font-size:16px">
                          <span style="font-size:16px;font-weight:bold;color:#66b2b2">Développeur :</span>
                          {{developpeur}}
                        </v-flex>
                      </v-container>
                      <v-divider></v-divider>
                      <v-container pb-2>
                        <v-flex style="font-size:16px">
                          <span style="font-size:16px;font-weight:bold;color:#66b2b2">Genre :</span>
                          {{genre}}
                        </v-flex>
                      </v-container>
                      <v-divider></v-divider>
                      <v-container pb-1>
                        <v-flex style="font-size:16px">
                          <span
                            style="font-size:16px;font-weight:bold;color:#66b2b2"
                          >Moteur Graphique :</span>
                          {{moteurGraphique}}
                        </v-flex>
                      </v-container>
                      <v-divider></v-divider>
                      <v-container pb-1>
                        <v-flex style="font-size:16px">
                          <span style="font-size:16px;font-weight:bold;color:#66b2b2">Plateforme :</span>
                          {{plateforme}}
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
                  >Configuration minimale :</v-flex>
                </v-layout>
              </v-flex>
              <v-layout pa-3 mb-4 align-center justify-center>
                <v-flex xl6>
                  <span id="config">{{configuration}}</span>
                </v-flex>
              </v-layout>
              <v-divider color="#008080"></v-divider>
              <v-flex>
                <v-layout pa-3 ma-2>
                  <v-flex style="font-size:16px;font-weight:bold;color:#66b2b2">Description :</v-flex>
                </v-layout>
                <!--                             <v-btn @click="getGameFromStore">valider</v-btn>
                -->
              </v-flex>
              <v-layout pa-3 align-center justify-center>
                <v-flex xl6>
                  <span id="desc">{{description}}</span>
                </v-flex>
              </v-layout>
            </v-layout>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { store } from "../../store";
export default {
  props: ["id"],
  data() {
    return {
      rating: 2,
      //props:["id"],
      games: [],
      game: [],
      nomJeux: "",
      dateSortie: "",
      developpeur: "",
      configuration: "",
      moteurGraphique: "",
      description: "",
      genre: "",
      plateforme: "",
      idd: this.id,
      logo: null,
      simple: "http://data-cache.abuledu.org/1024/carre-blanc-50218a31.jpg",
      store,
      alert: false,
      gamealert: false
    };
  },
  mounted: function() {
    this.writeDesc();
  },
  created: function() {
    let gameId = this.idd;
    this.games = this.store.state.loadedAllGames;
    this.game = this.games.find(function(element) {
      return element.id === gameId;
    });
    if (this.games != null && this.games != undefined) {
    }
    if (this.game != null && this.game != undefined) {
    }

    this.nomJeux = this.game.nom;
    this.developpeur = this.game.developpeur;
    this.genre = this.game.genreJeux;
    this.moteurGraphique = this.game.moteurGraph;
    this.plateforme = this.game.plateformeJeux;
    this.configuration = this.game.configuration;
    this.description = this.game.description;
    this.logo = this.game.image;
    this.rating = this.game.eval;
    this.dateSortie = this.game.dateSortie;

    //alert(this.logo)
  },
  computed: {
    getGame() {}
  },
  watch: {
    rating: function() {
      //addRating()
    },
    logo: function() {}
  },
  methods: {
    addRating(newRating, gameID) {
      this.$store.dispatch("addRatingToGame", {
        newRating: this.rating,
        gameId: this.idd,
        plateformeJeux: this.plateforme
      });
    },
    showrating() {
      this.addRating(this.rating, this.idd);
    },
    loadGames: function() {
      var promise1 = new Promise(function(resolve, reject) {
        setTimeout(function() {
          resolve(this.$store.state.loadedAllGames);
        }, 0);
      });
    },
    changetitle() {
      document.title = this.nomJeux + " - Game Players Union";
    },
    addGameToUserList(){
      let bool 
      this.$store.dispatch("addGameToUserList" , {gameId: this.idd, gameName:this.nomJeux, plateforme: this.plateforme}).then((result)=>{
        if(result ===1){
          this.gamealert=!this.gamealert
        }
        else{
          alert('Le jeux existe dans votre liste')
        }
      })
      

    }
  },
  mounted: function() {
    this.$nextTick(function() {
      if (this.game == undefined) {
        this.$router.push("/404");
      }
    }),
      this.changetitle();
  }
};
</script>
