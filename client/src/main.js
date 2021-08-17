import Vue from 'vue';
import App from './App.vue';
import router from './router';

//load router.js
Vue.use(router);

//config
Vue.config.productionTip = false

//create vue instance
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
