import { store } from './store'
export default ( to , from , next) => {
    if (store.getters.user !== null){
        next(next)
        alert(store.getters.user)
        console.log('anything')
    }
    else{
        document.title = from.meta.title;
        next('/')
        console.log("hello world!")
    }
}
