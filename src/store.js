import Vue from 'vue'
import Vuex from 'vuex'

import * as firebase from 'firebase'
import router from './router'
Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
      user: null,
      loadedSuggestedGamesXBOX:[],
      loadedSuggestedGamesPC:[],
      loadedSuggestedGamesPS:[],
      loadedSuggestedGamesSWITCH:[],
      loadedGamesPC:[],
      loadedGamesPS:[],
      loadedGamesSWITCH:[],
      loadedGamesXBOX:[]
  },
  mutations: {
  setUser(state,payload){
    state.user=payload
  },
  setLoadedSuggestedGamesPC (state, payload) {
    state.loadedSuggestedGamesPC = payload
  },
  setLoadedSuggestedGamesPS (state, payload) {
    state.loadedSuggestedGamesPS = payload
  },
  setLoadedSuggestedGamesXBOX (state, payload) {
    state.loadedSuggestedGamesXBOX = payload
  },
  setLoadedSuggestedGamesSWITCH (state, payload) {
    state.loadedSuggestedGamesSWITCH = payload
  },
  setLoadedGamesPC(state,paylaod){
    state.loadedGamesPC=paylaod
  },
  setLoadedGamesPS(state,paylaod){
    state.loadedGamesPS=paylaod
  },
  setLoadedGamesXBOX(state,paylaod){
    state.loadedGamesXBOX=paylaod
  },
  setLoadedGamesSWITCH(state,paylaod){
    state.loadedGamesSWITCH=paylaod
  }
    
  
},
  actions: {
    signUserUp({commit},payload){
      firebase.auth().createUserWithEmailAndPassword(payload.email,payload.password).
      then( () => 
        {

          let user = firebase.auth().currentUser
          const newUser = { 
            // Champs de l'utilisateur
            id: user.uid,
            email: payload.email,
            nom: payload.nom,
            prenom: payload.prenom,
            dateNaissance: payload.dateNaissance,
            pseudo : payload.pseudo,
            listeJeux: payload.listeJeux,
            listeEnvies: payload.listeEnvies,
            listeGenre: payload.listeGenre,
            listeVisible: payload.listeVisible
          }
          commit('setUser',newUser)
          firebase.database().ref('/comptes/' + user.uid).set(newUser)
          }
        
        
      )
      .catch(
        error=>{
          console.log(error)
        }
      )
    },
    signUserIn({commit}, payload){
      firebase.auth().signInWithEmailAndPassword(payload.email,payload.password)
      .then(
        user =>{
          const newUser={
            id:user.uid,
            email: user.email,
            nom: user.nom,
            prenom: user.prenom,
            dateNaissance: user.dateNaissance,
            pseudo : user.pseudo,
            listeJeux: user.listeJeux,
            listeEnvies: user.listeEnvies,
            listeGenre: user.listeGenre,
            listeVisible: user.listeVisible

            
        }
        firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
            // User is signed in.
            commit('setUser',user)
            alert(store.getters.user.uid)
          } else {
            // No user is signed in.
            alert("No user found")
          }
        });        
        
        
      })
      .catch(
        error=>{
          console.log(error)
        }
      )
    },
    autoSignIn({commit},payload){
      commit('setUser',{id:payload.uid,email:payload.email,nom:payload.nom,prenom:payload.prenom,
      dateNaissance:payload.dateNaissance,pseudo:payload.pseudo,listeJeux:payload.listeJeux,
      listeEnvies:payload.listeEnvies,listeGenre:payload.listeGenre,listeVisible:payload.listeVisible})
      alert(store.getters.user.id)
    },
    logoutUser({commit}){
      firebase.auth().signOut().then(function(){
        router.push('/') 
      }).catch((err)=>{
        alert(err)
      })
      commit('setUser',null)
      
    },
    addGameToDatabase({commit},payload){
      let location = '/JeuxSuggeres'
      let user = firebase.auth().currentUser
      let path
      const newGame={
        nom:payload.nom,
        configuration:payload.configuration,
        developpeur:payload.developpeur,
        description:payload.description,
        plateformeJeux:payload.plateformeJeux+'',
        dlc:payload.dlc,
        modeJeux:payload.modeJeux,
        moteurGraph:payload.moteurGraph,
        genreJeux:payload.genreJeux,
        suggestedFrom:user.uid,
        dateSortie:payload.dateSortie,
        image:'',
        id:''
      }
      // Find the appropriate location on the database
      alert(newGame.plateformeJeux)
      if (newGame.plateformeJeux.localeCompare('PC','en', {sensitivity: 'base'})==0)
      {
        location='/JeuxSuggeres/PC'
      }
      if (newGame.plateformeJeux.localeCompare('SWITCH','en', {sensitivity: 'base'})==0)
      {
        location='/JeuxSuggeres/SWITCH'
      }
      if (newGame.plateformeJeux.localeCompare('PS','en', {sensitivity: 'base'})==0)
      {
        location='/JeuxSuggeres/PS'
      }
      if(newGame.plateformeJeux.localeCompare('XBOX','en', {sensitivity: 'base'})==0)
      {
        location='/JeuxSuggeres/XBOX'
      }
      // Create a reference to destination
      let reference = firebase.database().ref(location)
      // Add game to database
      reference.push(newGame).then((data)=>{
        const key = data.key
        return key
      }).then(key=>{
        const filename=payload.image.name
        const ext = filename.slice(filename.lastIndexOf('.'))
        return firebase.storage().ref(key+ext).put(payload.image)
      }).then(fileData=>{
        path=fileData.metadata.fullPath
        const some =firebase.storage().ref().child(path).getDownloadURL()
        some.then((url)=>{
          path=fileData.metadata.fullPath.substring(0,fileData.metadata.fullPath.length -4)
          // Add stored image url to image property of game in the database
          return reference.child(path).update({image:url})
        })
      }).then(()=>{
        alert('Success! what a champion!')
        router.push('/game_created')
      })
    },
    getSearchGame({commit}, payload){
      var ref = firebase.database().ref("jeux");
      ref.orderByChild("nom").equalTo(payload.nom).on("child_added", function(snapshot) {
        console.log(snapshot.key);
      });
    },
    loadGames ({commit}) {
      // Load suggested games for PC 
      firebase.database().ref('/JeuxSuggeres/PC').once('value')
      .then((data) => {
        const jeuxSuggeres = []
        const obj = data.val()
        for (let key in obj) {
          jeuxSuggeres.push({
            id: key,
            nom: obj[key].nom,
            description: obj[key].description,
            image: obj[key].image,
            suggestedFrom: obj[key].suggestedFrom,
            plateformeJeux:obj[key].plateformeJeux,
            configuration:obj[key].configuration,
            developpeur:obj[key].developpeur,
            dlc:obj[key].dlc,
            modeJeux:obj[key].modeJeux,
            moteurGraph:obj[key].moteurGraph,
            genreJeux:obj[key].genreJeux,
            dateSortie:obj[key].dateSortie
          })
        }
        commit('setLoadedSuggestedGamesPC', jeuxSuggeres)
      })
      .catch(
        (error) => {
          console.log(error)
        }
      )
      // Load suggested games for PS 
      firebase.database().ref('/JeuxSuggeres/PS').once('value')
        .then((data) => {
          const jeuxSuggeres = []
          const obj = data.val()
          for (let key in obj) {
            jeuxSuggeres.push({
              id: key,
              nom: obj[key].nom,
              description: obj[key].description,
              image: obj[key].image,
              suggestedFrom: obj[key].suggestedFrom,
              plateformeJeux:obj[key].plateformeJeux,
              configuration:obj[key].configuration,
              developpeur:obj[key].developpeur,
              dlc:obj[key].dlc,
              modeJeux:obj[key].modeJeux,
              moteurGraph:obj[key].moteurGraph,
              genreJeux:obj[key].genreJeux,
              dateSortie:obj[key].dateSortie
            })
          }
          commit('setLoadedSuggestedGamesPS', jeuxSuggeres)
        })
        .catch(
          (error) => {
            console.log(error)
          }
        )
        // Load suggested games for XBOX
        firebase.database().ref('/JeuxSuggeres/XBOX').once('value')
        .then((data) => {
          const jeuxSuggeres = []
          const obj = data.val()
          for (let key in obj) {
            jeuxSuggeres.push({
              id: key,
              nom: obj[key].nom,
              description: obj[key].description,
              image: obj[key].image,
              suggestedFrom: obj[key].suggestedFrom,
              plateformeJeux:obj[key].plateformeJeux,
              configuration:obj[key].configuration,
              developpeur:obj[key].developpeur,
              dlc:obj[key].dlc,
              modeJeux:obj[key].modeJeux,
              moteurGraph:obj[key].moteurGraph,
              genreJeux:obj[key].genreJeux,
              dateSortie:obj[key].dateSortie
            })
          }
          commit('setLoadedSuggestedGamesXBOX', jeuxSuggeres)
        })
        .catch(
          (error) => {
            console.log(error)
          }
        )
        // Load suggested games for SWITCH
        firebase.database().ref('/JeuxSuggeres/SWITCH').once('value')
        .then((data) => {
          const jeuxSuggeres = []
          const obj = data.val()
          for (let key in obj) {
            jeuxSuggeres.push({
              id: key,
              nom: obj[key].nom,
              description: obj[key].description,
              image: obj[key].image,
              suggestedFrom: obj[key].suggestedFrom,
              plateformeJeux:obj[key].plateformeJeux,
              configuration:obj[key].configuration,
              developpeur:obj[key].developpeur,
              dlc:obj[key].dlc,
              modeJeux:obj[key].modeJeux,
              moteurGraph:obj[key].moteurGraph,
              genreJeux:obj[key].genreJeux,
              dateSortie:obj[key].dateSortie
            })
          }
          commit('setLoadedSuggestedGamesSWITCH', jeuxSuggeres)
        })
        .catch(
          (error) => {
            console.log(error)
          }
        )
        // Load confirmed games for PC
        firebase.database().ref('jeux/PC').once('value')
        .then((data) => {
          const jeux = []
          const obj = data.val()
          for (let key in obj) {
            jeux.push({
              id: key,
              nom: obj[key].nom,
              description: obj[key].description,
              image: obj[key].image,
              suggestedFrom: obj[key].suggestedFrom,
              plateformeJeux:obj[key].plateformeJeux,
              configuration:obj[key].configuration,
              developpeur:obj[key].developpeur,
              dlc:obj[key].dlc,
              modeJeux:obj[key].modeJeux,
              moteurGraph:obj[key].moteurGraph,
              genreJeux:obj[key].genreJeux,
              dateSortie:obj[key].dateSortie
            })
          }
          commit('setLoadedGamesPC', jeux)
        })
        .catch(
          (error) => {
            console.log(error)
          }
        )
        // Load confirmed games for PS
        firebase.database().ref('jeux/PS').once('value')
        .then((data) => {
          const jeux = []
          const obj = data.val()
          for (let key in obj) {
            jeux.push({
              id: key,
              nom: obj[key].nom,
              description: obj[key].description,
              image: obj[key].image,
              suggestedFrom: obj[key].suggestedFrom,
              plateformeJeux:obj[key].plateformeJeux,
              configuration:obj[key].configuration,
              developpeur:obj[key].developpeur,
              dlc:obj[key].dlc,
              modeJeux:obj[key].modeJeux,
              moteurGraph:obj[key].moteurGraph,
              genreJeux:obj[key].genreJeux,
              dateSortie:obj[key].dateSortie
            })
          }
          commit('setLoadedGamesPS', jeux)
        })
        .catch(
          (error) => {
            console.log(error)
          }
        )
        // Load confirmed games for SWITCH
        firebase.database().ref('jeux/SWITCH').once('value')
        .then((data) => {
          const jeux = []
          const obj = data.val()
          for (let key in obj) {
            jeux.push({
              id: key,
              nom: obj[key].nom,
              description: obj[key].description,
              image: obj[key].image,
              suggestedFrom: obj[key].suggestedFrom,
              plateformeJeux:obj[key].plateformeJeux,
              configuration:obj[key].configuration,
              developpeur:obj[key].developpeur,
              dlc:obj[key].dlc,
              modeJeux:obj[key].modeJeux,
              moteurGraph:obj[key].moteurGraph,
              genreJeux:obj[key].genreJeux,
              dateSortie:obj[key].dateSortie
            })
          }
          commit('setLoadedGamesSWITCH', jeux)
        })
        .catch(
          (error) => {
            console.log(error)
          }
        )
        // Load confirmed games for XBOX
        firebase.database().ref('jeux/XBOX').once('value')
        .then((data) => {
          const jeux = []
          const obj = data.val()
          for (let key in obj) {
            jeux.push({
              id: key,
              nom: obj[key].nom,
              description: obj[key].description,
              image: obj[key].image,
              suggestedFrom: obj[key].suggestedFrom,
              plateformeJeux:obj[key].plateformeJeux,
              configuration:obj[key].configuration,
              developpeur:obj[key].developpeur,
              dlc:obj[key].dlc,
              modeJeux:obj[key].modeJeux,
              moteurGraph:obj[key].moteurGraph,
              genreJeux:obj[key].genreJeux,
              dateSortie:obj[key].dateSortie
            })
          }
          commit('setLoadedGamesXBOX', jeux)
        })
        .catch(
          (error) => {
            console.log(error)
          }
        )

    },
    editProfile({commit},payload){
      var user = firebase.auth().currentUser;
      var newPass = payload.newPassword;
      user.updatePassword(newPass).then(function() {
        alert("Mot de passe changé avec succès")
      }).catch(function(error) {
        alert(error)
      });
    }

  },
  getters: {
    user(){
      return store.state.user
    } 
  }
})
