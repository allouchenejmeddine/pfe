import { store } from './store'
export default ( to , from , next)=>{
    alert(store.state.user.pseudo)
        store.watch(
            (state)=>state.user,
            (value)=>{
                alert(value)
                if (value !== null){
                    setTimeout(function(){ if(store.state.user !== null){
                        //next(next);
                        console.log("here");
                    }
                    else{
                        next('/');
                    } }, 0);
                }
                else{
                    console.log("here")
                    
                }
                
            },
            
        )
    
    
}
