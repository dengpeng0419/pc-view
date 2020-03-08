import Vue from 'vue'
import { Button, Select, Option, Icon, Input } from 'element-ui';
import App from './App.vue'
import router from './router'
import store from './store'
import ECharts from 'vue-echarts' // refers to components/ECharts.vue in webpack

import ajax from '@/components/Ajax'
import toast from '@/components/toast'
import loading from '@/components/loading'

// import ECharts modules manually to reduce bundle size
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/bar' 
import 'echarts/lib/chart/map'
import 'echarts/lib/chart/scatter'
import 'echarts/lib/chart/effectScatter'
import 'echarts/lib/component/geo'
import 'echarts/lib/chart/gauge'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/title'
import 'echarts/lib/component/tooltip'
import chinaMap from './assets/data/china.json'
import xinjiangMap from './assets/data/xinjiang.json'

ECharts.registerMap('china', chinaMap)
ECharts.registerMap('xinjiang', xinjiangMap)

// register component to use
Vue.component('v-chart', ECharts)

Vue.component(Button.name, Button);
Vue.component(Select.name, Select);
Vue.component(Option.name, Option);
Vue.component(Input.name, Input);
Vue.component(Icon.name, Icon);

Vue.config.productionTip = false
Vue.prototype.$ajax = ajax
Vue.prototype.$toast = toast;
Vue.prototype.$loading = loading;

import watermark from './components/waterMark.js'
Vue.prototype.$watermark = watermark

const water = sessionStorage.getItem('water')
if (water) {
  watermark.set('water1', water, 0)
  // watermark.set('water2', water, 250)
  const element=document.getElementById("water1")
  element.style.display = 'none'
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
