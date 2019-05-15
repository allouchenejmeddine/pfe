<!--liste de tous les jeux PC-->
<template>
<v-flex>
<v-flex v-for="(item,i) in gamesChargedForALL" :key="i" :src="item" >
    <v-card>
    <v-card-text>
        {{item.nom}}
    </v-card-text>
    </v-card>
</v-flex>
</v-flex>
</template>
<script>
export default {
    data (){
        return {

        }
    },
    computed :{
        gamesChargedForALL : function (){
            return this.$store.state.loadedGamesPC
          .concat(this.$store.state.loadedGamesPS)
          .concat(this.$store.state.loadedGamesXBOX)
          .concat(this.$store.state.loadedGamesSWITCH)
        }
    }
}
</script>
