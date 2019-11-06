import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

import axios from '@/axios.ts';
import elementUI from 'element-ui';

import 'element-ui/lib/theme-chalk/index.css';


let echarts = require('echarts/lib/echarts');
// line-charts
require('echarts/lib/chart/line')
// echarts-component
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
require('echarts/lib/component/legend')
require('echarts/lib/component/legendScroll')
require('echarts/lib/component/markArea')
require('echarts/lib/component/markLine')

Vue.use(elementUI);
Vue.prototype.axios = axios;
Vue.prototype.$echarts = echarts

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
