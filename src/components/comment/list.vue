<template>
  <div class="content-comment-list">
    <div class="content-comment-list-item" v-for="(item, index) in list" :key="index">
      <div class="content-comment-list-item-meta">
        <div class="content-comment-list-item-meta-author">
          <img :src="`${item.user.avatar_url}&size=32`" />
          <span>{{ item.user.login }}</span>
        </div>
        <time itemprop="dateCreated" :data-value="item.createdAt" :title="item.createdAt">{{ item.time }}</time>
        <span>{{ index + 1 }}楼</span>
      </div>
      <div class="content-comment-list-item-text text-shadow">
        <div class="markdown-body" v-html="item.body_html">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: null
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable"
.content-comment-list
  font-size: 0.18rem
  display: block
  padding: 2% 4%
  .content-comment-list-item
    border-top: 1px dashed #e3e3e3
    padding: 10px 0
    &:first-child
      border-top: none
      padding: 0 0 10px 0
    .content-comment-list-item-meta
      word-wrap: break-word
      word-break: break-all
      overflow: hidden
      .content-comment-list-item-meta-author
        float: left
        line-height: 0.24rem
        font-size: 0
        img
          width: 0.2rem;
          height: 0.2rem;
          border-radius: 0.14rem;
          border: 1px solid #e3e3e3;
          vertical-align: middle;
          margin-right: 0.04rem;
        span
          vertical-align: middle;
          font-size: .14rem
          line-height: 0.24rem
          color: #999
        .span-btn
          margin: 0 3px
          font-size: 12px
          cursor: pointer
          &:hover
            color: #f04134
      time
        float: right
        font-size: .14rem
        line-height: 0.24rem
        color: #999
      span
        float: right
        font-size: .14rem
        line-height: 0.24rem
        color: #999
        margin-right: 0.08rem
    .content-comment-list-item-text
      word-wrap: break-word
      word-break: break-all
      color: #666
      font-size: .16rem
      line-height: 1.5
      margin-top: 0.04rem
@media (max-width: 992px)
  .content-comment-list
    padding-left: 0
    padding-right: 0
</style>
