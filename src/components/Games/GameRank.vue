<!--rang des jeux-->
<template>
    <v-card>
    <v-card-text>
        page classement a faire
    </v-card-text>
    </v-card>
</template>

<script>
export default {
    data (){
        return {
            
        }
    },
    computed :{
        gamesChargedForPC : function (){
            var games = this.$store.state.loadedGamesPC
            return games.sort((a,b)=>{
                return a.eval>b.eval
            })
        }
    }
}
</script>



