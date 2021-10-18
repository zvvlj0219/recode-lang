import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/index'

//load router.js
Vue.use(router);

//config
Vue.config.productionTip = false

//create vue instance
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
