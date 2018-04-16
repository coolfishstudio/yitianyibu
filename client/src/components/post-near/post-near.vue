<template>
  <div class="post-near text-shadow clearfix">
    <div class="post-near-prev near-panel">
      <a v-if="prev" :href="'/p/' + prev._id">
        <y-icon-prev></y-icon-prev>
        <b class="post-near-text">{{ prev.title }}</b>
        <b class="post-near-default">上一页</b>
      </a>
      <span v-if="!prev">
        <y-icon-prev></y-icon-prev>
        <b>没有上一页了</b>
      </span>
    </div>
    <div class="post-near-next near-panel">
      <a v-if="next" :href="'/p/' + next._id">
        <b class="post-near-text">{{ next.title }}</b>
        <b class="post-near-default">下一页</b>
        <y-icon-next></y-icon-next>
      </a>
      <span v-if="!next">
        <b>没有下一页了</b>
        <y-icon-next></y-icon-next>
      </span>
    </div>
  </div>
</template>

<script>
import YIconPrev from 'components/icon/icon-prev'
import YIconNext from 'components/icon/icon-next'
export default {
  components: {
    YIconPrev,
    YIconNext
  },
  props: {
    prev: null,
    next: false
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.post-near
  margin: 0 1.5% 0.4rem
  font-size: 0
  .post-near-prev
    margin-right: 4%
  .post-near-next
    text-align: right
  .post-near-prev
  .post-near-next
    display: inline-block
    width: 48%
    font-size: .15rem
    vertical-align: middle
    background-color: #fff
    position: relative
    a
    span
      display: block
      padding: .2rem
      color: #666
      overflow: hidden
      text-overflow: ellipsis
      white-space: nowrap
      position: relative
      height: .22rem
      line-height: .22rem
      .icon
        display: inline-block
        vertical-align: middle
        fill: currentColor
      b
        display: inline-block
        vertical-align: middle
        margin: 0 5px
        &.post-near-default
          display: none
    a
      &:hover
        color: #2ecc40
    span
      color: #aaa
@media (max-width: 992px)
  .post-near
    margin: 0 5% 0.4rem
@media (max-width:768px)
  .post-near
    .post-near-prev
    .post-near-next
      a
        b
          &.post-near-text
            display: none
          &.post-near-default
            display: inline-block
</style>
