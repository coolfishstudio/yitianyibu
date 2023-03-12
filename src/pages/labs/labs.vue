<template>
  <y-layout menu="labs">
    <p class="content-wrapper-title text-right text-shadow">
      实验
    </p>
    <p class="content-wrapper-desc text-right text-shadow">
      方轮子、圆轮子，能跑的就是好轮子。
    </p>
    <hr class="content-wrapper-line right"/>
    <div class="bm-panel content-labs-list">
      <a @click="gotoUrl(item.url)" class="content-labs-list-item shadow" v-for="(item, index) in list" :key="index">
        <div class="content-labs-list-item-img">
          <span>{{ item.name }}</span>
        </div>
        <div class="content-labs-list-item-text text-shadow">
          <p class="content-labs-list-item-title">{{ item.name }}</p>
          <p class="content-labs-list-item-time">{{ item.time }}</p>
          <p class="content-labs-list-item-desc">{{ item.desc }}</p>
        </div>
      </a>
    </div>
  </y-layout>
</template>

<script>
import YLayout from 'components/layout/layout'
import { labsData } from './map'

export default {
  components: {
    YLayout
  },
  data () {
    return {
      list: (labsData || []).filter(i => !i.hide)
    }
  },
  methods: {
    gotoUrl (url) {
      window.open(url)
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable"
.content-labs-list
  .content-labs-list-item
    display: block
    margin-bottom: 0.3rem
    width: 100%
    height: auto
    cursor: pointer
    position: relative
    overflow: hidden
    &:hover
      .content-labs-list-item-img
        span
          text-shadow: 0 0 0.35rem currentColor
          font-size: 0.36rem
    &.create
      .content-labs-list-item-img
        background-color: transparent
    .content-labs-list-item-img
      float: left
      padding-bottom: 24%
      width: 80%
      background-size: cover
      background-position: center
      background-color: rgba(0,0,0,0.85)
      transition: all 0.5s
      position: relative
      span
        font-size: 0.32rem
        position: absolute
        top: 50%
        left: 50%
        transform: translate(-50%,-50%)
        font-weight: 500
        transition: all 0.5s
        color: #fff
        width: 90%
        text-align: center
        white-space: pre
    .content-labs-list-item-text
      float: left
      width: 20%
      text-align: center
      position: relative
      .content-labs-list-item-title
        padding-top: 0.40rem
        padding-bottom: 0
        font-size: 0.16rem
        color: $color-text-title
      .content-labs-list-item-time
        margin-top: 0.1rem
        color: $color-text-caption
        font-size: 0.12rem
      .content-labs-list-item-desc
        text-align: left
        padding: 0.15rem 0.13rem
        color: $color-text-body
        font-size: 0.13rem
        word-break: break-word
        line-height: 0.18rem
@media (max-width: 992px)
  .content-labs-list
    .content-labs-list-item
      .content-labs-list-item-img
      .content-labs-list-item-text
        width: 100%
      .content-labs-list-item-img
        padding-bottom: 44.57%
      .content-labs-list-item-text
        padding: 0.1rem 0
        line-height: 1.5
        text-align: left
        .content-labs-list-item-title
          padding-top: 0
          padding-left: 0.1rem
        .content-labs-list-item-time
          margin-top: 0
          position: absolute
          top: -0.28rem
          right: 0.1rem
          color: #fff
          font-weight: 500
        .content-labs-list-item-title
          display: none
        .content-labs-list-item-desc
          padding-top: 0
          padding-bottom: 0
</style>
