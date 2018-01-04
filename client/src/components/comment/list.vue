<template>
  <div class="bm-panel content-comment-list shadow">
    <div class="content-comment-list-item" v-for="(item, index) in list" :key="index">
      <div class="content-comment-list-item-meta">
        <div class="content-comment-list-item-meta-author">
          {{ item.name }}
          <span v-if="isAuth">[<a class="span-btn" @click="remove(item._id)">删除</a>]</span>
        </div>
        <time itemprop="dateCreated" :data-value="item.createdAt" :title="item.createdAt">{{ item.time }}</time>
      </div>
      <div class="content-comment-list-item-text text-shadow">
        <span>{{ item.content }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: null,
    isAuth: false
  },
  methods: {
    remove (val) {
      this.$emit('remove', val)
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable"
.content-comment-list
  font-size: 0.18rem
  display: block
  padding: 2%
  .content-comment-list-item
    border-top: 1px dashed #e3e3e3
    padding: 10px 5px
    &:first-child
      border-top: none
      padding: 0 5px 10px 5px
    .content-comment-list-item-meta
      word-wrap: break-word
      word-break: break-all
      overflow: hidden
      .content-comment-list-item-meta-author
        float: left
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
    .content-comment-list-item-text
      word-wrap: break-word
      word-break: break-all
      color: #666
      font-size: .16rem
      line-height: 1.5
</style>
