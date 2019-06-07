<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md6>
        <v-card raised tile v-for="(item,i) in articlesChargedForALL" :key="i" :src="item" >
          <v-card-title primary-title>{{item.titre}}</v-card-title>
          <v-img :src="item.image" max-height="500"></v-img>
          <v-card-text>
            <v-layout column>
              <v-flex>{{item.resume}}</v-flex>
            </v-layout>
            <facebook :url="url+'/'+item.id" scale="1.1" class="right"></facebook>
          </v-card-text>
          <v-card-actions>
            <v-btn flat color="#008080" :to="getSelectedArticle(item.id)">Lire</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { Facebook } from "vue-socialmedia-share";
import firebase from "firebase/app";
import "firebase/auth";
export default {
  components : {
    Facebook
  },
  data: () => ({
    url: "https://www.gameplayerunion.com/Articles"
  }),
  computed: {
    articlesChargedForALL: function() {
      //var all = this.$store.state.loadedArticles;
      //return all.slice(0, 5);
      return this.$store.state.loadedArticles;
    }
  },
  methods: {
    getSelectedArticle(id) {
      return "/Articles/" + id;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
