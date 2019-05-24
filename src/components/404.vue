<template>
  <v-container>
    <v-layout fluid mt-5>
      <v-flex xs12 sm8 offset-sm2 md8 offset-md2>
        <v-card
          flat
          color="rgba(0,128,128,0.3)"
          style="border:5px solid #008080;border-radius:20px;-moz-border-radius:20px;-webkit-border-radius:20px;"
        >
          <v-layout align-center justify-center row wrap pa-3>
            <v-flex xs12 md8>
              <p style="font-size:32px;color:#008080">Erreur 404 :</p>
              <p
                style="font-size:16px;color:#008080"
              >La page que vous chercher n'est pas disponible ou n'existe pas !</p>
            </v-flex>

            <v-flex xs8 sm6 md4 xl3>
              <v-img
                src="https://firebasestorage.googleapis.com/v0/b/gpufinal.appspot.com/o/tv-clipart-broken-tv-810241-8225752.png?alt=media&token=eb53a270-e71e-44eb-a2cc-36bd7fcdea95"
              ></v-img>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {};
</script>

