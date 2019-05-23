import {store} from '../../store'
export default ( to , from , next)=>{
    if(store.state.loadedAllGames.length===0){
        alert('here')
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
        alert('here2')
        next(next)
    }
}