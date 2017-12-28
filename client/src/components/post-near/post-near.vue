<template>
  <div class="post-near text-shadow clearfix">
    <div class="post-near-prev shadow">
      <a href="/post/58e6758bfea18f6804916bda">N-Crawler-01 Request请求</a>
    </div>
    <div class="post-near-next shadow">
      <a href="/post/58e762dbab09425c53011313">N-Crawler-03 Cheerio解析页面</a>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.post-near
  margin: 0 1.5%
  font-size: 0
  .post-near-prev
    margin-right: 4%
    a
      &:before
        content: 'Prev'
        right: .05rem
      &:after
        left: 0
        border-left: .1rem solid currentColor
        border-right: .1rem solid transparent
  .post-near-next
    text-align: right
    a
      &:before
        content: 'Next'
        left: .05rem
      &:after
        right: 0
        border-right: .1rem solid currentColor
        border-left: .1rem solid transparent
  .post-near-prev
  .post-near-next
    display: inline-block
    width: 48%
    font-size: .15rem
    vertical-align: middle
    background-color: #fff
    position: relative
    a
      display: block
      padding: .2rem
      color: #666
      overflow: hidden
      text-overflow: ellipsis
      white-space: nowrap
      position: relative
      height: .2rem
      line-height: .2rem
      &:hover
        color: #2ecc40
      &:before
      &:after
        color: currentColor
        display: block
        position: absolute
        bottom: 0
        font-size: .12rem
        transition: border-color .3s ease
      &:after
        content: ''
        border-bottom: .1rem solid currentColor
        border-top: .1rem solid transparent
</style>
