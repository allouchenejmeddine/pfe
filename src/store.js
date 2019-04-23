import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import router from './router'
Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
      user: null
  },
  mutations: {
  setUser(state,payload){
    state.user=payload
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
        (user) =>{
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
        var userto = firebase.auth().currentUser
        commit('setUser',userto)
        
        alert(user.uid)
        
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
    },
    logoutUser({commit}){
      firebase.auth().signOut().then(function(){
        alert('successfully logout')
        router.push('/settings') 
      }).catch((err)=>{
        alert(err)
      })
      commit('setUser',null)
      
    }

  },
  getters: {
    user(state){
      return state.user
    } 
  }
})
