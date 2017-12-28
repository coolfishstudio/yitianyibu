import Vue from 'vue'
import Router from 'vue-router'
import { device } from 'common/js/util'

import Index from 'pages/index/index'
import Plan from 'pages/plan/plan'
import PlanList from 'pages/plan/list'
import Archive from 'pages/archive/archive'
import Lab from 'pages/lab/lab'
import Message from 'pages/message/message'
import Post from 'pages/writer/post'
import Login from 'pages/login/login'

Vue.use(Router)

let routes = [{ path: '/', component: Index },
  { path: '/index', redirect: '/' },
  { path: '/plan', component: Plan },
  { path: '/plan/:id', component: PlanList },
  { path: '/p', component: Archive },
  { path: '/p/:id', component: Post },
  { path: '/lab', component: Lab },
  { path: '/message', component: Message },
  { path: '/login', component: Login }]

export default new Router({
  mode: 'history',
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (!device.isPC()) {
      return false
    }
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})
