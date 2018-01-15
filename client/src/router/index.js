import Vue from 'vue'
import Router from 'vue-router'

import Index from 'pages/index/index'
import Plan from 'pages/plan/plan'
import PlanList from 'pages/plan/list'
import PlanCreate from 'pages/plan/create'
import Archive from 'pages/archive/archive'
import Labs from 'pages/labs/labs'
import LabsCreate from 'pages/labs/create'
import Message from 'pages/message/message'
import Post from 'pages/writer/post'
import PostCreate from 'pages/writer/create'
import Login from 'pages/login/login'

Vue.use(Router)

let routes = [{ path: '/', component: Index },
  { path: '/index', redirect: '/' },
  { path: '/plan', component: Plan },
  { path: '/plan/create', component: PlanCreate },
  { path: '/plan/:id', component: PlanList },
  { path: '/plan/:id/create', component: PostCreate },
  { path: '/p', component: Archive },
  { path: '/p/:id', component: Post },
  { path: '/labs', component: Labs },
  { path: '/labs/create', component: LabsCreate },
  { path: '/message', component: Message },
  { path: '/login', component: Login },
  { path: '*', redirect: '/' }]

export default new Router({
  mode: 'history',
  routes,
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
