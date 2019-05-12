<template>
  <v-container>
    <!--
    <v-card>
        <div v-for="item in gamesCharged">
        {{ item.nom }}
        <v-card>
            <v-card-text> {{item.description}}  </v-card-text>
            <v-card-text> {{item.image}} </v-card-text>
        </v-card>
        <v-flex>
            <img :src="item.image" height="100"></v-img>
        </v-flex>
        </div>
    </v-card>
    -->
    <v-layout>
      <v-flex xs12 sm8 offset-sm2 md8 offset-md2>
        <!--affiche les cards des jeux en attente de validation-->
        <v-card raised tile v-for="(item,i) in games" :key="i" :src="item">
          <v-card-title primary-title>{{item.title}}</v-card-title>
          <v-img
            :src="item.image"
          ></v-img>
          <v-card-actions>
            <!-- affiche les details du jeu-->
            <v-btn flat color="orange" :href="item.page">inspecter</v-btn>
            <!--acceptation du jeu et deplacementvers la liste des jeux confirmé-->
            <v-btn flat icon><v-icon color="green" @click="moveToConfirmedGames()">fas fa-check</v-icon></v-btn>
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
    
    data: () => ({
    //tableau temporaire des jeux (a changer par la suite avec la liste des jeux sugerer)
      games: [
        {
          title: 'Binding of isaac',
          description: 'Nunc vero inanes flatus quorundam vile esse quicquid extra urbis pomerium nascitur aestimant praeter orbos et caelibes, nec credi potest qua obsequiorum diversitate coluntur homines sine liberis Romae.',
          image: 'https://steamcdn-a.akamaihd.net/steam/apps/113200/header.jpg?t=1447354527',
        },
        {
          title: 'Rocket league',
          description: 'Nunc vero inanes flatus quorundam vile esse quicquid extra urbis pomerium nascitur aestimant praeter orbos et caelibes, nec credi potest qua obsequiorum diversitate coluntur homines sine liberis Romae.',
          image: 'https://hb.imgix.net/ae475dd426714e9e7857b28f92009011d16ac98e.jpg?auto=compress,format&fit=crop&h=353&w=616&s=ff11c567c3750076b8624c1f22a83547'
          },
        { 
          title: 'CS GO',
          text: 'Nunc vero inanes flatus quorundam vile esse quicquid extra urbis pomerium nascitur aestimant praeter orbos et caelibes, nec credi potest qua obsequiorum diversitate coluntur homines sine liberis Romae.',
          image: 'http://lesplayersdudimanche.com/wp-content/uploads/2017/02/Dust-2-810x400.jpg', 
        }
      ]
    }),
    methods: {
    // Method to move game from Jeux suggeres to Jeux after being approval
    moveToConfirmedGames() {   
        let oldRef= firebase.database().ref('/jeuxSuggeres').child('-LdN_7LEjfM0poVw5tHB')
        let newRef=firebase.database().ref('/jeux').child('-LdN_7LEjfM0poVw5tHB')
     return new Promise((resolve, reject) => {
          oldRef.once('value').then(snap => {
               return newRef.set(snap.val());
          }).then(() => {
               return oldRef.set(null);
          }).then(() => {
               console.log('Done!');
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

