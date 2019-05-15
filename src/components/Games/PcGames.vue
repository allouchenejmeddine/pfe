<!--liste de tous les jeux PC-->
<template>
<v-flex>
<v-flex v-for="(item,i) in gamesChargedForPC" :key="i" :src="item" >
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
        gamesChargedForPC : function (){
            return this.$store.state.loadedGamesPC
        }
    }
}
</script>
