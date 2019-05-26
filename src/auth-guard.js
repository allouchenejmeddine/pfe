import { store } from './store'

export default ( to , from , next) => {

    if(store.getters.user == null)
    {
    setTimeout(function(){
    if (store.getters.user){
        next(next);
    }
    else{
        document.title = from.meta.title;
        next('/signin');
    }},1700)
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
