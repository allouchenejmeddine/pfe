<template>
 <v-app>
   <v-toolbar app color="#D32F2F" id="youth" dark absolute dense scroll-off-screen v-model="onScroll">
      
        <div>
          <img src="https://firebasestorage.googleapis.com/v0/b/gpufinal.appspot.com/o/logo.png?alt=media&token=3bb68f47-2e5d-4a41-9844-22ad4f199fd5" width="220" height="120">
        </div>
      <v-menu open-on-hover bottom offset-y origin="center center"
      transition="scale-transition">
        <v-btn slot="activator" flat>Jeux</v-btn>
        <v-list>
        <v-list-tile
         v-for="(item, index) in jeux"
          :key="index"
          @click=""
        >
          <v-list-tile-title>{{item.title}}</v-list-tile-title>
        </v-list-tile>
      </v-list>
        </v-menu>
        <v-btn slot="activator" flat>News</v-btn>
      
      <v-btn
          v-for="icone in console"
          :key="icone"
          class="mx-3"
          dark
          icon
          :href="icone.link"
        >
          <v-icon size="24px">{{ icone.icon }}</v-icon>
        </v-btn>
      <v-spacer></v-spacer>
      <v-text-field
        name="name"
        label="Rechercher"
        id="id"
        v-if="searchVisible"
        color=#008080
      >
      </v-text-field>

      <v-btn icon @click='searchVisible = !searchVisible'>
        <v-icon>fas fa-search</v-icon>
      </v-btn>

      <v-btn flat @click="openForm()">
        <v-icon left>fas fa-user-circle</v-icon>
        <span>Se Connecter</span>
      </v-btn>
      
       
      
    </v-toolbar>
    

      <div class="form-popup" id="myForm">
        <v-text-field label="hello">
          
        </v-text-field>
      </div>
 
    
<v-parallax src="https://i.imgur.com/UfGS6V4.jpg" height="2000">
    <v-content style="padding: 0">
      	<v-content>
	      	<router-view></router-view>
		    </v-content>
    <v-btn id="myBtn" @click="topFunction" ripple icon>
       <v-icon>fa-chevron-circle-up</v-icon>
    </v-btn>
    </v-content>
     </v-parallax>
  
    <v-footer
    dark
    height="auto"
  >
    <v-card
      class="flex"
      flat
      tile
    >
      <v-card-title class="grey darken-3">
       <v-layout align-center justify-space-around row fill-height>
          <v-flex xs12>
            <strong class="subheading font-italic bold font-weight-medium">Game Players Union</strong>
          </v-flex>

          <v-flex xs11>
            <div>
             <img src="https://cdn.discordapp.com/attachments/521706386829082626/540180308390314004/Logo.png" width="150" height="75">
            </div>
          </v-flex>
      
       
       <v-flex xl3>
        <v-btn
          v-for="icone in social"
          :key="icone"
          class="mx-3"
          dark
          icon
          :href="icone.link"
        >
          <v-icon size="24px">{{ icone.icon }}</v-icon>
        </v-btn>
       </v-flex>
        </v-layout>
      </v-card-title>

      <v-card-actions class="grey darken-4 justify-center">
        &copy;2019 — <strong primary>GPU Team</strong>
      </v-card-actions>
    </v-card>
  </v-footer>

  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data () {
    return {
      icons: [
        'fab fa-facebook',
        'fab fa-twitter',
        'fab fa-instagram'
      ],
      isVisible: true,
      searchVisible: true,
      social: [
        {
          icon: ' fab fa-facebook-f',
          link: 'https://www.facebook.com/GamePlayerUnion/'
        },
        {
          icon: 'fab fa-instagram',
          link: 'https://www.instagram.com/gameplayerunion/'
        },
        {
          icon: 'fab fa-twitter',
          link: 'https://twitter.com/GamePlayerUnion?s=09'
        }
      ],
      console: [
        {
          icon: 'fab fa-playstation',
          link:""
        },
        {
          icon: 'fab fa-xbox',
          link:""
        },
        {
          icon: 'fab fa-nintendo-switch',
          link:""
        },
        {
          icon: 'fas fa-desktop',
          link:""
        }
      ],
      jeux: [
        {
          title:'Classement',
          link:''
        },
        {
          title:'Tous les jeux',
          link:''
        },
        {
          title:'Nouveautés',
          link:''
        }
      ]
    }
  },
  computed: {
   onScroll() {
      window.onscroll = () => {
        this.scrollFunction();
      }
      }
  },
  methods: {
    scrollFunction (){
       if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("myBtn").style.display = "block";
        } 
        else {
          document.getElementById("myBtn").style.display = "none";
        }
    },
    topFunction () {
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    },
    openForm() {
      document.getElementById("myForm").style.display = "block";
      this.setVisible;
    },
    closeForm() {
      document.getElementById("myForm").style.display = "none";
      this.setVisible();
    },
    setVisible(){
      this.isVisible==false ? this.isVisible=true: this.isVisible=false;
    }
  }
}
</script>
<style src="./css/homepage.css">

</style>
