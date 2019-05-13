import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import GameDesc from './components/Games/GameDesc'
import Signin from './components/User/signin'
import Signup from './components/User/signup'
import Settings from './components/User/settings'
import GameSuggestion from './components/Games/GameSuggestion'
import authGuard from './auth-guard';
import GameSuggestions from './components/Games/suggestedGames'
import GameCreated from './components/Games/GameCreatedSuccessfully'

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
      path: '/signin',
      name: 'signin',
      component: Signin,
      meta:
      {
        title: 'Se connecter - Game Players Union'
      }
    },
    {
      path: '/gamedesc',
      name: 'GameDesc',
      component: GameDesc,
      meta:
      {
        title: 'Description - Game Players Union'
      }
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings,
      meta:
      {
        title: 'Paramètres de Compte - Game Players Union'
      },
      //beforeEnter:authGuard
    },
    {
      path: '/suggest_game',
      name : 'suggestgame',
      component : GameSuggestion,
      meta:
      {
        title: "Suggestion d'un jeux " 
      },
      //beforeEnter:authGuard
    },
    {
      path: '/suggested_games',
      name : 'suggestedgames',
      component : GameSuggestions,
      meta:
      {
        title: "Jeux suggérés " 
      },
      //beforeEnter:authGuard
    },
    {
      path: '/game_created',
      name : 'gameCreated',
      component : GameCreated,
      meta:
      {
        title: "Jeu suggéré avec succès" 
      },
      //beforeEnter:authGuard
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
