import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 安装并配置$api
import $api from './request/api'
Vue.prototype.$api = $api

// 安装配置moment
import moment from 'moment'
Vue.prototype.moment = moment

// 引入vant
import Vant from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant);

// 引入常用弹窗控件
import {Toast} from 'vant'
Vue.prototype.$toast = Toast

import 'vant/lib/index.less'


import { Lazyload } from 'vant'
Vue.use(Lazyload)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
