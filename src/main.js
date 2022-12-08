import Vue from 'vue'
import App from './App.vue'

// 将http挂载到原型上
import http from './utils/request'
Vue.prototype.$http = http

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
