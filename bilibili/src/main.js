import Vue from 'vue'
import App from './App.vue'
import router from './router'

//引入vant组件
import Vant from 'vant'
import 'vant/lib/index.css'

//引入提示组件
import {Toast} from 'vant'


import http from 'network/request.js'
Vue.prototype.$http = http;//导入原型
Vue.prototype.$msg = Toast;
Vue.use(Vant);
//Vue.use(Toast);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
