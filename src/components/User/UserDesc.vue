<template>
    <div>
        <span>{{this.pseudo}}</span>
    </div>
</template>
<script>
import firebase from 'firebase/app'
export default {
    props: ["id"],
    data (){
        return {
            idd : this.id,
            user : null,
            pseudo : 'hhhh'
        }
    },
    created:function() {
            firebase.database().ref('/comptes').orderByChild("id").equalTo(this.id).once("value",snapshot => {
            alert('im here ')
            if (snapshot.exists()){
                this.user = snapshot.val();
                this.pseudo=snapshot.child(this.id).child('pseudo').val()
            }
            else{
                this.$router.push('/404')
            }
            })
    }
    
}
</script>
