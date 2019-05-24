import { store } from './store'
export default ( to , from , next)=>{
        store.watch(
            (state)=>state.loadedAllGames,
            (value)=>{
                if (value.length> 0){
                    setTimeout(function(){ if(store.state.user !== null){
                        next(next)
                    }
                    else{
                        next('/')
                    } }, 0);
                }
                else{
                    console.log("here")

                }
                
            }
        )
    
    
}
