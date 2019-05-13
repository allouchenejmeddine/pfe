<template>
  <v-container>
    <v-layout>
      <v-flex xs12 sm8 offset-sm2 md8 offset-md2>
        <!--affiche les cards des jeux en attente de validation-->
        <v-card raised tile v-for="(item,i) in gamesChargedForPc" :key="i" :src="item">
          <v-card-title primary-title>{{item.nom}}</v-card-title>
          <v-img
            :src="item.image"
          ></v-img>
          <v-card-actions>
            <!-- affiche les details du jeu-->
            <v-btn flat color="orange" :href="item.page">inspecter</v-btn>
            <!--acceptation du jeu et deplacementvers la liste des jeux confirmé-->
            <v-btn flat icon><v-icon color="green" @click="moveToConfirmedGames(item.id)">fas fa-check</v-icon></v-btn>
            <!--suppression du jeu car non accepter(rajouter une confirmation avant la suppression-->
            <v-btn flat icon><v-icon color="red">fas fa-times</v-icon></v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import firebase from 'firebase'
  export default {
    data () { 
      return {        
        
      }
    
    },
    computed : {
      gamesChargedForPc : function (){
        return this.$store.state.loadedSuggestedGamesPC
      },
      gamesChargedForPS : function (){
        return this.$store.state.loadedSuggestedGamesPS
      },
      gamesChargedForXBOX : function (){
        return this.$store.state.loadedSuggestedGamesXBOX
      },
      gamesChargedForSWITCH : function (){
        return this.$store.state.loadedSuggestedGamesSWITCH
      }
    },
    methods: {
    // Method to move game from Jeux suggeres to Jeux after being approved
    moveToConfirmedGames(gameId) {   
      let oldRef= firebase.database().ref('/jeuxSuggeres').child(gameId)
      let newRef=firebase.database().ref('/jeux').child(gameId)
      return new Promise((resolve, reject) => {
          oldRef.once('value').then(snap => {
               return newRef.set(snap.val());
          }).then(() => {
               return oldRef.set(null);
          }).then(() => {
               console.log('Done!');
               this.$router.push('/suggested_games')
               resolve();
          }).catch(err => {
               console.log(err.message);
               reject();
          });
        })
     }
    }
  }
</script>

