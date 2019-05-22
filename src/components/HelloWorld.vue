<template>
  <v-container fluid fill-height>
  <v-layout >
    <v-flex xs12 sm8 offset-sm2 md8 offset-md2>
    <v-card raised tile v-for="(item,i) in articlesChargedForALL"
               :key="i"
               :src="item">
      <v-card-title primary-title>
        {{item.titre}}  
      </v-card-title>
       <v-img :src="item.image"></v-img>
       <v-card-text>
          <v-layout column>
            <v-flex>
              {{item.resume}}
            </v-flex>             
          </v-layout>
       </v-card-text>
      <v-card-actions>
          <v-btn flat color="#008080" :href="item.page" >Lire</v-btn>
      </v-card-actions>
    </v-card>
    </v-flex>
  </v-layout>
  </v-container>
  
 
  </template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
  export default {
    
    data: () => ({
      
    }),
    computed :{
        articlesChargedForALL : function (){
            var all = this.$store.state.loadedAllArticles
            all = all.sort(function(a,b){return a.dateSortie.localeCompare(b.Sortie); })
            return all.slice(0,10);
        }
    }
  }
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
