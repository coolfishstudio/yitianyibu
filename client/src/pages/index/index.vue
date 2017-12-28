<template>
  <y-layout menu="index">
    <div class="content-home">
      <div class="content-home-title">
        <h1>一天一步</h1>
        <h3>Yi Tian Yi Bu</h3>
      </div>
      <div class="content-home-cover" :style="'background-image: url(' + imageUrl + ');'"></div>
    </div>
  </y-layout>
</template>

<script>
import YLayout from 'components/layout/layout'
import { dateFormat } from 'common/js/util'

export default {
  components: {
    YLayout
  },
  data () {
    return {
      imageUrl: ''
    }
  },
  mounted () {
    this.initData()
  },
  methods: {
    initData () {
      this._initBgImage()
    },
    _initBgImage () {
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
    top: 50%
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
