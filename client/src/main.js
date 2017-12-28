import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import { device } from 'common/js/util'

import Notifications from 'vue-notification'

import 'common/stylus/index.styl'

// 根据ua 处理移动端适配
if (device.isPC()) {
  document.documentElement.style.fontSize = '100px'
} else {
  var deviceWidth = document.documentElement.clientWidth
  if (deviceWidth > 420) {
    deviceWidth = 420
  }
  document.documentElement.style.fontSize = deviceWidth / 3.75 + 'px'
}
document.body.style.display = 'none'
setTimeout(function () {
  document.body.style.display = 'block'
}, 10)

fastclick.attach(document.body)

Vue.config.productionTip = false

Vue.use(Notifications)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
