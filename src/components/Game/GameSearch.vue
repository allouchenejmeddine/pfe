<template>
<v-container>
        <div id="app">
            <div class="search-wrapper">
            <input type="text" v-model="search" placeholder="Search title.."/>
                <label>Search title:</label>
            </div>
            <v-card>
            <div class="wrapper">
                <div class="card" v-for="post in filteredList">
                     <v-card>
                         <v-card-title>
                            <a v-bind:href="post.link" target="_blank">
                            {{ post.title }}
                            </a>
                         </v-card-title>
                         <v-responsive>
                        <img v-bind:src="post.img"/>
                         </v-responsive>
                     </v-card>
                </div>
            </div>
            </v-card>
        </div>
</v-container>
</template>

<script>
class Post {
  constructor(title, link, img) {
    this.title = title;
    this.link = link;
    this.img = img;
  }
}
export default {
    data (){
        return {
            search: '',
            postList : [
            new Post(
                'Vue.js', 
                'https://vuejs.org/',
                'https://vuejs.org//images/logo.png'

            ),
            new Post(
                'React.js', 
                'https://facebook.github.io/react/',
                'https://daynin.github.io/clojurescript-presentation/img/react-logo.png'
            ),
            new Post(
                'Angular.js', 
                'https://angularjs.org/',
                'https://angularjs.org/img/ng-logo.png'
            ),
            new Post(
                'Ember.js', 
                'http://emberjs.com/',
                'http://www.gravatar.com/avatar/0cf15665a9146ba852bf042b0652780a?s=200'
            ),
            new Post(
                'Meteor.js', 
                'https://www.meteor.com/',
                'http://hacktivist.in/introduction-to-nodejs-mongodb-meteor/img/meteor.png'
            ),
            new Post(
                'Aurelia', 
                'http://aurelia.io/',
                'https://cdn.auth0.com/blog/aurelia-logo.png'
            ),
            new Post(
                'Node.js', 
                'https://nodejs.org/en/',
                'https://code-maven.com/img/node.png'
            ),
            new Post(
                'Pusher', 
                'https://pusher.com/',
                'https://avatars1.githubusercontent.com/u/739550?v=3&s=400'
            ),
            new Post(
                'Feathers.js', 
                'http://feathersjs.com/',
                'https://cdn.worldvectorlogo.com/logos/feathersjs.svg'
            ),
        ]
        }
    
  },
  computed: {
    filteredList() {
      return this.postList.filter(post => {
        return post.title.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  }
}

</script>

