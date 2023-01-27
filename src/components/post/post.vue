<template>
  <div class="post-content text-shadow">
    <div>
      <div class="post-header">
        <h1 class="post-title">{{ info.title }}</h1>
        <div class="post-meta">
          <span class="post-time">发表于 {{ info.time }}</span>
          <span v-if="info.hits">{{ info.hits }} 次评论</span>
          <br class="post-tags-br"/>
          <span class="post-tags" v-for="(item, index) in info.tag" :style="'background: #' + item.color + ';'" >{{ item.name }}</span>
        </div>
      </div>
      <div class="post-body">
        <div class="markdown-body" v-html="info.html">
        </div>
      </div>
      <div class="post-bar">
        <div class="post-like">
          <div class="share">
            <svg t="1514966401073" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1881" xmlns:xlink="http://www.w3.org/1999/xlink" width="36" height="36">
              <path d="M896 927.954H128c-17.673 0-32-14.327-32-32v-320c0-8.836 7.163-16 16-16s16 7.164 16 16v304c0 8.837 7.163 16 16 16h736c8.837 0 16-7.163 16-16v-304c0-8.837 7.164-16 16-16 8.837 0 16 7.163 16 16v320c0 17.673-14.327 32-32 32zM524.167 741.953c6.248 6.248 6.248 16.379 0 22.627s-16.379 6.248-22.628 0c-6.248-6.248-6.248-16.379 0-22.627 6.249-6.249 16.38-6.249 22.628 0z m-12.021-491.036c8.836 0 16 7.163 16 16l0.707 373.156c0 8.837-7.163 16-16 16s-16-7.164-16-16l-0.707-373.156c0-8.836 7.164-16 16-16z m181.02 58.371L523.46 139.582c-6.248-6.248-16.379-6.248-22.627 0L331.834 308.581c-6.248 6.248-16.379 6.248-22.627 0-6.248-6.248-6.248-16.379 0-22.627l180.312-180.312c12.497-12.497 32.758-12.497 45.255 0l181.019 181.019c6.248 6.248 6.248 16.379 0 22.627-6.248 6.248-16.379 6.248-22.627 0z" p-id="10813"></path>
            </svg>
          </div>
        </div>
        <div class="post-category">
          <span class="post-category-item" v-for="tag in info.category">
            <router-link tag="a" class="name" :to="'/plan/' + tag.name">
              {{ tag.name }}
            </router-link>
            <router-link tag="a" class="plan" :to="'/plan/' + tag.name">
              {{ tag.description || tag.name }}
            </router-link>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    info: null
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.post-header
  background-color: #fff
  padding: 3% 4% 2%
  color: #222
  .post-title
    color: #333
    font-size: 0.3rem
    font-weight: 700
    line-height: 0.42rem
  .post-meta
    display: block
    font-size: .14rem
    margin-top: .1rem
    color: #7f8c8d
    span
      margin-right: 0.15rem
      vertical-align: middle
      display: inline-block
    .post-tags
      color: #fff
      background: #f8f8f8
      font-size: 12px
      line-height: 16px
      padding: 1px 7px
      border-radius: 4px
      margin-right: 0.05rem
      font-weight: 600
    .post-tags-br
      display: none
.post-body
  padding: 0% 4% 2%
  .markdown-body
    border-top: 1px dashed #ddd
    padding-bottom: .16rem
    padding-top: 0.24rem
.post-bar
  padding: 2% 4%
  background-color: #fff
  text-align: center
/*  border-top: 1px dashed #e3e3e3*/
  .post-like
    width: 100%
    height: 0.7rem
    position: relative
    &:before
      content: ''
      display: block
      border-top: 1px dashed #ddd
      width: 100%
      position: absolute
      left: 0
      right: 0
      margin-top: 0.36rem
    .share
      width: 0.7rem
      height: 0.7rem
      border-radius: 0.7rem
      background-color: #fff
      position: absolute
      border: 1px dashed #ddd
      left: 50%
      margin-left: -0.35rem
      cursor: pointer
      color: #2ecc40
      transition: all .3s linear
      &:hover
        background-color: #2ecc40
        color: #fff
      svg
        margin: 0.16rem auto
        fill: currentColor
  .name
    color: #293846
    font-weight: 700
    font-size: 0.18rem
  .plan
    display: block
    margin-top: 0.16rem
    font-size: 0.14rem
    color: #7f8c8d
  .post-category
    display: flex
    margin-bottom: 0.4rem;
    margin-top: 0.3rem;
    .post-category-item
      flex: 1
      margin: 0.1rem 0
      border-right: 1px dashed #ddd
      &:last-child
        border-right: none
@media (max-width: 992px)
  .post-header
    padding: 3% 0 2%
  .post-content
    margin-top: 0.5rem
    margin-bottom: 0
    .post-title
    .post-body
    .post-bar
      padding-left: 0
      padding-right: 0
@media (max-width:768px)
  .post-header
    padding: 3% 0 2%
    .post-meta
      span
        margin-bottom: 0.1rem
      .post-tags-br
        display: block
</style>
