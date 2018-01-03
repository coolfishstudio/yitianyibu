<template>
  <y-layout menu="index">
    <div class="content-home">
      <div class="content-home-title">
        <h1>一天一步</h1>
        <h3>Yi Tian Yi Bu</h3>
      </div>
      <div class="content-home-tip text-shadow" :class="{'content-home-switch-tip': switchTip}">{{ tip }}</div>
      <div class="content-home-cover" :style="'background-image: url(' + imageUrl + ');'"></div>
    </div>
  </y-layout>
</template>

<script>
import YLayout from 'components/layout/layout'
import { dateFormat } from 'common/js/util'
import CONST from 'api/const'

const tips = CONST.tips || []

export default {
  components: {
    YLayout
  },
  data () {
    return {
      imageUrl: '',
      tip: '',
      switchTip: false
    }
  },
  mounted () {
    this.initData()
  },
  methods: {
    initData () {
      this.initBgImage()
      this.sayAWord()
      setInterval(() => {
        this.sayAWord()
      }, 10000)
    },
    sayAWord () {
      this.switchTip = true
      setTimeout(() => {
        this.tip = `“${tips[Math.random() * tips.length >> 0]}”`
        this.switchTip = false
      }, 1500)
    },
    initBgImage () {
      let time = dateFormat(null, 'yyyyMMdd')
      this.imageUrl = `http://cn.bing.com/iod/1366/1024/${time}1600`
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.content-home
  position: relative
  height: 100%
  .content-home-title
    position: absolute
    color: #fff
    z-index: 1
    width: 40%
    text-align: center
    height: 0.8rem
    top: 35%
    margin-top: -1rem
    left: 30%
    background-color: rgba(0,0,0,0.6)
    padding: 0.1rem 0
    h1
      font-size: 0.4rem
      letter-spacing: 4px
      line-height: 0.5rem
    h3
      font-size: 0.22rem
      letter-spacing: 4px
      line-height: 0.3rem
  .content-home-tip
    position: absolute
    width: 80%
    left: 50%
    top: 40%
    transform: translate(-50%)
    color: #fff
    text-align: center
    font-size: 0.19rem
    line-height: 1.5
    transition: all .6s ease
    z-index: 1
    &.content-home-switch-tip
      opacity: 0
      transform: translate(-50%,0%) translateY(10px)
  .content-home-cover
    background-position: center center
    background-repeat: no-repeat
    filter: grayscale(100%)
    background-size: cover
    height: 100%
    position: relative
    &:before
      content: ''
      display: block
      position: absolute
      left: 0
      top: 0
      width: 100%
      height: 100%
      z-index: 0
      background-image: url(./image/mask.png)
</style>
