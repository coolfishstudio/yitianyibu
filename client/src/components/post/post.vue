<template>
  <div class="bm-panel post-content text-shadow">
    <div>
      <div class="post-header">
        <h1 class="post-title">{{ info.title }}</h1>
        <div class="post-meta">
          <span class="post-time">发表于 {{ info.time }}</span>
          <span>{{ info.hits }} 次浏览</span>
          <br class="post-tags-br"/>
          <span class="post-tags" v-for="(item, index) in info.tag">{{ item }}</span>
        </div>
      </div>
      <div class="post-body" v-html="info.html">
      </div>
      <div class="post-bar">
        <div class="post-like">
          <div class="share">
            <svg t="1514966401073" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1881" xmlns:xlink="http://www.w3.org/1999/xlink" width="36" height="36">
              <path d="M896 927.954H128c-17.673 0-32-14.327-32-32v-320c0-8.836 7.163-16 16-16s16 7.164 16 16v304c0 8.837 7.163 16 16 16h736c8.837 0 16-7.163 16-16v-304c0-8.837 7.164-16 16-16 8.837 0 16 7.163 16 16v320c0 17.673-14.327 32-32 32zM524.167 741.953c6.248 6.248 6.248 16.379 0 22.627s-16.379 6.248-22.628 0c-6.248-6.248-6.248-16.379 0-22.627 6.249-6.249 16.38-6.249 22.628 0z m-12.021-491.036c8.836 0 16 7.163 16 16l0.707 373.156c0 8.837-7.163 16-16 16s-16-7.164-16-16l-0.707-373.156c0-8.836 7.164-16 16-16z m181.02 58.371L523.46 139.582c-6.248-6.248-16.379-6.248-22.627 0L331.834 308.581c-6.248 6.248-16.379 6.248-22.627 0-6.248-6.248-6.248-16.379 0-22.627l180.312-180.312c12.497-12.497 32.758-12.497 45.255 0l181.019 181.019c6.248 6.248 6.248 16.379 0 22.627-6.248 6.248-16.379 6.248-22.627 0z" p-id="10813"></path>
            </svg>
          </div>
        </div>
        <router-link tag="a" class="name" :to="'/plan/' + info.category.link">
          {{ info.category && info.category.title }}
        </router-link>
        <router-link tag="a" class="plan" :to="'/plan/' + info.category.link">
          {{ info.category && info.category.desc }}
        </router-link>
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
      color: #999
      background: #f8f8f8
      font-size: 12px
      line-height: 16px
      padding: 1px 7px
      border-radius: 4px
      border: 1px solid #ccc
      margin-right: 0.05rem
    .post-tags-br
      display: none
.post-body
  padding: 0% 4% 2%
  .markdown-text
    border-top: 1px dashed #ddd
    font-size: .16rem
    color: #293846
    line-height: 1.7
    word-break: break-all
    overflow: hidden
    width: 100%
    padding-bottom: .16rem
    padding-top: 0.1rem
    h1
    h2
    h3
    h4
    h5
    h6
      +p
        margin-top: 0.1rem
    h1
      font-size: 0.28rem
      margin-top: 0.4rem
      margin-bottom: 0.1rem
    h2
      font-size: 0.24rem
      margin-top: 0.4rem
      margin-bottom: 0.1rem
    h3
      font-size: 0.18rem
      margin-top: 0.4rem
      margin-bottom: 0.1rem
    p
      margin-bottom: 0.3rem
      margin-top: 0.3rem
      text-align: left
    a
      color: #009a61
      text-decoration: none
      border-bottom: 1px dashed #009a61
      &:hover
        color: #004e31
        border-bottom: 1px dashed #004e31
    code
      font-size: 0.14rem
      padding: 1px 4px
      border-radius: 3px
      margin: 0 3px
      background-color: #f7f7f7
      color: #009a61
    pre
      margin: 0
      line-height: 0
      code
        color: inherit
        font-size: 0.14rem
        margin: 0
        padding: 0.1rem 0.15rem
        border-radius: 6px
        border: 2px dashed #eee
        background-color: #fcfcfc
        display: block
        overflow: auto
        line-height: 1.7
    blockquote
      padding: 0.15rem 0.2rem
      border-left: 5px solid #ccc
      background-color: #f8f8f8
      margin: 0.2rem 0
      p
        margin: 0
    table
      font-size: 0.14rem
      width: 100%
      border-width: 1px
      border-color: #ddd
      border-collapse: collapse
      th
        padding: 5px
        border: 1px solid #ddd
        background-color: #eee
      td
        padding: 5px
        border: 1px solid #ddd
        background-color: #fcfcfc
    ul
      list-style: circle
      padding-left: 0.4rem
      li
        list-style: circle
        margin: 0.05rem 0
    ol
      padding-left: 0.4rem
      li
        list-style: cjk-ideographic
        list-style: outside
        list-style: inherit
        margin: 0.05rem 0
    hr
      margin: 0.25rem 0
      border: 0
      border-top: 1px dashed #ddd
    img
      margin: 0.3rem auto
      max-width: 100%
      display: block
      border-radius: 5px
    strong
      font-weight: bold
.post-bar
  padding: 2% 4%
  background-color: #fff
  text-align: center
/*  border-top: 1px dashed #e3e3e3*/
  .post-like
    width: 100%
    height: 1.1rem
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
    margin-bottom: 0.3rem
    font-size: 0.14rem
    color: #7f8c8d
@media (max-width: 992px)
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
    .post-meta
      span
        margin-bottom: 0.1rem
      .post-tags-br
        display: block
</style>
