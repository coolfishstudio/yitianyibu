<template>
  <y-layout menu="plan">
    <div class="bm-panel plan-list-content shadow text-shadow">
      <div class="plan-list-header" style="background-image: url(http://yitianyibu.com/images/homepage/default/poster/small/9.jpg);">
        <div class="plan-list-cover">
        </div>
        <div class="plan-list-title">
          <span>Node: 爬虫</span>
        </div>
      </div>
      <div class="plan-list-content">
        <blockquote>
          <p>
            从零开始 一步步教你学会 使用node制作爬虫项目 抓取校花网的照片。
          </p>
        </blockquote>
        <router-link tag="a" class="plan-list-post-item" v-for="(item, index) in 9" :key="index" to="/p/58e8a86aab09425c53011316">
          <div class="plan-list-post-title">
            N-Crawler-06 Path&amp;Fs下载图片
          </div>
          <div class="plan-list-post-time">
            <time>2017-04-08 17:07</time>
          </div>
        </router-link>
      </div>
    </div>
  </y-layout>
</template>

<script>
import YLayout from 'components/layout/layout'
export default {
  components: {
    YLayout
  },
  methods: {
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.plan-list-content
  .plan-list-content
    padding: 1% 4% 3%
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
    .plan-list-post-item
      border-bottom: 1px solid #eee
      font-size: .14rem
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
        time
          margin-right: .05rem
  .plan-list-header
    background-color: #fff
    background-size: cover
    background-position: center
    padding-bottom: 32.73%
    height: 0
    position: relative
    .plan-list-cover
      position: absolute
      top: 0
      left: 0
      right: 0
      bottom: 0
      background-color: rgba(255, 255, 255, 0.25)
    .plan-list-title
      position: absolute
      height: 0.84rem
      margin-top: -0.42rem
      top: 50%
      width: 100%
      text-align: center
      span
        color: #fff
        background-color: rgba(0, 0, 0, 0.7)
        line-height: 0.84rem
        font-size: 0.35rem
        font-weight: 100
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
          z-index: 1
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
</style>
