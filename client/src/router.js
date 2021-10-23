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
      beforeEnter(from,to,next){
        if(store.getters.idToken){
          next()
        }else{
          alert('access denied');
          next('/login');
        }
      }
    },
    {
      path:'/timer',
      name:'timer',
      component:timer,
      beforeEnter(from,to,next){
        if(store.getters.idToken){
          next()
        }else{
          alert('access denied');
          next('/login');
        }
      }
    },
    {
      path:'/todo',
      name:'todo',
      component:todo,
      beforeEnter(from,to,next){
        if(store.getters.idToken){
          next()
        }else{
          alert('access denied');
          next('/login');
        }
      }
    },
    {
      path:'/login',
      name:'login',
      component:login,
    },
    {
      path:'/register',
      name:'register',
      component:register,
    },
    {
      path:'*',
      redirect:'/login'
    },
  ]
})


