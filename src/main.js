import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/styles/index.scss';
// 公共样式
import 'normalize.css/normalize.css'

import App from './App';
import router from './router';
import store from './store';
import VCharts from 'v-charts'; // 图表插件
Vue.use(VCharts);


import '@/styles/index.scss'

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