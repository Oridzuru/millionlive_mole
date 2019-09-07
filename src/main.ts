import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

import axios from '@/axios.ts';
import elementUI from 'element-ui';

import 'element-ui/lib/theme-chalk/index.css';

import Echart from 'echarts';


Vue.use(elementUI);
Vue.prototype.axios = axios;
Vue.prototype.$echarts = Echart;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
