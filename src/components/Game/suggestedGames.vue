<template>
<v-container>
    <v-card>
        <div v-for="item in gamesCharged">
        {{ item.nom }}
        <v-card color="red">
            <v-card-text> {{item.description}} </v-card-text>
        </v-card>
        </div>
    </v-card>
</v-container>
</template>

<script>
export default {
    data () {
        return {
            

        }
    },
    computed: {
        gamesCharged: function (){
            return this.$store.state.loadedGames
        }
    }
    
}

</script>

