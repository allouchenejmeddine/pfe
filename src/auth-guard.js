import { store } from './store'
export default ( to , from , next) => {
    if (store.getters.user != null){
        next(next)
        console.log('anything')
    }
    else{
        next('/')
        console.log("hello world!")
    }
}
