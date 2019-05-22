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
      loadedGamesXBOX:[],
      loadedAllGames:[],
      loadedArticles:[]
  },
  mutations: {
  setUser(state,payload){
    state.user=payload
  },
  setLoadedArticles(state,payload){
    state.loadedArticles= payload 
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
            listeVisible: payload.listeVisible,
            image: ''
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
          /* const newUser={
            id:user.uid,
            email: user.email,
            nom: user.nom,
            prenom: user.prenom,
            dateNaissance: user.dateNaissance,
            pseudo : user.pseudo,
            listeJeux: user.listeJeux,
            listeEnvies: user.listeEnvies,
            listeGenre: user.listeGenre,
            listeVisible: user.listeVisible,
            image:user.image          
        } */
        alert('successfully logged in ')
        firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
            // User is signed in.
            commit('setUser',user)
            alert('im here 2 '+store.getters.user.image)
          } else {
            // No user is signed in.
            alert("No user found")
          }
        });        
        firebase.database().ref('/comptes').orderByChild("id").equalTo(this.state.user.id).once("value",snapshot => {
          alert('im here ')
          if (snapshot.exists()){
            const userData = snapshot.val();
            console.log("exists!", userData);
          }
        }).then((user)=>{
          commit('setUser',user)
          alert(user.id)
        })
        
        
        
      })
      .catch(
        error=>{
          console.log(error)
        }
      )
    },
    autoSignIn({commit},payload){
      commit('setUser',{id:payload.id,email:payload.email,nom:payload.nom,prenom:payload.prenom,
      dateNaissance:payload.dateNaissance,pseudo:payload.pseudo,listeJeux:payload.listeJeux,
      listeEnvies:payload.listeEnvies,listeGenre:payload.listeGenre,listeVisible:payload.listeVisible,image:payload.image})
      alert(store.state.user.id)
      alert(store.state.user.image)
    },
    logoutUser({commit}){
      firebase.auth().signOut().then(function(){
        router.push('/') 
      }).catch((err)=>{
        alert(err)
      })
      commit('setUser',null)
      
    },
    getUserAvatar(){

    },
    addArticleToDatabase({commit},payload){
      let location = "/ArticlesProposes"
      let user = firebase.auth().currentUser
      let path
      const newArticle= {
        titre: payload.titre,
        resume: payload.resume,
        corps: payload.corps,
        image: payload.image,
        dateSortie: payload.dateSortie,
        suggestedFrom: user.uid
      }
      // Create a reference to destination
      let reference = firebase.database().ref(location)
      // Add article to database
      reference.push(newArticle).then((data)=>{
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
        router.push('/article_created')
        alert('Success! what a champion! Your article is suggested !') 
      })

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
    updateUserAvatar({commit},payload){
      var ref = firebase.database().ref('/comptes')
      var user = this.state.user
      ref.orderByChild("id").equalTo(user.id).once("value",snapshot => {
        if (snapshot.exists()){
          const userData = snapshot.val();
          alert(this.state.user.id)
        }
        
      }).then(()=>{
        const userid = this.state.user.id
        const filename=payload.image.name
        const ext = filename.slice(filename.lastIndexOf('.'))
        return firebase.storage().ref(userid+ext).put(payload.image)
      }).then(fileData=>{
        var path=fileData.metadata.fullPath
        const some =firebase.storage().ref().child(path).getDownloadURL()
        some.then((url)=>{
          path=fileData.metadata.fullPath.substring(0,fileData.metadata.fullPath.length -4)
          // Add stored image url to image property of game in the database
          return reference.child(path).update({image:url})
        })
      }).then(()=>{
        alert('Success! what a champion!')
      })
    },
    loadArticles({commit}){
      firebase.database().ref('/ArticlesProposes').once('value')
        .then((data) => {
          const articlesSuggeres = []
          const obj = data.val()
          for (let key in obj) {
            articlesSuggeres.push({
              id: key,
              titre: obj[key].titre,
              corps: obj[key].corps,
              resume: obj[key].resume,
              image: obj[key].image,
              dateSortie: obj[key].dateSortie,
            })
          }
          
          commit('setLoadedArticles', articlesSuggeres)
        })
        .catch(
          (error) => {
            console.log(error)
          }
        )
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
        jeuxSuggeres.sort(function(a,b){return a.nom.localeCompare(b.nom); });
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
          jeuxSuggeres.sort(function(a,b){return a.nom.localeCompare(b.nom); });
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
          jeuxSuggeres.sort(function(a,b){return a.nom.localeCompare(b.nom); });
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
          jeuxSuggeres.sort(function(a,b){return a.nom.localeCompare(b.nom); });
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
          jeux.sort(function(a,b){return a.nom.localeCompare(b.nom); });
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
          jeux.sort(function(a,b){return a.nom.localeCompare(b.nom); });
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
          jeux.sort(function(a,b){return a.nom.localeCompare(b.nom); });
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
          jeux.sort(function(a,b){return a.nom.localeCompare(b.nom); });
          commit('setLoadedGamesXBOX', jeux)
        })
        .catch(
          (error) => {
            console.log(error)
          }
        )

        firebase.database().ref('/ArticleProposes').once('value')
        .then((data) => {
          const articlesSuggeres = []
          const obj = data.val()
          for (let key in obj) {
            articlesSuggeres.push({
              id: key,
              titre: obj[key].titre,
              corps: obj[key].corps,
              resume: obj[key].resume,
              image: obj[key].image,
              dateSortie: obj[key].dateSortie,
            })
          }
          
          commit('setLoadedArticles', articlesSuggeres)
        })
        .catch(
          (error) => {
            console.log(error)
          }
        )
    },
    editProfile({commit},payload){
      // Password update
      firebase.auth().currentUser.reauthenticateWithCredential(
        firebase.auth.EmailAuthProvider.credential(
          firebase.auth().currentUser.email, 
          payload.currentPassword
        )
      ).catch((error)=>{
        alert('Mot de passe actuel non valide, veuillez vérifier svp')
      }).then(()=>{
        firebase.auth().currentUser.updatePassword(payload.newPassword);
      }).catch((error)=>{
        alert('Votre mot de passe doit contenir au moins 6 caractères')
      }).then(()=>{
        // Pseudo update
        var ref = firebase.database().ref('/comptes').child(this.state.user.id).update({pseudo:payload.newPseudo})
      })
      .catch((error)=>{
        alert("Un problème technique est survenu, veuillez svp contacter le service technique en mentionnant ce code d'erreur : 02")
      })
      
      
    },
  },
  getters: {
    user(){
      return store.state.user
    } 
  }
})
