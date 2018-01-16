import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import { device } from 'common/js/util'

import Notifications from 'vue-notification'

import 'common/stylus/index.styl'

import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

Vue.use(mavonEditor)

const NODE_ENV = process.env.NODE_ENV || 'development'

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

// 百度统计
if (NODE_ENV === 'production') {
  const hmSite = '362807aa3174bef7d10276019cb0d733'

  let hmSrc = `https://hm.baidu.com/hm.js?${hmSite}`

  let _hmt = []
  let hm = document.createElement('script')
  hm.src = hmSrc
  let s = document.getElementsByTagName('script')[0]
  s.parentNode.insertBefore(hm, s)

  router.beforeEach((to, from, next) => {
    _hmt.push(['_trackPageview', to.path])
    next()
  })
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
