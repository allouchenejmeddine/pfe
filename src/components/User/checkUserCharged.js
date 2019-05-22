import {store} from '../../store'
export default ( to , from , next)=>{
    if(store.state.user==null){
        store.watch(
            (state)=>state.user,
            (value)=>{
                if (value!= null){
                    next(next)
                }
                else{
                    alert('Votre profil se charge')
                }
            }
        )
    }
}