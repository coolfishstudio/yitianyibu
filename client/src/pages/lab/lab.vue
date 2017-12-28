<template>
  <y-layout menu="lab">
    <p class="content-wrapper-title text-right">
      实验
    </p>
    <p class="content-wrapper-desc text-right">
      方轮子、圆轮子，能跑的就是好轮子。
    </p>
    <hr class="content-wrapper-line right"/>
    <div class="bm-panel content-lab-list">
      <a href="http://coolfishstudio.github.io/game-xmlk/" class="content-lab-list-item shadow" v-for="(item, index) in 6" :key="index">
        <div style="background-image: url(http://yitianyibu.com/images/homepage/apps/1495596878623_cover.png)" class="content-lab-list-item-img"></div>
        <div class="content-lab-list-item-text">
          <p class="content-lab-list-item-title">
            消灭蓝块
          </p>
          <p class="content-lab-list-item-time">
            2016
          </p>
          <p class="content-lab-list-item-desc">
            无意间翻出2015年写的一个小游戏，请用手机模式，点击蓝块，最后满屏红块即为赢。
          </p>
        </div>
      </a>
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
@import "~common/stylus/variable"
.content-lab-list
  .content-lab-list-item
    display: block
    margin-bottom: 0.3rem
    background: #ffffff
    width: 100%
    height: 0
    padding-bottom: 24%
    cursor: pointer
    position: relative
    .content-lab-list-item-img
      position: absolute
      top: 0
      left: 0
      bottom: 0
      width: 80%
      background-size: cover
      background-position: center
      background-color: #f2f2f2
    .content-lab-list-item-text
      position: absolute
      top: 0
      right: 0
      bottom: 0
      width: 20%
      .content-lab-list-item-title
        padding-top: 0.40rem
        padding-bottom: 0
        font-size: 0.16rem
        color: $color-text-title
        text-align: center
      .content-lab-list-item-time
        margin-top: 0.1rem
        color: $color-text-caption
        text-align: center
        font-size: 0.12rem
      .content-lab-list-item-desc
        padding: 0.2rem 0.4rem 0 0.4rem
        color: $color-text-body
        font-size: 0.13rem
        word-break: break-all
</style>
