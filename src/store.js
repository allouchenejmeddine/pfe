import Vue from 'vue'
import Vuex from 'vuex'

import * as firebase from 'firebase'
import router from './router'
Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
      user: null,
      loadedGames:[]
  },
  mutations: {
  setUser(state,payload){
    state.user=payload
  },
  setLoadedGames (state, payload) {
    state.loadedGames = payload
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
      let user = firebase.auth().currentUser
      let imageUrl
      let path
      let uploadTask
      let key
      const newGame={
        nom:payload.nom,
        configuration:payload.configuration,
        developpeur:payload.developpeur,
        description:payload.description,
        plateformeJeux:payload.plateformeJeux,
        dlc:payload.dlc,
        modeJeux:payload.modeJeux,
        moteurGraph:payload.moteurGraph,
        genreJeux:payload.genreJeux,
        suggestedFrom:user.uid,
        image:'',
        id:''
      }
      firebase.database().ref('/jeuxSuggeres').push(newGame).then((data)=>{
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
          return firebase.database().ref('/jeuxSuggeres').child(path).update({image:url})
        })
      }).then(()=>{
        alert('Success! what a champion!')
        router.push('/game_created')
      })
    },
     
    
    
       
       
  
    loadGames ({commit}) {
      firebase.database().ref('jeuxSuggeres').once('value')
        .then((data) => {
          const jeux = []
          const obj = data.val()
          for (let key in obj) {
            jeux.push({
              id: key,
              nom: obj[key].nom,
              description: obj[key].description,
              image: obj[key].image,
              suggestedFrom: obj[key].suggestedFrom
            })
          }
          commit('setLoadedGames', jeux)
        })
        .catch(
          (error) => {
            console.log(error)
          }
        )
    }

  },
  getters: {
    user(state){
      return state.user
    } 
  }
})
