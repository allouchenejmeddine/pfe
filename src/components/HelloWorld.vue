<template>
  <v-container fluid fill-height>
  <v-layout >
    <v-flex xs12 sm8 offset-sm2 md8 offset-md2>
    <v-card raised tile v-for="(item,i) in infos"
               :key="i"
               :src="item">
      <v-card-title primary-title>
        {{item.title}}  
      </v-card-title>
       <v-img src="https://firebasestorage.googleapis.com/v0/b/gpufinal.appspot.com/o/ar.jpg?alt=media&token=f1130270-8636-4fba-8cc4-41ebe3f8bbea"></v-img>
      <v-card-actions>
          <v-btn flat color="orange" >Share</v-btn>
          <v-btn flat color="orange" :href="item.page" >Explore</v-btn>
      </v-card-actions>
    </v-card>
    </v-flex>
  </v-layout>
  </v-container>
  
 
  </template>

<script>
  export default {
    data: () => ({
      infos: [
        {
          title: 'Article 1',
          text: 'Nunc vero inanes flatus quorundam vile esse quicquid extra urbis pomerium nascitur aestimant praeter orbos et caelibes, nec credi potest qua obsequiorum diversitate coluntur homines sine liberis Romae.',
          image: 'https://firebasestorage.googleapis.com/v0/b/gpufinal.appspot.com/o/ar.jpg?alt=media&token=f1130270-8636-4fba-8cc4-41ebe3f8bbea',
          page:'https://google.com'
          
        },
        {
          title: 'Article 1',
          text: 'Nunc vero inanes flatus quorundam vile esse quicquid extra urbis pomerium nascitur aestimant praeter orbos et caelibes, nec credi potest qua obsequiorum diversitate coluntur homines sine liberis Romae.',
          image: 'https://firebasestorage.googleapis.com/v0/b/gpufinal.appspot.com/o/ar.jpg?alt=media&token=f1130270-8636-4fba-8cc4-41ebe3f8bbea',
          page:'https://google.com'
        },
        { 
          title: 'Article 1',
          text: 'Nunc vero inanes flatus quorundam vile esse quicquid extra urbis pomerium nascitur aestimant praeter orbos et caelibes, nec credi potest qua obsequiorum diversitate coluntur homines sine liberis Romae.',
          image: 'https://firebasestorage.googleapis.com/v0/b/gpufinal.appspot.com/o/ar.jpg?alt=media&token=f1130270-8636-4fba-8cc4-41ebe3f8bbea',
          page:'https://google.com'
          
        },
        { 
          title: 'Article 1',
          text: 'Nunc vero inanes flatus quorundam vile esse quicquid extra urbis pomerium nascitur aestimant praeter orbos et caelibes, nec credi potest qua obsequiorum diversitate coluntur homines sine liberis Romae.',
          image: 'https://firebasestorage.googleapis.com/v0/b/gpufinal.appspot.com/o/ar.jpg?alt=media&token=f1130270-8636-4fba-8cc4-41ebe3f8bbea',
          page:'https://google.com'
          
        }
      ]
    })
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
