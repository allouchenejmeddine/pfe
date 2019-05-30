<template>
  <v-container fill-height fluid>
    <v-layout align-center>
      <v-flex xs10 offset-xs1 sm8 offset-sm2 md8 offset-md2>
        <v-card dark align-center>
          <v-card-text>
            <v-container>
              
              <v-form ref="form" v-model="valid">
                <v-list>
                <v-layout column wrap>
                  <v-layout align-center>
                    <v-flex pb-3>
                      <span style="font-size:22px">Création d'un compte</span>
                    </v-flex>
                  </v-layout>
                  
                  <v-divider color="#008080"></v-divider>
                
                <v-layout fluid fill-height align-center justify-center row wrap>
                  <v-flex xs12 md8 pa-3>
                    <v-text-field
                      name="Pseudonyme"
                      label="Pseudo"
                      id="pseudo"
                      v-model="pseudo"
                      :rules="textareaRules"
                      required
                    ></v-text-field>
                  </v-flex>
                
                  <v-flex xs12 md8 pa-3>
                    <v-text-field
                      name="email"
                      label="Adresse mail"
                      id="email"
                      v-model="email"
                      :rules="emailRules"
                      type="email"
                      required
                    ></v-text-field>
                  </v-flex>
                
                  <v-flex xs12 md8 pa-3>
                    <v-text-field
                      name="password"
                      label="Mot de passe"
                      id="password"
                      v-model="password"
                      type="password"
                      :rules="passwordRules"
                      required
                    ></v-text-field>
                  </v-flex>
                
                  <v-flex xs12 md8 pa-3>
                    <v-text-field
                      name="confirmPassword"
                      label="Confirmez votre mot de passe"
                      id="confirmPassword"
                      v-model="confirmPassword"
                      type="password"
                      :rules="passwordConfirmationRules"
                      
                    ></v-text-field>
                  </v-flex>
                
                  <v-flex xs12 md8 pa-3>
                    <v-text-field name="nom" label="Nom" id="nom" v-model="nom" :rules="textareaRules" required></v-text-field>
                  </v-flex>
               
                  <v-flex xs12 md8 pa-3>
                    <v-text-field
                      name="prenom"
                      label="Prénom"
                      id="prenom"
                      :rules="textareaRules"
                      v-model="prenom"
                      required
                    ></v-text-field>
                  </v-flex>
                
                  <v-flex xs12 md8 pa-3>
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
                          v-model="dateNaissance"
                          label="Date de naissance"
                          hint="Format :MM/JJ/AAAA"
                          persistent-hint
                          prepend-icon="fas fa-calendar-week"
                          @blur="date = parseDate(dateNaissance)"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        value="2000-01-01"
                        v-model="date"
                        header-color="red"
                        locale="FR"
                        :max="new Date().toISOString().substr(0, 10)"
                        min="1950-01-01"
                      ></v-date-picker>
                    </v-menu>
                  </v-flex>
                
                  <v-flex xs12 md8 pa-3>
                    <v-select
                      v-model="listeGenre"
                      :items="genres"
                      label="Genre"
                      :rules="textareaRules"
                      persistent-hint
                      outline
                      solo
                    ></v-select>
                  </v-flex>
                
                  <v-flex xs12 md8 pa-3>
                    <v-select
                      v-model="listeJeux"
                      :items="items"
                      item-text="nom"
                      item-value="id"
                      chips
                      label="Liste des jeux"
                      persistent-hint
                      multiple
                      outline
                      solo
                    ></v-select>
                  </v-flex>
                
                <v-flex xs12 md8 pa-3>
                  <v-btn @click="validate">Envoyer</v-btn>
                </v-flex>
              </v-layout>
                </v-layout>
                </v-list>
              </v-form>
              
            </v-container>
          </v-card-text>
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
      email: "",
      password: "",
      confirmPassword: "",
      nom: "",
      prenom: "",
      genres: ["Homme", "Femme", "Neutre"],
      visibilite: ["Visible", "Invisible"],
      pseudo: "",
      dateNaissance: "",
      listeGenre: "",
      listeJeux: "",
      menu1: false,
      valid: true,
      textareaRules: [v => !!v || "Ce champ est obligatoire"],
      emailRules: [
        v => !!v || 'Ce champ est obligatoire',
        v => /.+@.+/.test(v) || 'Votre e-mail n\'est pas valide'
      ],
      passwordConfirmationRules: [
        (v) => !!v || 'Ce champ est obligatoire',
        (v) => v.localeCompare(this.password) == 0 || 'Les mots de passes ne sont pas identiques'
      ],
      passwordRules: [
        (v) => !!v || 'Ce champ est obligatoire',
        (v) => v.length > 6 || 'Votre mot de passe doit contenir 6 caractères minimum'
      ],
    };
  },
  computed: {
    items(){
      let gameNames = []
      gameNames= this.$store.state.loadedGames
      return gameNames
    },
    comparePasswords() {
      return this.password !== this.confirmPassword
        ? "Reverifiez votre mot de passe svp"
        : "";
    },
    user() {
      return this.$store.getters.user;
    },
    computedDateFormatted() {
      return this.formatDate(this.date);
    }
  },
  watch: {
    user(value) {
      if (value !== null && value !== undefined) {
        this.$router.push("/");
      }
    },
    date(val) {
      this.dateNaissance = this.formatDate(this.date);
    }
  },
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.onSignUp();
      }
    },
    getIdGames(){
      var list = []
      if(this.listeJeux != null && this.listeJeux.toString().localeCompare("") != 0){
      this.listeJeux.forEach(function(element) {
          list.push(element);
        })
      
      this.listeJeux = list;
      }
      else
      {
        this.listeJeux = ""
      }
    }
    ,
    onSignUp() {
      this.getIdGames();
      this.$store.dispatch("signUserUp", {
        email: this.email,
        password: this.password,
        pseudo: this.pseudo,
        nom: this.nom,
        prenom: this.prenom,
        dateNaissance: this.dateNaissance,
        listeJeux: this.listeJeux,
        listeGenre: this.listeGenre,
      });
    },
    parseDate(date) {
      if (!date) return null;
      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
    formatDate(date) {
      if (!date) return null;
      const [year, month, day] = date.split("-");
      return `${month}/${day}/${year}`;
    }
  }
};
</script>