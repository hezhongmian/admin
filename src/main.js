import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/styles/index.scss';

import App from './App';
import router from './router';
import store from './store';

import '@/icons';
import '@/permission';

Vue.use(ElementUI);


Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router, 
  store,
  template: '<App/>',
  components: { App }
})