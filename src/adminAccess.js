import { store } from './store'

export default ( to , from , next) => {

    if(store.getters.user == null)
    {
        setTimeout(function(){
            if (store.getters.user.isAdmin==true){
                next(next);
            }
            else{
                document.title = from.meta.title;
                next('/404');
            }
            alert(store.getters.user.isAdmin)
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
