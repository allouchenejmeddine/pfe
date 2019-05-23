import {store} from '../../store'
export default ( to , from , next)=>{
    if(store.state.loadedAllGames.length===0){
        store.watch(
            (state)=>state.loadedAllGames,
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
    else{
        next(next)
    }
}