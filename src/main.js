import Vue from 'vue'
import App from './App.vue'

// 将http挂载到原型上
import http from './utils/request'
Vue.prototype.$http = http

import router from './router'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)
// 全局事件总线
Vue.prototype.$eventBus = new Vue()

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
