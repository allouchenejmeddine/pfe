<template>  
  <v-container fill-height fluid>
        <v-layout align-center>
            <v-flex xs10 offset-xs1 sm8 offset-sm2 md8 offset-md2 >
                <v-card dark height=1200 align-center>
                    <v-card-text >
                        <v-container >
                            <v-form @submit.prevent="onSignUp()" justify-space-around fill-height>
                                <v-layout row wrap>
                                    <v-flex>
                                        <v-text-field
                                        name="Pseudonyme"
                                        label="Pseudo"
                                        id="pseudo"
                                        v-model="pseudo"
                                        required>
                                        </v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-layout row wrap>
                                    <v-flex >
                                        <v-text-field
                                        name="email"
                                        label="Adresse email"
                                        id="email"
                                        v-model="email"
                                        type="email"
                                        required>
                                        </v-text-field> 
                                    </v-flex>
                                </v-layout>

                                <v-layout row wrap>
                                    <v-flex >
                                        <v-text-field
                                        name="password"
                                        label="Mot de passe"
                                        id="password"
                                        v-model="password"
                                        type="password"
                                        required>
                                        </v-text-field> 
                                    </v-flex>
                                </v-layout>

                                <v-layout row wrap>
                                    <v-flex >
                                        <v-text-field
                                        name="confirmPassword"
                                        label="Confirmez votre mot de passe"
                                        id="confirmPassword"
                                        v-model="confirmPassword"
                                        type="password"
                                        :rules="[comparePasswords]">
                                        </v-text-field> 
                                    </v-flex>
                                </v-layout>
                                <v-layout row wrap>
                                    <v-flex >
                                        <v-text-field
                                        name="nom"
                                        label="nom"
                                        id="nom"
                                        v-model="nom"
                                        required>
                                        </v-text-field> 
                                    </v-flex>
                                </v-layout>
                                <v-layout row wrap>
                                    <v-flex >
                                        <v-text-field
                                        name="prenom"
                                        label="prenom"
                                        id="prenom"
                                        v-model="prenom"
                                        required>
                                        </v-text-field> 
                                    </v-flex>
                                </v-layout>
                                <v-layout row wrap>
                                    <v-flex>
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
                                                prepend-icon='fas fa-calendar-week'
                                                @blur="date = parseDate(dateNaissance)"
                                                v-on="on"
                                                ></v-text-field>
                                            </template>
                                            <v-date-picker value="2000-01-01" v-model="date" header-color="red" locale="FR" show-current="2000-01-01" max="2009-01-01"  ></v-date-picker>
                                            </v-menu>
                                    </v-flex>
                                </v-layout>
                                <v-layout wrap>
                                    <v-flex>
                                        <v-select
                                        v-model="listeGenre"
                                        :items="genres"
                                        label="Genre"
                                        persistent-hint
                                        outline
                                        solo
                                        >
                                        </v-select>
                                    </v-flex>
                                </v-layout>
                                <v-layout row wrap>
                                    <v-flex>
                                        <v-select
                                            v-model="listeJeux"
                                            :items="items"
                                            chips
                                            label="Liste des jeux"
                                            persistent-hint
                                            multiple
                                            outline
                                            solo>
                                        </v-select>
                                    </v-flex>
                                </v-layout>
                                <v-layout row wrap>
                                    <v-flex>
                                        <v-select
                                            v-model="listeVisible"
                                            :items="visibilite"
                                            label="Visibilité de liste des jeux"
                                            outline
                                            prefix="Votre choix: "
                                            >
                                        </v-select>
                                    </v-flex>
                                </v-layout>
                                <v-layout row wrap>
                                    <v-flex>
                                        <v-select
                                            v-model="listeEnvies"
                                            :items="items"
                                            chips
                                            label="Liste d'envies"
                                            persistent-hint
                                            multiple
                                            outline
                                            solo>
                                        </v-select>
                                    </v-flex>
                                </v-layout>
                                <v-layout row wrap>
                                    <v-btn type="submit" @click="onSignUp()">
                                        Envoyer
                                    </v-btn>
                                </v-layout>
                     
                            </v-form>
                        </v-container>
                        
                    </v-card-text>
                </v-card>
                
            </v-flex>
        </v-layout>
    </v-container >       
</template>
<script>
export default {
    data () {
        return {
            date: new Date().toISOString().substr(0, 10),
            email:'',
            password:'',
            confirmPassword:'',
            nom:'',
            prenom:'',
            items: ['jeux1','jeux2','jeux3'],
            genres:['Homme','Femme','Entre les deux'],
            visibilite:['Visible','Invisible'],
            pseudo:'',
            dateNaissance: '',
            listeGenre:'',
            listeJeux:'',
            listeVisible:'',
            listeEnvies:'',
            menu1: false


        }
    },
    computed:{
        comparePasswords() {
            return this.password !== this.confirmPassword ? "Reverifiez votre mot de passe svp" : ''
        },
        user() {
            return this.$store.getters.user
        },
        computedDateFormatted () {
        return this.formatDate(this.date)
        }
    },
    watch:{
        user (value) {
            if(value !== null && value !== undefined){
            this.$router.push('/')
            }
        },
        date (val) {
        this.dateNaissance = this.formatDate(this.date)
        }
    },
    methods: {
        onSignUp () {
            this.$store.dispatch('signUserUp',{email:this.email, password:this.password , 
            pseudo :this.pseudo,nom: this.nom, prenom:this.prenom , dateNaissance: this.dateNaissance ,
             listeJeux: this.listeJeux , listeGenre: this.listeGenre, listeVisible: this.listeVisible, 
             listeEnvies:this.listeEnvies })
        },
        parseDate (date) {
            if (!date) return null
            const [month, day, year] = date.split('/')
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
        },
        formatDate (date) {
            if (!date) return null
            const [year, month, day] = date.split('-')
            return `${month}/${day}/${year}`
        }
    }
}
</script>