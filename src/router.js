import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Signup from './components/User/signup'
import Settings from './components/User/settings'
import GameSuggestion from './components/Game/GameSuggestion'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta:
      {
        title: 'Accueil - Game Players Union'
      }
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup,
      meta:
      {
        title: 'S\'inscrire - Game Players Union'
      }
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings,
      meta:
      {
        title: 'Paramètres de Compte - Game Players Union'
      }
    },
    {
      path: '/suggest_game',
      name : 'suggestgame',
      component : GameSuggestion,
      meta:
      {
        title: "Suggestion d'un jeux " 
      }
    },
    {
      path: '/about',
      name: 'about',
      meta:
      {
        title: 'A propos - Game Players Union'
      },
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
