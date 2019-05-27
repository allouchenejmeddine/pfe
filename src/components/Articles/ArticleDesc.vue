<template>
  <v-container>
    <v-layout align-center>
      <v-flex xs12 sm10 offset-sm1 md10 offset-md1 lg8 offset-lg2>
        <v-card dark>
          <v-list>
            <v-layout pa-3 column>
              <v-flex>
                <v-layout px-3 pb-3>
                  <v-flex style="font-size:22px;font-weight:bold">{{titre}}</v-flex>
                </v-layout>
              </v-flex>
              <v-divider color="#008080"></v-divider>
              <v-flex>
                <v-layout py-3 align-center justify-center fill-height row wrap>
                  <v-flex xs11 sm12 md8 lg6 xl6 pr-5>
                    <v-layout column align-center justify-center fill-height>
                      <v-flex pb-1 xs12 sm8 md6 lg12 xl12>
                        <v-card>
                          <v-img :lazy-src="simple" min-width="200" :src="logo"></v-img>
                        </v-card>
                      </v-flex>
                      <v-flex>
                        <v-layout align-center justify-center>
                            <v-flex>
                                <span class="font-weight-thin font-italic caption">Rédigé le : {{dateSortie}} par </span><v-btn depressed flat small fab  :to="{ path: '/user/'+this.redacteurId }">{{this.redacteur}}</v-btn>
                            </v-flex>
                        </v-layout>
                        </v-flex>
                    </v-layout>
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-divider color="#008080"></v-divider>
              <v-layout pa-3 ma-4 align-center justify-center>
                <v-flex xl6>
                  <span class="font-weight-thin font-italic">{{resume}}</span>
                </v-flex>
              </v-layout>
              <v-divider color="#008080"></v-divider>
              <v-layout pa-3 align-center justify-center>
                <v-flex xl6>
                  <span id="desc">{{corps}}</span>
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
import firebase from 'firebase/app'
export default {
  props: ["id"],
  data() {
    return {
      
      articles: [],
      article: [],
      titre: "",
      dateSortie: "",
      resume: "",
      corps: "",
      redacteur: "",
      redacteurId:'',
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
    let articleId = this.idd;
    this.articles = this.store.state.loadedAllArticles
    this.article = this.articles.find(function(element) {
      return element.id === articleId;
    });
    if (this.articles != null && this.articles != undefined) {
    }
    if (this.article != null && this.article != undefined) {
    }
    this.redacteurId = this.article.suggestedFrom;
    firebase.database().ref('/comptes').orderByChild("id").equalTo(this.redacteurId).once("value",snapshot => {
            if (snapshot.exists()){
                this.redacteur=snapshot.child(this.redacteurId).child('pseudo').val()
            }
            else{
                this.redacteur="inconnu"
            }
            })
    this.titre = this.article.titre;
    this.resume = this.article.resume;
    this.corps = this.article.corps;
    this.logo = this.article.image;
    this.dateSortie = this.article.dateSortie;

  },
  computed: {
    getarticle() {}
  },
  watch: {
    logo: function() {}
  },
  methods: {
    loadarticles: function() {
      var promise1 = new Promise(function(resolve, reject) {
        setTimeout(function() {
          resolve(this.store.state.loadedAllArticles);
        }, 0);
      });
    },
    changetitle() {
      document.title = this.titre + " - Game Players Union";
    }
  },
  mounted: function() {
    this.$nextTick(function() {
      if (this.article == undefined) {
        this.$router.push("/404");
      }
    }),
      this.changetitle();
  }
};
</script>
