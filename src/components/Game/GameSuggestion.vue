<template>
    <v-container fluid>
        <v-layout align-center>
            <v-flex xs12 sm8 offset-sm2 md8 offset-md2 >
                <v-card dark >
                    <v-list>
                        <v-container>
                        <v-layout column  >
                            <v-layout align-center>
                                <v-flex pb-3> 
                                    <span style="font-size:22px">Suggestion d'un nouveau jeux</span>
                                </v-flex>
                            </v-layout>
                            <v-divider color="#008080"></v-divider>
                        
                            <v-layout column align-center my-3>
                                
                                <v-flex align-center>
                                    <v-avatar size="200" tile>
                                        <v-img  src="https://firebasestorage.googleapis.com/v0/b/gpufinal.appspot.com/o/logo_jeux.png?alt=media&token=e70be2d3-39cd-45db-a2d4-2652858e6dae">
                                            <v-layout row justify-end align-end fill-height>
                                            
                                                <v-tooltip color="rgb(0,128,128)" left>
                                                    <template v-slot:activator="{ on }">
                                                        <v-btn v-on="on" icon><v-icon >fas fa-edit</v-icon></v-btn>
                                                    </template>
                                                    <span style="font-size:9px">NB : Taille max de l'image 8Mo</span>
                                                </v-tooltip>
                                            
                                            </v-layout>
                                        </v-img>
                                    </v-avatar>
                                </v-flex>
                                
                            </v-layout>

                            <v-divider color="#008080"></v-divider>
                        
                            <v-layout column my-3>
                                <v-flex mb-4>
                                    <span style="font-size:16px">Informations sur le jeux</span>
                                </v-flex>
                                <v-layout align-center fill-height justify-center row  >
                                        <v-flex xs5 ml-5> 
                                            <v-text-field
                                            color="#F5DCD7"
                                            name="Nom"
                                            label="Nom du jeux"
                                            single-line
                                            outline
                                            v-model="nom"
                                            clearable
                                            :rules="[verifyNom]"
                                            required>
                                            </v-text-field>
                                        </v-flex>
                                        <v-spacer></v-spacer>
                                        <v-flex xs5 mr-5 mb-5>
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
                                                v-model="dateFormatted"
                                                label="Date de sortie"
                                                hint="MM/JJ/AAAA format"
                                                persistent-hint
                                                prepend-icon='fas fa-calendar-week'
                                                @blur="date = parseDate(dateFormatted)"
                                                v-on="on"
                                                ></v-text-field>
                                            </template>
                                            <v-date-picker v-model="date" no-title @input="menu1 = false"></v-date-picker>
                                            </v-menu>
                                            
                                        </v-flex>
                                    </v-layout>
                                    <v-layout align-center fill-height justify-center row  >
                                        <v-flex xs5 ml-5> 
                                            <v-text-field
                                            color="#F5DCD7"
                                            name="Developpeur"
                                            label="Développeur du jeux"
                                            single-line
                                            outline
                                            clearable
                                            required>
                                            </v-text-field>
                                        </v-flex>
                                        <v-spacer></v-spacer>
                                        <v-flex xs5 mr-5>
                                            <v-select
                                            color="#F5DCD7"
                                            name="ModeJeux"
                                            label="Mode de jeux"
                                            outline
                                            clearable
                                            required
                                            :items=mode
                                            >
                                            
                                            </v-select>
                                        </v-flex>
                                    </v-layout>
                                    <v-layout align-center fill-height justify-center row  >
                                        <v-flex xs5 ml-5> 
                                            <v-text-field
                                            color="#F5DCD7"
                                            name="moteurGraphique"
                                            label="Moteur graphique"
                                            single-line
                                            outline
                                            clearable
                                            required>
                                            </v-text-field>
                                        </v-flex>
                                        <v-spacer></v-spacer>
                                        <v-flex xs5 mr-5>
                                            <v-select
                                            :items=genres
                                            prefix="Genre: "
                                            clearable
                                            outline
                                            required
                                             >
                                            </v-select>
                                        </v-flex>
                                    </v-layout>
                                    <v-layout align-center fill-height justify-center row  >
                                        <v-flex xs5 ml-5> 
                                            <v-text-field
                                            color="#F5DCD7"
                                            name="dlc"
                                            label="DLC"
                                            single-line
                                            outline
                                            clearable
                                            required>
                                            </v-text-field>
                                        </v-flex>
                                        <v-spacer></v-spacer>
                                        <v-flex xs5 mr-5>
                                            <v-select
                                            :items=plateforme
                                            prefix="Plateforme: "
                                            clearable
                                            outline
                                            required
                                             >
                                            </v-select>
                                        </v-flex>
                                    </v-layout>
                                    <v-layout align-center fill-height justify-center row  >
                                        <v-flex xs5 ml-5> 
                                            <v-textarea
                                            color="#F5DCD7"
                                            name="description"
                                            label="Description du jeux"
                                            single-line
                                            outline
                                            clearable
                                            required>
                                            </v-textarea>
                                        </v-flex>
                                        <v-spacer></v-spacer>
                                        <v-flex xs5 mr-5>
                                            <v-textarea
                                            color="#F5DCD7"
                                            name="configuration"
                                            label="Configuration nécessaire"
                                            single-line
                                            outline
                                            clearable
                                            required
                                             >
                                            </v-textarea>
                                        </v-flex>
                                    </v-layout>
                                </v-layout>
                                <v-divider color="#008080"></v-divider>
                        </v-layout>
                        </v-container>
                    </v-list>
                    <v-card-actions > 
                        <v-spacer></v-spacer>
                        <v-btn outline color="#008080"><span style="font-weight: bold">Valider</span><v-icon right>fas fa-check</v-icon></v-btn> 
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
    
</template>
<script>
  export default {
    data () {
        return {
            date: new Date().toISOString().substr(0, 10),
            menu1: false,
            menu2: false,
            nom:'',
            genres:["FPS","MOBA","SPORT","COURSE","BATTLE ROYAL"],
            plateforme:['PC','PS','SWITCH','XBOX'],
            mode:['SOLO','MULTIPLAYER','COOP'],
            nbVotes:0
        }
      
    
      
    },

    computed: {
      computedDateFormatted () {
        return this.formatDate(this.date)
      }
    },

    watch: {
      date (val) {
        this.dateFormatted = this.formatDate(this.date)
      }
    },

    methods: {
      formatDate (date) {
        if (!date) return null

        const [year, month, day] = date.split('-')
        return `${month}/${day}/${year}`
      },
      parseDate (date) {
        if (!date) return null

        const [month, day, year] = date.split('/')
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
      }
    },
    computed: {
      verifyNom()
      {
          if ( (this.nom.toString().charCodeAt(0)<65)|| (this.nom.toString().charCodeAt(0)>91)) return "Le nom de jeu doit commencer en majuscule"
      }
    }
  }
  /** */
</script>


