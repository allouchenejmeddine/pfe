import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import {store} from './store'
import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'

import './registerServiceWorker'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@fortawesome/fontawesome-free/css/all.css'

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
});
new Vue({
  router,
  store,
  render: h => h(App),
  created (){
    firebase.initializeApp({
      apiKey: "AIzaSyDfDVfahqSf04t8UrTzF25Ansp1lR6Eyrs",
      authDomain: "gpufinal.firebaseapp.com",
      databaseURL: "https://gpufinal.firebaseio.com",
      projectId: "gpufinal",
      storageBucket: "gpufinal.appspot.com"
    })
    
    this.$store.dispatch('loadGames')
    firebase.auth().onAuthStateChanged((user)=>{
      if(user){
        let currentUser
        var ref = firebase.database().ref("comptes");
        ref.orderByChild("id").equalTo(user.uid).on("child_added", function(snapshot) {
          currentUser = snapshot.val()
          store.dispatch('autoSignIn',currentUser)
          console.log('user done')
        });
        
      }
    })
    
  }
}).$mount('#app');
global.vm=app

