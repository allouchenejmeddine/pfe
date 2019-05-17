<template>
  <v-container>
    <v-layout align-center mt-5>
      <v-flex xs12 sm10 offset-sm1 md10 offset-md1>
        
              <v-layout row wrap align-space-around justify-space-around pa-5>
              <!--card tous les jeux-->
                <v-flex md4 sm5 xs12 lg4 xl3 pa-3>
                  <v-card to="/allgames" max-height="512" max-width="512" flat color="rgba(0,128,128,0.3)" style="border:5px solid #008080;border-radius:20px;-moz-border-radius:20px;-webkit-border-radius:20px;">
                    <v-card-title><span style="font-size:16px;color:#008080" >Tout les jeux</span></v-card-title>
                    <v-img
                      src="https://firebasestorage.googleapis.com/v0/b/gpufinal.appspot.com/o/901616f38b.png?alt=media&token=1d0bc37e-8760-434d-a5f1-d29822ac4f85"
                    >
                       
                    </v-img>
                  </v-card>
                </v-flex>
                
                <!--card Classement-->
                <v-flex md4 sm5 xs12 lg4 xl3 pa-3>
                  <v-card color="rgba(0,128,128,0.3)" max-height="512" max-width="512"  flat style="border:5px solid #008080;border-radius:20px;-moz-border-radius:20px;-webkit-border-radius:20px;">
                    <v-card-title><span style="font-size:16px;color:#008080" >Classement</span></v-card-title> 
                    <v-img
                      src="https://firebasestorage.googleapis.com/v0/b/gpufinal.appspot.com/o/image.png?alt=media&token=53df626e-4827-43bd-bca7-64694b3dc160"
                    >
                      
                    </v-img>
                  </v-card>
                </v-flex>
                
                <!--card Nouveauté-->
                <v-flex md4 sm5 xs12 lg4 xl3 pa-3>
                  <v-card color="rgba(0,128,128,0.3)" max-height="512" max-width="512"  flat style="border:5px solid #008080;border-radius:20px;-moz-border-radius:20px;-webkit-border-radius:20px;">
                    <v-card-title><span style="font-size:16px;color:#008080">Nouveauté</span></v-card-title>
                    <v-img
                      src="https://firebasestorage.googleapis.com/v0/b/gpufinal.appspot.com/o/Sans%20titre-1.png?alt=media&token=afab93eb-1093-47a6-af0e-48d413728b38"
                    >
                      
                                              
                    </v-img>
                  </v-card>
                </v-flex>
              </v-layout>
           
      </v-flex>
    </v-layout>
  </v-container>
</template>