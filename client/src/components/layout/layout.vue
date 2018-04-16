<template>
  <div class="app-wrapper">
    <y-header :class="{'home': menu === 'index'}" :isTransparent="menu === 'index'" @openMenus="openSideBar"></y-header>
    <!-- left -->
    <div class="app-wrapper-menus" :class="{'side-bar': isOpenSideBar}">
      <div class="sidebar-close" @click="closeSideBar">
        <y-icon name="close-w" width="22" height="22" />
      </div>
      <router-link tag="a" class="logo-wrapper" to="/">
        <img class="shadow" src="../../assets/logo@2x.png"/>
      </router-link>
      <y-menus :menu="menu" @clickMenus="closeSideBar"></y-menus>
      <div class="logo-title text-shadow">
        One step a day
      </div>
    </div>
    <div class="app-wrapper-mask" :class="{'side-bar': isOpenSideBar}"></div>
    <!-- right -->
    <div class="app-wrapper-main">
      <div class="content-wrapper clearfix" :class="{'login': menu === 'login', 'home': menu === 'index', 'fade-in': menu !== 'index', 'opacity-in': menu === 'index'}">
        <slot></slot>
      </div>
      <y-footer :class="{'home': menu === 'index'}"></y-footer>
    </div>
  </div>
</template>

<script>
import YMenus from 'components/layout/menus'
import YFooter from 'components/layout/footer'
import YHeader from 'components/layout/header'
import YIcon from 'components/icon/icon'
export default {
  components: {
    YMenus,
    YFooter,
    YHeader,
    YIcon
  },
  props: {
    menu: {
      type: String,
      default: 'index'
    }
  },
  data () {
    return {
      isOpenSideBar: false
    }
  },
  methods: {
    openSideBar () {
      this.isOpenSideBar = true
    },
    closeSideBar () {
      this.isOpenSideBar = false
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.fade-in
  animation: fade-in .5s
@keyframes fade-in
  0%
    opacity: 0
    transform: translateY(20px)
  100%
    opacity: 1
    transform: translateY(0px)
.opacity-in
  animation: opacity .5s
@keyframes opacity
  0%
    opacity: 0
  100%
    opacity: 1
</style>
