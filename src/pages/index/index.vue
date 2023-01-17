<template>
  <y-layout menu="index">
    <div class="content-home">
      <div class="content-home-poster">
        <div class="content-home-title text-shadow">
          <h1>一天一步</h1>
          <h3>Yi Tian Yi Bu</h3>
        </div>
        <div class="content-home-tip text-shadow" :class="{'content-home-switch-tip': switchTip}">{{ tip }}</div>
        <div class="content-home-load">
          <div class="content-home-load-text text-shadow">滚动查看更多</div>
          <div class="content-home-load-arrow"></div>
        </div>
        <div class="content-home-cover" :style="'background-image: url(' + imageUrl + ');'"></div>
      </div>
      <!-- 文章 -->
      <div class="content-home-post">
        <y-post v-show="!loading" :info="info"></y-post>
        <y-post-near v-show="!loading" :next="next" :prev="prev"></y-post-near>
      </div>
    </div>
  </y-layout>
</template>

<script>
import YLayout from 'components/layout/layout'
import YPostNear from 'components/post-near/post-near'
import YPost from 'components/post/post'

import { dateFormat } from 'common/js/util'
import CONST from 'api/const'
import api from 'api'

const tips = CONST.tips || []

export default {
  components: {
    YLayout,
    YPostNear,
    YPost
  },
  data () {
    return {
      imageUrl: '',
      tip: '',
      switchTip: false,
      loading: false,
      info: {
        title: null,
        html: null,
        hits: null,
        time: null,
        category: {
          title: null,
          desc: null
        },
        tag: null
      },
      prev: null,
      next: null
    }
  },
  mounted () {
    this.initData()
  },
  methods: {
    initData () {
      this.initBgImage()
      this.sayAWord()
      this.getNewContentInfo()
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
    },
    // 获取最新文章 -> 随机
    getNewContentInfo () {
      this.loading = true
      this._getRandomContentInfo((error, data) => {
        this.loading = false
        if (error) {
          return this.errorTip(error)
        }
        if (data.status.code === 0) {
          data.result.content.html = data.result.content.html.replace(/src="\/images/img, 'src="http://v1.yitianyibu.com/images')
          data.result.content.html = data.result.content.html.replace(/src="\/i\//img, 'src="http://api.yitianyibu.com/i/')
          this.info = {
            title: data.result.content.title || null,
            html: data.result.content.html || null,
            hits: data.result.content.hits || null,
            time: dateFormat(data.result.content.createdAt, 'yyyy-MM-dd'),
            category: {
              title: data.result.category.name || null,
              desc: data.result.category.desc || null,
              link: data.result.category.pathname || data.result.category._id || null
            },
            tag: data.result.content.tag || []
          }
          this.prev = (data.result.near && data.result.near.prev) || null
          this.next = (data.result.near && data.result.near.next) || null
        }
      })
    },
    _getNewContentInfo (callback) {
      api.getNewContentInfo().then(data => {
        callback(null, data)
      }).catch(error => {
        callback(error.status.message)
      })
    },
    _getRandomContentInfo (callback) {
      api.getRandomContentInfo().then(data => {
        callback(null, data)
      }).catch(error => {
        callback(error.status.message)
      })
    },
    errorTip (msg) {
      this.$notify({ type: 'error', title: '错误', text: msg })
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.content-home
  position: relative
  height: 100%
  overflow-y: auto
  .content-home-post
    width: 80%
    max-width: 14.4rem
    margin: 0 auto
  .content-home-poster
    position: relative
    height: 100vh
    width: 100%
    .content-home-title
      position: absolute
      color: #fff
      z-index: 1
      width: 40%
      text-align: center
      height: 0.8rem
      top: 45%
      margin-top: -1rem
      transform: translate(-50%)
      left: 50%
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
    top: 48%
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
  .content-home-load
    z-index: 1
    position: absolute
    bottom: 10%
    transform: translate(-50%)
    left: 50%
    text-align: center
    .content-home-load-text
      font-size: 0.12rem
      color: #fff
      margin-bottom: 0.15rem
    .content-home-load-arrow
      height: 0.18rem
      width: 0.34rem
      background-image: url(../../assets/arrow.png)
      background-repeat: no-repeat
      background-size: cover
      display: inline-block
@media (max-width: 992px)
  .content-home
    .content-home-poster
      .content-home-title
        width: 80%
    .content-home-post
      min-width: 100%
      max-width: 100%
      margin-bottom: 0
</style>
