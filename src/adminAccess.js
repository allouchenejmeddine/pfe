import { store } from './store'

export default ( to , from , next) => {

    if(store.getters.user == null)
    {
        setTimeout(function(){
            // check if user is connected after store charged
            if(!store.getters.user){
                next('/404')
            }
            else{
                if (store.getters.user.isAdmin==true){
                    next(next);
                }
                else{
                    document.title = from.meta.title;
                    next('/404');
                }
                alert(store.getters.user.isAdmin)
            }
            
        },2000)
    }
    else{
        if (store.getters.user.isAdmin==true){
            next(next);
        }
        else{
            document.title = from.meta.title;
            next('/404');
        }
    }
}
