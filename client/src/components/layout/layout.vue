<template>
  <div class="app-wrapper">
    <!-- left -->
    <div class="app-wrapper-left">
      <router-link tag="a" class="logo-wrapper" to="/">
        <img class="shadow" src="../../assets/logo@2x.png"/>
      </router-link>
      <y-menus :menu="menu"></y-menus>
      <div class="logo-title text-shadow">
        One step a day
      </div>
    </div>
    <!-- right -->
    <div class="app-wrapper-right">
      <!-- <div class="header-wrapper">header</div> -->
      <div class="content-wrapper clearfix" :class="{'home': ['index', 'login'].indexOf(menu) > -1, 'fade-in': menu !== 'index', 'opacity-in': menu === 'index'}">
        <slot></slot>
      </div>
      <y-footer></y-footer>
    </div>
  </div>
</template>

<script>
import YMenus from 'components/layout/menus'
import YFooter from 'components/layout/footer'
export default {
  components: {
    YMenus,
    YFooter
  },
  props: {
    menu: {
      type: String,
      default: 'index'
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
