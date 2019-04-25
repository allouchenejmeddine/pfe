import { store } from './src/store'
export default ( to , from , next) => {
    if (store.getters.user){
        next(next);
    }
    else{
        document.title = from.meta.title;
        next('/');
    }
}
