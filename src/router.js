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
import Game from './components/Game'
import AllGames from './components/Games/AllGames'
import GameRank from './components/Games/GameRank'
import RecentGames from './components/Games/RecentGames'
import News from './components/News'
import PlaystationGames from './components/Games/PlaystationGames'
import XboxGames from './components/Games/XboxGames'
import SwitchGames from './components/Games/SwitchGames'
import PcGames from './components/Games/PcGames'

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
      path: '/Game',
      name: 'Game',
      component: Game,
      meta:
      {
        title: 'Jeux - Game Players Union'
      }
    },
    {
      path: '/AllGames',
      name: 'AllGames',
      component: AllGames,
      meta:
      {
        title: 'Tous les jeux - Game Players Union'
      }
    },
    {
      path: '/GameRank',
      name: 'GameRank',
      component: GameRank,
      meta:
      {
        title: 'Classement - Game Players Union'
      }
    },
    {
      path: '/RecentGames',
      name: 'RecentGames',
      component: RecentGames,
      meta:
      {
        title: 'Ajout récent - Game Players Union'
      }
    },
    {
      path: '/News',
      name: 'News',
      component: News,
      meta:
      {
        title: 'News - Game Players Union'
      }
    },
    {
      path: '/PlaystationGames',
      name: 'PlaystationGames',
      component: PlaystationGames,
      meta:
      {
        title: 'Jeux Playstation - Game Players Union'
      }
    },
    {
      path: '/XboxGames',
      name: 'XboxGames',
      component: XboxGames,
      meta:
      {
        title: 'Jeux Xbox - Game Players Union'
      }
    },
    {
      path: '/SwitchGames',
      name: 'SwitchGames',
      component: SwitchGames,
      meta:
      {
        title: 'Jeux Switch - Game Players Union'
      }
    },
    {
      path: '/PcGames',
      name: 'PcGames',
      component: PcGames,
      meta:
      {
        title: 'Jeux PC - Game Players Union'
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
