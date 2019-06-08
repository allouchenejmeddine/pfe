import {store} from '../../store'
export default ( to , from , next)=>{
    if(store.getters.user == null)
    {
        store.watch(
            function(state){
                return state.user
            },
            function(){
                if(store.state.user !== null){
                    next(next)
                }
            }
        )
        setTimeout(function(){
            if(store.state.user==null){
                next('/signin')
            }
        },3000);
    }
    else{
        if (store.getters.user){
            next(next);
        }
        else{
            document.title = from.meta.title;
            next('/signin');
        }
    }
}