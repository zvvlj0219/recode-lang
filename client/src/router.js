import Vue from 'vue';
import Router from 'vue-router';
import dashboard from './components/dashboard';
import timer from './components/timer';
import todo from './components/todo';

//load vue-router
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
      component:todo,
      children:[
        {
          path:'/JavaScript',
          name:'JavaScript',
          component:()=> import(/* webpackChunkName:"js"*/ 
          './components/languages/JavaScript')
        },
        {
          path:'/Node.js',
          name:'Node.js',
          component:()=>import(/* webpackChunkName:"node"*/ 
          './components/languages/Node')
        },
        {
          path:'/TypeScript',
          name:'TypeScript',
          component:()=>import(/* webpackChunkName:"ts"*/ 
          './components/languages/TypeScript')
        },
        {
          path:'/React.js',
          name:'React.js',
          component:()=>import(/* webpackChunkName:"react"*/ 
          './components/languages/React')
        },
        {
          path:'/Vue.js',
          name:'Vue.js',
          component:()=>import(/* webpackChunkName:"vue"*/ 
         './components/languages/Vue')
        },
      ]
    },
  ]
})


