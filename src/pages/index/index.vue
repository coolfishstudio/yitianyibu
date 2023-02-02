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
      <div class="content-home-post mb-1" v-if="!initLoading && !error">
        <y-post v-show="!loading" :info="info"></y-post>
        <y-comment-list v-if="comments.length > 0" :list="comments"></y-comment-list>
      </div>
    </div>
  </y-layout>
</template>

<script>
import YLayout from 'components/layout/layout'
import YCommentList from 'components/comment/list'
import YPost from 'components/post/post'

import { dateFormat } from 'common/js/util'
import CONST from 'api/const'
import api from 'api/github'

const tips = CONST.tips || []

export default {
  components: {
    YLayout,
    YCommentList,
    YPost
  },
  data () {
    return {
      initLoading: true,
      error: false,
      imageUrl: '',
      tip: '',
      switchTip: false,
      loading: false,
      info: {
        title: null,
        html: null,
        hits: null,
        time: null,
        category: [],
        tag: null
      },
      // prev: null,
      // next: null,
      comments: []
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
    // 获取最新文章
    getNewContentInfo () {
      this.loading = true
      this._getNewContentInfo((error, list) => {
        if (error) {
          this.initLoading = false
          this.loading = false
          return this.errorTip(error)
        }
        const data = list[0] || {}
        if (data.number) {
          this._getComments(data.number, (_error, comments) => {
            this.loading = false
            this.initLoading = false
            if (_error) {
              return this.errorTip(_error)
            }
            this.comments = (comments || []).map(i => {
              i.time = dateFormat(data.created_at, 'yyyy-MM-dd hh:mm:ss', true)
              return i
            })
            this.info = {
              title: data.title || null,
              html: data.body_html || null,
              hits: data.comments || null,
              time: dateFormat(data.created_at, 'yyyy-MM-dd hh:mm:ss', true),
              category: data.labels || [],
              // tag: data.result.content.tag || []
              tag: data.labels || []
            }
            // this.prev = (data.result.near && data.result.near.prev) || null
            // this.next = (data.result.near && data.result.near.next) || null
          })
        }
      })
    },
    _getNewContentInfo (callback) {
      api.getNewIssues().then(data => {
        callback(null, data)
      }).catch(error => {
        callback(error.message)
      })
    },
    _getComments (id, callback) {
      api.getComments(id).then(data => {
        callback(null, data)
      }).catch(error => {
        callback(error.message)
      })
    },
    errorTip (msg) {
      this.$notify({ type: 'error', title: '错误', text: msg })
      this.error = true
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
    margin-left: auto
    margin-right: auto
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
