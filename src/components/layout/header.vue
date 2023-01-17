<template>
  <div class="header text-shadow">
    <div class="menu menu-left" @click="back">
      <y-icon name="left" width="22" height="22" />
    </div>
    <h1 class="menu-text" @click="gotoIndex">一天一步</h1>
    <div class="menu menu-right">
      <y-icon name="menu" v-if="!isTransparent" width="22" height="22" @click="openMenus"/>
      <y-icon name="menu-w" v-if="isTransparent" width="22" height="22" @click="openMenus"/>
    </div>
  </div>
</template>

<script>
import YIcon from 'components/icon/icon'

export default {
  components: {
    YIcon
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    isTransparent: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    back () {
      this.$router.back()
    },
    gotoIndex () {
      this.$router.push('/')
    },
    openMenus () {
      this.$emit('openMenus')
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable"
.header
  display: none
  width: 100%
  position: fixed
  height: 0.44rem
  line-height: .44rem
  text-align: center
  color: #292929
  background: #fff
  font-size: .18rem
  z-index: 100
  top: 0
  &.home
    background: transparent
    .menu-text
    .menu-left
      display: none
  .menu
    position: absolute
    top: 0
    font-size: 0
    padding: 0.105rem
    width: 0.23rem
    height: 0.23rem
    &.menu-right
      right: 0
    &.menu-left
      left: 0
@media (max-width: 992px)
  .header
    display: block
</style>
