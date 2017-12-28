<template>
  <div class="menus-wrapper">
    <nav>
      <router-link tag="a" v-for="(item, index) in list" :key="index" :class="{'on': menu === item.menu}" :to="item.to || ''">{{ item.title }}</router-link>
    </nav>
  </div>
</template>

<script>
export default {
  props: {
    menu: {
      type: String,
      default: 'index'
    }
  },
  data () {
    return {
      list: []
    }
  },
  mounted () {
    this._initData()
  },
  methods: {
    _initData () {
      let list = []
      list.push({ title: 'Home', menu: 'index', to: '/index' })
      // list.push({ title: 'Plan', menu: 'plan', to: '/plan' })
      // list.push({ title: 'Lab', menu: 'lab', to: '/lab' })
      // list.push({ title: 'Archive', menu: 'archive', to: '/p' })
      list.push({ title: 'Message', menu: 'message', to: '/message' })
      this.list = list
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable"
.menus-wrapper
  position: absolute
  top: 1.3rem
  left: 0
  width: 100%
  bottom: 0.50rem
  border-bottom: 1px solid $color-border
  nav
    height: 100%
    width: 100%
    overflow-x: hidden
    overflow-y: auto
    a
      position: relative
      display: block
      width: 100%
      line-height: 0.8rem
      color: rgba(0, 0, 0, 0.3)
      text-align: center
      font-size: 0.2rem
      transition: all 0.5s
      cursor: pointer
      &.on
      &:hover
        color: rgba(0, 0, 0, 1)
      &:after
      &:before
        content: ''
        display: block
        background-color: currentColor
        position: absolute
        width: 0
        height: 0.04rem
        margin: auto
        transition: all 0.5s
      &:after
        bottom: 0.2rem
        right: 50%
      &:before
        bottom: 0.2rem
        left: 50%
      &.on:after
      &.on:before
      &:hover:after
      &:hover:before
        color: rgba(0, 0, 0, 1)
        width: 0.1rem
</style>
