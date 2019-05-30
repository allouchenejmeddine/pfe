<template>
  <v-container fluid>
    <v-layout align-center>
      <v-flex xs12 sm8 offset-sm2 md8 offset-md2>
        <v-card dark>
          <v-form @submit.prevent="addToDatabase()">
            <v-list>
              <v-container>
                <v-layout column wrap>
                  <v-layout align-center>
                    <v-flex pb-3>
                      <span style="font-size:22px">Suggestion d'un nouveau jeu</span>
                    </v-flex>
                  </v-layout>
                  <v-divider color="#008080"></v-divider>

                  <v-layout column align-center my-3>
                    <v-flex v-if="image == null" align-center>
                      <v-avatar size="200" tile>
                        <v-img
                          ref="avatar"
                          src="https://firebasestorage.googleapis.com/v0/b/gpufinal.appspot.com/o/logo_jeux.png?alt=media&token=e70be2d3-39cd-45db-a2d4-2652858e6dae"
                        >
                          <v-layout row justify-end align-end fill-height>
                            <v-tooltip color="rgb(0,128,128)" left>
                              <template v-slot:activator="{ on }">
                                <v-btn @click="$refs.inputUpload.click()" v-on="on" icon>
                                  <v-icon>fas fa-edit</v-icon>
                                </v-btn>
                              </template>
                              <span style="font-size:9px">NB : Taille max de l'image 8Mo</span>
                            </v-tooltip>
                          </v-layout>
                        </v-img>
                      </v-avatar>
                    </v-flex>
                    <v-flex v-else align-center>
                      <v-avatar size="200" tile>
                        <v-img :src="imageRefresh">
                          <v-layout row justify-end align-end fill-height>
                            <v-tooltip color="rgb(0,128,128)" left>
                              <template v-slot:activator="{ on }">
                                <v-btn @click="$refs.inputUpload.click()" v-on="on" icon>
                                  <v-icon>fas fa-edit</v-icon>
                                </v-btn>
                              </template>
                              <span style="font-size:9px">NB : Taille max de l'image 8Mo</span>
                            </v-tooltip>
                          </v-layout>
                        </v-img>
                      </v-avatar>
                    </v-flex>
                    <input v-show="false" ref="inputUpload" type="file" @change="onFilePicked">
                  </v-layout>

                  <v-divider color="#008080"></v-divider>

                  <v-layout column my-3>
                    <v-flex mb-4>
                      <span style="font-size:16px">Informations sur le jeux</span>
                    </v-flex>
                    <v-layout align-center fill-height justify-center row wrap>
                      <v-flex xs12 md6 pa-3>
                        <v-text-field
                          color="#F5DCD7"
                          name="nom"
                          label="Nom du jeux"
                          single-line
                          outline
                          v-model="nom"
                          clearable
                          required
                          :rules="[verifyNom]"
                        ></v-text-field>
                      </v-flex>
                      <v-spacer></v-spacer>
                      <v-flex xs12 md6 pa-3>
                        <v-menu
                          ref="menu1"
                          v-model="menu1"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          lazy
                          transition="scale-transition"
                          offset-y
                          full-width
                          max-width="290px"
                          min-width="290px"
                        >
                          <template v-slot:activator="{ on }">
                            <v-text-field
                              readonly
                              required
                              v-model="dateSortie"
                              label="Date de sortie"
                              hint="MM/JJ/AAAA format"
                              persistent-hint
                              prepend-icon="fas fa-calendar-week"
                              @blur="date = parseDate(dateSortie)"
                            ></v-text-field>
                          </template>
                          <v-date-picker v-model="date" no-title @input="menu1 = false" locale></v-date-picker>
                        </v-menu>
                      </v-flex>
                    </v-layout>
                    <v-layout align-center fill-height justify-center row wrap>
                      <v-flex xs12 md6 pa-3>
                        <v-text-field
                          color="#F5DCD7"
                          name="Developpeur"
                          label="Développeur du jeux"
                          single-line
                          required
                          outline
                          v-model="developpeur"
                          clearable
                        ></v-text-field>
                      </v-flex>
                      <v-spacer></v-spacer>
                      <v-flex xs12 md6 pa-3>
                        <v-select
                          color="#F5DCD7"
                          name="ModeJeux"
                          label="Mode de jeux"
                          outline
                          required
                          v-model="modeJeux"
                          clearable
                          :items="mode"
                        ></v-select>
                      </v-flex>
                    </v-layout>
                    <v-layout align-center fill-height justify-center row wrap>
                      <v-flex xs12 md6 pa-3>
                        <v-text-field
                          color="#F5DCD7"
                          name="moteurGraphique"
                          label="Moteur graphique"
                          single-line
                          v-model="moteurGraph"
                          outline
                          required
                          clearable
                        ></v-text-field>
                      </v-flex>
                      <v-spacer></v-spacer>
                      <v-flex xs12 md6 pa-3>
                        <v-select
                          :items="genres"
                          label="Genre: "
                          clearable
                          required
                          v-model="genreJeux"
                          outline
                        ></v-select>
                      </v-flex>
                    </v-layout>
                    <v-layout align-center fill-height justify-center row wrap>
                      <v-flex xs12 md6 pa-3>
                        <v-text-field
                          color="#F5DCD7"
                          name="dlc"
                          label="DLC"
                          single-line
                          v-model="dlc"
                          outline
                          required
                          clearable
                        ></v-text-field>
                      </v-flex>
                      <v-spacer></v-spacer>
                      <v-flex xs12 md6 pa-3>
                        <v-select
                          :items="plateforme"
                          label="Plateformes: "
                          clearable
                          required
                          v-model="plateformeJeux"
                          outline
                        ></v-select>
                      </v-flex>
                    </v-layout>
                    <v-layout align-center fill-height justify-center row wrap>
                      <v-flex xs12 md6 pa-3>
                        <v-textarea
                          color="#F5DCD7"
                          name="description"
                          label="Description du jeux"
                          single-line
                          v-model="description"
                          outline
                          aria-required
                          clearable
                        ></v-textarea>
                      </v-flex>
                      <v-spacer></v-spacer>
                      <v-flex xs12 md6 pa-3>
                        <v-textarea
                          color="#F5DCD7"
                          name="configuration"
                          label="Configuration nécessaire"
                          single-line
                          outline
                          v-model="configuration"
                          clearable
                          aria-required
                        ></v-textarea>
                      </v-flex>
                    </v-layout>
                  </v-layout>
                  <v-divider color="#008080"></v-divider>
                </v-layout>
              </v-container>
            </v-list>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn outline color="#008080" type="submit" :loading="loading">
                <span style="font-weight: bold">Valider</span>
                <v-icon right>fas fa-check</v-icon>
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      date: new Date().toISOString().substr(0, 10),
      menu1: false,
      menu2: false,
      nom: "",
      genres: ["FPS", "MOBA", "SPORT", "COURSE", "BATTLE ROYAL"],
      plateforme: ["PC", "PS", "SWITCH", "XBOX"],
      mode: ["SOLO", "MULTIPLAYER", "COOP"],
      nbVotes: 0,
      nom: "",
      dateSortie: "",
      configuration: "",
      developpeur: "",
      description: "",
      plateformeJeux: "",
      dlc: "",
      modeJeux: "",
      moteurGraph: "",
      genreJeux: "",
      image: null,
      loading: false
    };
  },

  computed: {
    computedDateFormatted() {
      return this.formatDate(this.date);
    },
    imageRefresh() {
      this.image = this.inputUpload;
    },
    logo() {
      this;
    },
    verifyNom() {
      if (
        this.nom.toString().charCodeAt(0) < 65 ||
        this.nom.toString().charCodeAt(0) > 91
      )
        return "Le nom de jeu doit commencer en majuscule";
      else return true;
    }
  },

  watch: {
    date(val) {
      this.dateSortie = this.formatDate(this.date);
    }
  },

  methods: {
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
    parseDate(date) {
      if (!date) return null;

      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
    addToDatabase() {
      this.$store.dispatch("addGameToDatabase", {
        nom: this.nom,
        configuration: this.configuration,
        developpeur: this.developpeur,
        description: this.description,
        plateformeJeux: this.plateformeJeux,
        dlc: this.dlc,
        nbVotes: this.nbVotes,
        eval: "0",
        modeJeux: this.modeJeux,
        moteurGraph: this.moteurGraph,
        genreJeux: this.genreJeux,
        image: this.image,
        dateSortie: this.dateSortie
      });
    },
    onFilePicked(event) {
      alert(event.currentTarget);

      const files = event.target.files;
      let filename = files[0].name;
      if (filename.lastIndexOf(".") <= 0) {
        alert("Veuillez vérifier le type de votre fichier d'image");
        this.image= null 
      }
      else if ( (filename.lastIndexOf(".jpg")<= 0) && (filename.lastIndexOf(".png")<= 0) ){
        alert("Les types accéptés sont : .jpg et .png");
        this.image= null 
      }
      else{
        const fileReader = new FileReader();
        fileReader.addEventListener("load", () => {
          this.$refs.avatar.src = fileReader.result;
        });
        fileReader.readAsDataURL(files[0]);
        this.image = files[0];
      }
      
    }
  }
};
/** */
</script>


