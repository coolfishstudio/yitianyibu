<template>
  <y-layout menu="plan">
    <div class="bm-panel plan-list-content" v-if="info.name">
      <div class="plan-list-header" :style="'--footer-background: #' + info.color + ';'">
        <div class="plan-list-title">
          <span>
            {{ info.name }}
          </span>
        </div>
        <div class="bubbles">
          <div
            class="bubble"
            v-for="count in 128"
            :style="`--size:${2+Math.random()*3}rem; --distance:${1+Math.random()*0.8}rem; --position:${-5+Math.random()*110}%; --time:${3+Math.random()*2}s; --delay:${-1*(2+Math.random()*2)}s;`"
          ></div>
        </div>
      </div>
      <div class="plan-list-items text-shadow">
        <blockquote v-if="info.desc">
          <p>
            {{ info.desc }}
          </p>
        </blockquote>
        <router-link tag="a" class="plan-list-post-item" v-for="(item, index) in list" :key="index" :to="'/p/'+ item.number">
          <div class="plan-list-post-title" :class="{'strikethrough': item.state !== 'open'}">
            {{ item.title }}
          </div>
          <div class="plan-list-post-time">
            <time>{{ item.time }}</time>
          </div>
        </router-link>
      </div>
    </div>
    <svg>
      <defs>
        <filter id="blob">
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur"></feGaussianBlur>
          <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="blob"></feColorMatrix>
        </filter>
      </defs>
    </svg>
  </y-layout>
</template>

<script>
import YLayout from 'components/layout/layout'
import api from 'api/github'
import { dateFormat } from 'common/js/util'

export default {
  components: {
    YLayout
  },
  data () {
    return {
      info: {},
      list: [],
      page: 1,
      per_page: 30,
      total: 0,
      loading: false
    }
  },
  activated () {
    this.initData()
  },
  deactivated () {
    this.page = 1
    this.list = []
    this.info = {}
    this.total = 0
    this.loading = false
  },
  methods: {
    initData () {
      this.getIssueList()
    },
    getIssueList () {
      if (this.loading) {
        return null
      }
      this.loading = true
      this._getLabel((_error, info) => {
        if (_error) {
          this.loading = false
          return this.errorTip(_error)
        }
        this._getIssueList((error, data) => {
          this.loading = false
          if (error) {
            return this.errorTip(error)
          }
          this.info = info
          console.log('--=', info)
          this.list = this.list.concat(data.items || []).map(item => {
            item.time = dateFormat(item.created_at, 'yyyy-MM-dd hh:mm')
            return item
          })
          this.page = this.page + 1
          this.total = data.total_count || 0
        })
      })
    },
    _getLabel (callback) {
      api.getLabel(this.$route.params.id).then(data => {
        callback(null, data)
      }).catch(error => {
        callback(error.status.message)
      })
    },
    _getIssueList (callback) {
      api.getIssueList({
        label: this.$route.params.id,
        page: this.page,
        per_page: this.per_page
      }).then(data => {
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
.plan-list-content
  .plan-list-items
    padding: 1% 0% 3%
    blockquote
      padding: .15rem .2rem
      border-left: 5px solid #ccc
      background-color: #f8f8f8
      margin: .2rem 0
      p
        margin: 0
        font-size: .15rem
        color: #333
        line-height: 2
        word-break: break-all
        font-style: italic
    .plan-list-post-create
      padding: .12rem
      height: 0.22rem
      position: relative
      display: block
      margin: 0.2rem 0
    .plan-list-post-item
      border-bottom: 1px solid #eee
      font-size: .16rem
      padding: .12rem
      overflow: hidden
      display: block
      color: #666
      &:last-child
        border-bottom: 0
      &:hover
        .plan-list-post-title
          border-left: 3px solid #2ecc40
          color: #26272b
        .plan-list-post-time
          color: #2ecc40
      .plan-list-post-title
        display: inline-block
        padding-left: .15rem
        border-left: 3px solid #fff
        line-height: normal
      .plan-list-post-time
        float: right
        min-width: 1.5rem
        time
          vertical-align: middle
          margin-right: .05rem
  .plan-list-header
    background-size: cover
    background-position: center
    padding-bottom: 32.73%
    height: 0
    position: relative
    background-color: #000
    transition: all 0.3s
    overflow: hidden
    .bubbles
      position: absolute
      left:0
      right:0
      background: var(--footer-background)
      transition: all 0.3s
      opacity: 1
      filter:url("#blob")
      bottom: 0;
      height: 25%
      .bubble {
        position: absolute;
        left:var(--position, 50%);
        background:var(--footer-background);
        border-radius:100%;
        animation:bubble-size var(--time, 4s) ease-in infinite var(--delay, 0s),
            bubble-move var(--time, 4s) ease-in infinite var(--delay, 0s);
        transform:translate(-50%, 100%);
      }
    .plan-list-title
      position: absolute
      height: 0.84rem
      margin-top: -0.42rem
      top: 50%
      width: 100%
      text-align: center
      z-index: 1
      span
        color: #fff
        background-color: rgba(255, 255, 255, 0.3)
        line-height: 0.84rem
        font-size: 0.35rem
        font-weight: inherit
        display: inline-block
        padding: 0 2%
        min-width: 50%
        position: relative
        &:after
        &:before
          content: ''
          display: block
          color: #fff
          border: 3px solid rgba(255, 255, 255, 0.3)
          position: absolute
          width: 75%
          height: 50%
          transition: border-color .15s linear
        &:before
          top: -6px
          left: -6px
          border-right: 3px solid transparent
          border-bottom: 3px solid transparent
        &:after
          bottom: -6px
          right: -6px
          border-left: 3px solid transparent
          border-top: 3px solid transparent
@media (max-width: 992px)
  .plan-list-content
    padding-top: 5%
    .plan-list-items
      padding-left: 0
      padding-right: 0
      .plan-list-post-item
        &:hover
          .plan-list-post-title
            color: inherit
            border-color: #fff
        .plan-list-post-title
          padding-left: 0
@media (max-width:768px)
  .plan-list-content
    .plan-list-items
      .plan-list-post-item
        .plan-list-post-time
          display: none
    .plan-list-header
      .plan-list-title
        height: 0.44rem
        margin-top: -0.22rem
        span
          line-height: 0.44rem
          font-weight: inherit
          font-size: 0.2rem

@keyframes bubble-size {
  0%, 75% {
    width:var(--size, 4rem)
    height:var(--size, 4rem)
  }
  100% {
    width:0rem
    height:0rem
  }
}
@keyframes bubble-move {
  0% {
    bottom: 0rem
  }
  100% {
    bottom:var(--distance, 3rem)
  }
}
</style>
