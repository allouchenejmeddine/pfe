<template>
    <v-container>
        <v-layout align-center>
            <v-flex xs12 sm10 offset-sm1 md10 offset-md1 lg8 offset-lg2>
                <v-card dark>
                    <v-list>
                        <v-layout pa-3 column>
                            <v-flex>
                            <v-layout px-3 pb-3>
                                <span style="font-size:22px">Nom du jeux</span>
                            </v-layout>
                            </v-flex>
                            <v-divider color="#008080"></v-divider>
                            <v-flex>
                            <v-layout py-3 align-center justify-center fill-height row wrap>
                                <v-flex xs11 sm12 md8 lg6 xl3 pr-5>
                                    <v-layout column align-center justify-center fill-height>
                                        <v-flex pb-1 xs12 sm8 md5 lg4 xl3>
                                            <v-img width="250px" src="https://firebasestorage.googleapis.com/v0/b/gpufinal.appspot.com/o/nojacket.png?alt=media&token=6e15418a-fd0d-4453-b8f4-2bffc6e51f0b"></v-img>
                                        
                                        </v-flex>
                                        <v-flex xs12 sm12 md8 lg4 xl3 pb-2>
                                            <v-rating
                                                v-model="rating"
                                                color="#008080" 
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
                                            <v-container pb-2>  
                                                <span style="font-size:16px">Date de Sortie :<p id="date">aaaaaaaaaa</p></span> 
                                            </v-container>
                                            <v-divider></v-divider>
                                            <v-container pb-2>
                                                <span style="font-size:16px">Développeur :<p id="dev">aaaaaaaaaa</p></span>
                                            </v-container>
                                            <v-divider></v-divider>
                                            <v-container pb-2>
                                                <span style="font-size:16px">Genre :<p id="genre">aaaaaaaaaa</p></span>
                                            </v-container>
                                            <v-divider></v-divider>
                                            <v-container pb-1>
                                                <span style="font-size:16px">Moteur Graphique :<p id="moteur">aaaaaaaaaa</p></span>
                                            </v-container>
                                            <v-divider></v-divider>
                                            <v-container pb-1>
                                                <span style="font-size:16px">Plateforme :<p id="platf">aaaaaaaaaa</p></span>
                                            </v-container>
                                        </v-list>
                                </v-flex>
                            </v-layout>
                            </v-flex>
                            <v-divider color="#008080"></v-divider>
                            <v-flex>
                            <v-layout pa-3 ma-2>
                                    <span style="font-size:22px">Configuration minimal</span>
                            </v-layout>
                            </v-flex>
                            <v-layout pa-3 mb-4 align-center justify-center>
                                <v-flex xl6>  
                                    <span id="config">Error</span>
                                </v-flex>
                            </v-layout>
                            <v-divider color="#008080"></v-divider>
                            <v-flex>
                            <v-layout pa-3 ma-2>
                                    <span style="font-size:22px">Description</span>
                            </v-layout>
                            </v-flex>
                            <v-layout pa-3 align-center justify-center>
                                <v-flex xl6>  
                                    <span id="desc">Error</span>
                                </v-flex>
                            </v-layout>
                        </v-layout>
                    </v-list>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
  export default {
    data (){
        return {
            rating : 2
        }
    },
    mounted: function(){
        this.writeDesc();
    },
    methods:{
        writeDesc(){
            document.getElementById("date").innerHTML="test"
            document.getElementById("dev").innerHTML="test"
            document.getElementById("genre").innerHTML="test"
            document.getElementById("moteur").innerHTML="test"
            document.getElementById("platf").innerHTML="test"
            document.getElementById("config").innerHTML= "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sit amet mauris aliquet, efficitur leo ut, iaculis lectus. Integer ac consequat lectus, nec dictum ex. Mauris viverra orci ante, vitae auctor urna aliquam quis. Quisque lobortis diam felis, in ullamcorper lorem sodales vitae. Pellentesque eu venenatis tellus. Pellentesque porta, dui vel blandit ornare, enim sapien eleifend dui, eu dignissim felis augue nec felis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum in accumsan neque. Curabitur in elit imperdiet, porta leo ac, ornare felis. Nulla a dolor ligula. Donec malesuada semper semper. Interdum et malesuada fames ac ante ipsum primis in faucibus. Maecenas a sodales tortor, sed iaculis mi. Pellentesque at ante varius, semper elit vel, pharetra nisl. Nullam placerat sapien viverra, interdum eros nec, commodo justo."
            document.getElementById("desc").innerHTML= "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sit amet mauris aliquet, efficitur leo ut, iaculis lectus. Integer ac consequat lectus, nec dictum ex. Mauris viverra orci ante, vitae auctor urna aliquam quis. Quisque lobortis diam felis, in ullamcorper lorem sodales vitae. Pellentesque eu venenatis tellus. Pellentesque porta, dui vel blandit ornare, enim sapien eleifend dui, eu dignissim felis augue nec felis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum in accumsan neque. Curabitur in elit imperdiet, porta leo ac, ornare felis. Nulla a dolor ligula. Donec malesuada semper semper. Interdum et malesuada fames ac ante ipsum primis in faucibus. Maecenas a sodales tortor, sed iaculis mi. Pellentesque at ante varius, semper elit vel, pharetra nisl. Nullam placerat sapien viverra, interdum eros nec, commodo justo."

        }
    }
  }
</script>
