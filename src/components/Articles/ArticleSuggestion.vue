<template>
    <v-container fluid>
        <v-layout align-center>
            <v-flex xs12 sm8 offset-sm2 md8 offset-md2 >
                <v-card dark>
                    <v-form @submit.prevent="addArticleToDatabase()">
                    <v-list>
                        <v-container>
                        <v-layout column wrap>
                            <v-layout align-center>
                                <v-flex pb-3> 
                                    <span style="font-size:22px">Suggestion d'un nouvel article</span>
                                </v-flex>
                            </v-layout>
                            <v-divider color="#008080"></v-divider>
                            
                            <v-layout column align-center my-3>
                                <v-flex v-if="image == null" align-center>
                                        <v-img min-height="300" min-width="400" max-height="300" max-width="400" ref="avatar" src="https://firebasestorage.googleapis.com/v0/b/gpufinal.appspot.com/o/logo_jeux.png?alt=media&token=e70be2d3-39cd-45db-a2d4-2652858e6dae">
                                            <v-layout row justify-end align-end fill-height>
                                            
                                                <v-tooltip color="rgb(0,128,128)" left>
                                                    <template v-slot:activator="{ on }">
                                                        <v-btn @click="$refs.inputUpload.click()" v-on="on" icon><v-icon >fas fa-edit</v-icon></v-btn>
                                                    </template>
                                                    <span style="font-size:9px">NB : Taille max de l'image 8Mo</span>
                                                </v-tooltip>
                                            
                                            </v-layout>
                                        </v-img>
                                </v-flex>
                                <v-flex v-else align-center>
                                        <v-img :src="imageRefresh">
                                            <v-layout row justify-end align-end fill-height>
                                            
                                                <v-tooltip color="rgb(0,128,128)" left>
                                                    <template v-slot:activator="{ on }">
                                                        <v-btn @click="$refs.inputUpload.click()" v-on="on" icon><v-icon >fas fa-edit</v-icon></v-btn>
                                                    </template>
                                                    <span style="font-size:9px">NB : Taille max de l'image 8Mo</span>
                                                </v-tooltip>
                                            
                                            </v-layout>
                                        </v-img>
                                </v-flex>
                                <input v-show="false" ref="inputUpload" type="file" @change="onFilePicked"  >    
                                
                            </v-layout>

                            <v-divider color="#008080"></v-divider>
                        
                            <v-layout column my-3>
                                <v-flex mb-4>
                                    <span style="font-size:16px">Rédaction de l'article</span>
                                </v-flex>
                                
                                        <v-flex xs12 md6 pa-3> 
                                            <v-text-field
                                            color="#F5DCD7"
                                            name="resume"
                                            label="Résumé de l'article affiché dans la liste des articles"
                                            single-line
                                            outline
                                            v-model="resume"
                                            clearable
                                            required
                                            height="200"
                                            >
                                            </v-text-field>
                                        </v-flex>
                                       
                                        <v-flex xs12 md6 pa-3> 
                                            <v-text-field
                                            color="#F5DCD7"
                                            name="article"
                                            label="Corps de l'article"
                                            single-line
                                            outline
                                            v-model="article"
                                            clearable
                                            required
                                            height="500"
                                            >
                                            </v-text-field>
                                        </v-flex>
                                    
                            </v-layout>
                                <v-divider color="#008080"></v-divider>
                        </v-layout>
                        </v-container>
                    </v-list>
                    <v-card-actions > 
                        <v-spacer></v-spacer>
                        <v-btn outline color="#008080" type="submit" :loading="loading"><span style="font-weight: bold">Valider</span><v-icon right>fas fa-check</v-icon></v-btn> 
                    </v-card-actions>
                    </v-form>
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
            resume:'',
            dateSortie:'',
            article:'',
            image:null,
            loading: false
        }
    },

    computed: {
      computedDateFormatted () {
        return this.formatDate(this.date)
      },
      imageRefresh(){
          this.image=inputUpload
      },
      verifyResume()
      {
          if ((this.nom.toString().charCodeAt(0)<65)|| (this.nom.toString().charCodeAt(0)>91)) return "Le nom de jeu doit commencer en majuscule"
          else return ''
      }
    },
    

    watch: {
      date (val) {
        this.dateSortie = this.formatDate(this.date)
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
      },
      //A changer et essaye de récuperer la date de l'ordinateur au moment du clique sur valider pour la date de l'article
      addArticleToDatabase(){
          
         this.$store.dispatch('addArticleToDatabase',{titre:this.resume,corps : this.article,image:this.image})
          
          
          
      },
      onFilePicked(event){
          alert(event.currentTarget)

          const files = event.target.files
          let filename= files[0].name
          if(filename.lastIndexOf('.')<= 0){
              alert("Veuillez vérifier le type de votre fichier d'image")
          }
          const fileReader = new FileReader()
          fileReader.addEventListener('load', ()=>{
              this.$refs.avatar.src=fileReader.result
          })
          fileReader.readAsDataURL(files[0])
          this.image=files[0]
        
      }
    }
  }
  /** */
</script>


