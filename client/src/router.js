import Vue from 'vue';
import Router from 'vue-router';
import dashboard from './components/dashboard';
import timer from './components/timer';
import todo from './components/todo';

Vue.use(Router)

export default new Router({
  mode:'history',
  routes:[
    {
      path:'/dashboard',
      name:'dashboard',
      component:dashboard
    },
    {
      path:'/timer',
      name:'timer',
      component:timer
    },
    {
      path:'/todo',
      name:'todo',
      component:todo
    },
    {
      path:'*',
      redirect:'/dashboard'
    }
  ]
})


