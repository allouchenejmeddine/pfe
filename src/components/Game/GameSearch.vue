<template>
<v-container>
        <div id="app">
            <div class="search-wrapper">
            <input type="text" v-model="search" placeholder="Search title.."/>
                <label>Search title:</label>
            </div>
            <v-card>
            <div class="wrapper">
                <div class="card" v-for="post in gamesCharged">
                     <v-card>
                         <v-card-title>
                            <a  target="_blank">
                            {{ post.nom }}
                            </a>
                         </v-card-title>
                     </v-card>
                </div>
            </div>
            </v-card>
        </div>
</v-container>
</template>

<script>

export default {
    data (){
        return {
            search: ''
        }
    
  },
  computed: {
    gamesCharged: function (){
            return this.$store.state.loadedGames.filter(post => {
        return post.nom.toLowerCase().includes(this.search.toLowerCase())
      })
        }
  }
}

</script>

