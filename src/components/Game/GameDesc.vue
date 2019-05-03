<template>
    <v-container>
        <v-layout align-center>
            <v-flex xs12 sm10 offset-sm1 md10 offset-md1 lg8 offset-lg2>
                <v-card dark>
                    <v-list>
                        <v-container>
                            <v-layout px-3 pb-3>
                                <span style="font-size:22px">Nom du jeux</span>
                            </v-layout>
                            <v-divider color="#008080"></v-divider>
                            <v-layout py-3 align-center justify-center fill-height row wrap>
                                <v-flex xs12 sm12 md8 lg6 xl3 pr-5>
                                    <v-layout column align-center justify-center fill-height>
                                        <v-flex pb-1 xs12 sm8 md5 lg4 xl3>
                                            <img src="https://i.pinimg.com/236x/05/59/e6/0559e631b718278eb9f42ce193350261--games-games-games-games-for-pc.jpg"/>
                                        </v-flex>
                                        <v-flex xs12 sm12 md8 lg4 xl3 pb-2>
                                            <v-rating color="#008080" 
                                                background-color="#008080"
                                                empty-icon="far fa-star"
                                                half-icon="fas fa-star-half-alt"
                                                full-icon="fas fa-star"
                                                half-increments
                                                hover
                                                small></v-rating>
                                        </v-flex>
                                    </v-layout>
                                </v-flex>
                                <v-flex xs12 sm12 md8 lg5 xl4>
                                        <v-list>
                                            <v-container pa-3>
                                                <span style="font-size:16px">Date de Sortie :<p>aaaaaaaaaa</p></span>
                                            </v-container>
                                            <v-divider></v-divider>
                                            <v-container pa-3>
                                                <span style="font-size:16px">Développeur : <p>aaaaaaaaaa</p></span>
                                            </v-container>
                                            <v-divider></v-divider>
                                            <v-container pa-3>
                                                <span style="font-size:16px">Genre : <p>aaaaaaaaaa</p></span>
                                            </v-container>
                                            <v-divider></v-divider>
                                            <v-container pa-3>
                                                <span style="font-size:16px">Moteur Graphique :<p>aaaaaaaaaa</p></span>
                                            </v-container>
                                        </v-list>
                                </v-flex>
                            </v-layout>
                            <v-divider color="#008080"></v-divider>
                        </v-container>
                    </v-list>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
  export default {
    
  }
</script>
