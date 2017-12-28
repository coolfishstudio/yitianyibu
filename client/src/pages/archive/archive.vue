<template>
  <y-layout menu="archive">
    <p class="content-wrapper-title text-right">
      归档
    </p>
    <p class="content-wrapper-desc text-right">
      这3年我写了<b>91</b>篇文章，所有的文章都能在这里找到。
    </p>
    <hr class="content-wrapper-line right"/>
    <ul class="bm-panel content-archive-list">
      <li class="content-archive-list-item shadow" v-for="(item, index) in 4" :key="index">
        <div class="content-archive-year">2017</div>
        <ul class="content-archive-list-articles">
          <li class="content-archive-list-articles-item" v-for="(item, index) in 9" :key="index">
            <span class="content-archive-list-articles-item-date">2017-02-26</span>
            <router-link tag="a" class="content-archive-list-articles-item-title" to="/p/58e8a86aab09425c53011316">
              CSS让段落开头自动空两格代码
            </router-link>
          </li>
        </ul>
      </li>
    </ul>
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
.content-archive-list
  .content-archive-list-item
    margin-bottom: 0.4rem
    padding: 2%
    .content-archive-year
      margin: 0.15rem 0
      color: $color-text-title
      font-size: 0.2rem
      font-weight: 700
    .content-archive-list-articles
      .content-archive-list-articles-item
        margin-bottom: 0.1rem
        line-height: 0.2rem
        .content-archive-list-articles-item-date
          color: $color-text-caption
          margin-right: 0.2rem
          font-style: italic
          font-size: 0.16rem
        .content-archive-list-articles-item-title
          color: #666
          border-bottom: 1px dashed $color-text-title
          font-size: 0.16rem
          &:hover
            color: #26272b
            border-bottom-color: #26272b
</style>
