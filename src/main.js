// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueSocketio from 'vue-socket.io'
import './main.css'
import './plugins/loading.css'

Vue.use(VueSocketio, 'http://socketserver.com:1923')
Vue.config.productionTip = false
Vue.config.devtools = true
Vue.config.errorHandler = function (err, vm, info) {
  console.log(err, vm, info)
  // this.$comfun.consoleBeautiful(this, '发现异常', null, null, {
  //   'err': err,
  //   'vm': vm,
  //   'info': info
  // }, 'error')
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
