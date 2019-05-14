<template>
  <v-container fluid grid-list-xl>
    <v-layout row justify-center>
      <!--card tous les jeux-->
      <v-flex xs2>
        <v-card>
          <v-img
            height="300"
            width="300"
            src="https://firebasestorage.googleapis.com/v0/b/gpufinal.appspot.com/o/Game%2Flist.png?alt=media&token=aeafdb28-1a70-4493-905b-fa55d198b31d"
          >
            <v-container fill-height fluid>
              <v-layout fill-height>
                <v-flex xs12 align-end flexbox>
                  <span class="headline">Tous les jeux</span>
                </v-flex>
              </v-layout>
            </v-container>
          </v-img>
        </v-card>
      </v-flex>
      <v-spacer></v-spacer>
      <!--card Classement-->
      <v-flex xs2>
        <v-card>
          <v-img
            height="300"
            width="300"
            src="https://firebasestorage.googleapis.com/v0/b/gpufinal.appspot.com/o/Game%2Frating.png?alt=media&token=d37bf51d-fb80-4fdb-afa0-e7d1a0e09d43"
          >
            <v-container fill-height fluid>
              <v-layout fill-height>
                <v-flex xs12 align-end flexbox>
                  <span class="headline">Classement</span>
                </v-flex>
              </v-layout>
            </v-container>
          </v-img>
        </v-card>
      </v-flex>
      <v-spacer></v-spacer>
       <!--card Nouveauté-->
      <v-flex xs2>
        <v-card>
          <v-img
            height="300"
            width="300"
            src="https://firebasestorage.googleapis.com/v0/b/gpufinal.appspot.com/o/Game%2Fnew.jpg?alt=media&token=5507103b-8be3-4d0b-9fb2-050606a6dad3"
          >
            <v-container fill-height fluid>
              <v-layout fill-height>
                <v-flex xs12 align-end flexbox>
                  <span class="headline">Nouveauté</span>
                </v-flex>
              </v-layout>
            </v-container>
          </v-img>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>