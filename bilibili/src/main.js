import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
//引入vant组件
import Vant from 'vant'
import 'vant/lib/index.css'
//引入提示组件
import {Toast} from 'vant'
//懒加载组件
import lazyLoad from 'vue-lazyload'

import http from 'network/request.js'
Vue.prototype.$http = http;//导入原型
Vue.prototype.$msg = Toast;
Vue.use(Vant);


Vue.use(lazyLoad, {
  loading: require('./assets/img/default.jpg'),
  error: require('./assets/img/error.jpg')
})//安装懒加载插件
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
