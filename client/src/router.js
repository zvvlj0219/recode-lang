import Vue from 'vue';
import Router from 'vue-router';
import dashboard from './components/dashboard';
import timer from './components/timer';
import todo from './components/todo';
import login from './view/login';
import register from './view/register';

//load vue-router
Vue.use(Router);

//import vuex store
import store from './store/index';

export default new Router({
  mode:'history',
  routes:[
    {
      path:'/dashboard',
      name:'dashboard',
      component:dashboard,
      beforeEnter(to,from,next){
        if(store.getters.idToken){
          next();//あればaboutを閲覧できる
        }else {
          next('/login'); // なければログインをやり直し
        }
      }
    },
    {
      path:'/timer',
      name:'timer',
      component:timer,
      beforeEnter(to,from,next){
        if(store.getters.idToken){
          next();//あればaboutを閲覧できる
        }else {
          next('/login'); // なければログインをやり直し
        }
      }
    },
    {
      path:'/todo',
      name:'todo',
      component:todo,
      beforeEnter(to,from,next){
        if(store.getters.idToken){
          next();//あればaboutを閲覧できる
        }else {
          next('/login'); // なければログインをやり直し
        }
      }
    },
    {
      path:'/login',
      name:'login',
      component:login,
      beforeEnter(to,from,next){
        if(store.getters.idToken){
          next('/dashboard'); //あればホームにもどれる
        }else{
          next() //idTokenがなければそのままloginにいる
        }
      }
    },
    {
      path:'/register',
      name:'register',
      component:register,
      beforeEnter(to,from,next){
        if(store.getters.idToken){
          next('/dashboard'); //あればホームにもどれる
        }else{
          next() //idTokenがなければそのままloginにいる
        }
      }
    },
    {
      path:'*',
      redirect:'/dashboard'
    },
  ]
})


