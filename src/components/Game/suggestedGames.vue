<template>
<v-container>
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
        <v-btn @click="moveToConfirmedGames()">
            move
        </v-btn>
    </v-card>
</v-container>
</template>

<script>
import firebase from 'firebase'
export default {
    data () {
        return {
            

        }
    },
    computed: {
        gamesCharged: function (){
            return this.$store.state.loadedGames
        }
    },
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

