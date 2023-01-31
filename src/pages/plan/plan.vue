<template>
  <y-layout menu="plan">
    <p class="content-wrapper-title text-right text-shadow">
      手帐
    </p>
    <p class="content-wrapper-desc text-right text-shadow">
      用自己整理的教学文章集合来构成了这本计划预期的手帐。
    </p>
    <hr class="content-wrapper-line right"/>
    <div class="bm-panel mb-1 clearfix">
      <y-loading :loading="initLoading"></y-loading>
      <y-error :error="!initLoading && error"></y-error>
      <div class="content-plan-list" v-if="!initLoading && !error">
        <!-- <router-link tag="a" class="content-plan-list-item" to="/plan/create" v-if="isAuth">
          <div class="content-plan-list-item-cover create">
            <span class="icon-add"></span>
          </div>
        </router-link> -->
        <router-link tag="a" class="content-plan-list-item" v-for="(item, index) in list" :key="index" :to="'/plan/' + item.name">
          <div class="content-plan-list-item-cover" :style="'background: #' + item.color + '; --footer-background: #' + item.color + ';'">
            <div class="content-plan-list-item-header">
              <div class="content-plan-list-item-header-box">
                <span>{{ item.name }}</span>
              </div>
            </div>
            <div class="bubbles">
              <div
                class="bubble"
                v-for="count in 128"
                :style="`--size:${0.2+Math.random()*0.3}rem; --distance:${1+Math.random()*0.4}rem; --position:${-5+Math.random()*110}%; --time:${3+Math.random()*2}s; --delay:${-1*(2+Math.random()*2)}s;`"
              ></div>
            </div>
          </div>
          <!-- <div class="content-plan-list-item-info text-shadow">
            <time>{{ item.time }}</time>
          </div> -->
        </router-link>
      </div>
    </div>
    <svg style="display: none">
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
import YLoading from 'components/loading/loading'
import YError from 'components/error/error'
import api from 'api/github'

export default {
  components: {
    YLayout,
    YLoading,
    YError
  },
  data () {
    return {
      list: [],
      error: false,
      initLoading: true
    }
  },
  activated () {
    this.initData()
  },
  deactivated () {
    this.list = []
    this.initLoading = true
    this.error = false
  },
  methods: {
    initData () {
      this.getCategoryList()
    },
    getCategoryList () {
      this._getCategoryList((error, data) => {
        this.initLoading = false
        if (error) {
          return this.errorTip(error)
        }
        this.list = (data || []).map(item => {
          return item
        })
      })
    },
    _getCategoryList (callback) {
      api.getLabelList().then(data => {
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
.content-plan-list
  margin: -1%
  font-size: 0
  .content-plan-list-item
    display: inline-block
    width: 31%
    margin: 1%
    position: relative
    overflow: hidden
    &:nth-child(3n + 1)
      margin-right: 1.5%
    &:nth-child(3n + 2)
      margin-right: 1.5%
    &:hover
      .content-plan-list-item-cover
        .content-plan-list-item-header
          background-color: #000
          .content-plan-list-item-header-box
            span
              background-color: transparent
              z-index: 1
              transform: scale(1.5)
              &:after
                border-right: 3px solid transparent
                border-bottom: 3px solid transparent
              &:before
                border-left: 3px solid transparent
                border-top: 3px solid transparent
      .bubbles
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
    .content-plan-list-item-info
      font-size: 0.14rem
      color: #fff
      padding: 0.1rem
      line-height: 0.2rem
      position: absolute
      bottom: 0
      left: 0
      right: 0
      background: rgba(0,0,0, 0.3)
    .content-plan-list-item-cover
      width: 100%
      height: 0
      padding-bottom: 51.57% /* 44.57% */
      background-size: cover
      background-position: center
      text-align: center
      position: relative
      filter: grayscale(100%)
      transition: all 0.3s
      &:hover
        filter: grayscale(0%)
      .content-plan-list-item-header
        position: absolute
        top: 0
        left: 0
        right: 0
        bottom: 0
        background-color: rgba(255, 255, 255, 0.3)
        transition: background-color .15s linear
        .content-plan-list-item-header-box
          position: absolute
          height: 0.44rem
          margin-top: -0.22rem
          top: 50%
          width: 100%
          span
            color: #fff
            background-color: rgba(0, 0, 0, 0.7)
            line-height: 0.44rem
            font-size: 0.2rem
            transition: transform .15s linear
            display: inline-block
            padding: 0 2%
            min-width: 50%
            position: relative
            &:after
            &:before
              content: ''
              display: block
              color: #fff
              border: 3px solid rgba(0, 0, 0, 0.7)
              position: absolute
              width: 75%
              height: 50%
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
@media (max-width:768px)
  .content-plan-list
    margin: 0
    .content-plan-list-item
      width: 100%
      margin: 0
      margin-bottom: 5%
      &:nth-child(3n + 1)
        margin-right: 0
      &:nth-child(3n + 2)
        margin-right: 0
.bubbles
  position: absolute
  bottom: -100%
  left:0
  right:0
  height:0
  background: var(--footer-background)
  transition: all 0.3s
  opacity: 0

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
