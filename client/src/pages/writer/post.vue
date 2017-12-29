<template>
  <y-layout menu="plan">
    <div class="bm-panel post-content shadow text-shadow">
      <div class="post-header">
        <h1 class="post-title">N-Crawler-02 Iconv-lite解决乱码</h1>
        <div class="post-meta">
          <span class="post-time">发表于 2017-04-07</span>
          <span>151 次浏览</span>
            <span class="post-category">所属于 <font>Node.js</font>
          </span>
        </div>
      </div>
      <div class="post-body">
        <div class="markdown-text">
          <p>
            在上一篇文章里面我们成功的拿到了数据，但是通过观察数据会发现，该数据出现了中文乱码。
  那么本篇文章就是在test1.js的基础上,处理解决乱码问题。
  通过
            <code>iconv-lite</code>这个第三方库解决乱码问题，
  使用方式很简单：
          </p>
          <ul>
            <li>首先让request请求的返回直接buffer</li>
            <li>然后 iconv.decode(body, ‘gb2312’) 即可</li>
          </ul>
          <p>
            代码如下：
          </p>
          <pre>
            <code>// 加载第三方库
  var request = require('request'),
      iconv = require('iconv-lite');
  // 要抓取的url
  var url = 'http://www.xiaohuar.com/list-1-0.html';
  // 开始抓取
  request.get({
      url: url,
      encoding: null // buffer
  }, function (err, response, body) {
      if (!err &amp;&amp; response.statusCode === 200) {
          body = iconv.decode(body, 'gb2312');// 处理转码问题
          console.log(body);// 请求页面返回的html数据
      } else {
          console.error('请求失败', err);
      }
  });
            </code>
          </pre>
          <p>
            为了区分，我们保存为test2.js，运行一下这个文件<code>node test2.js</code>
          </p>
          <p>
            <img src="http://yitianyibu.com/images/content/96382bfac020a09d72b09b96750a1b4b.png" alt="rrrr.png">
          </p>
          <p>
            我们可以看到 乱码问题已经解决了。
          </p>
          <p>
            相关代码：<a href="https://github.com/coolfishstudio/N-Crawler/blob/master/test2.js">https://github.com/coolfishstudio/N-Crawler/blob/master/test2.js</a>
          </p>
        </div>
      </div>
      <div class="post-bar">
        <div class="post-like"><span class="heart" id="heart"></span></div>
        <a class="name">Node：爬虫</a>
        <div class="plan">从零开始 一步步教你学会 使用node制作爬虫项目 抓取校花网的照片。</div>
      </div>
    </div>
    <y-post-near></y-post-near>
    <y-comment-list v-if="false"></y-comment-list>
    <y-comment-create></y-comment-create>
  </y-layout>
</template>

<script>
import YLayout from 'components/layout/layout'
import YCommentCreate from 'components/comment/create'
import YCommentList from 'components/comment/list'
import YPostNear from 'components/post-near/post-near'
export default {
  components: {
    YLayout,
    YCommentCreate,
    YCommentList,
    YPostNear
  },
  methods: {
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
      margin-right: 0.1rem
.post-body
  padding: 2% 4%
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
      border-left: 4px solid #009a61
      padding: 0 0.1rem 0 0.2rem
      margin: 0.25rem 0
      margin-left: -0.23rem
      font-style: italic
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
    &:after
      content: ''
      display: block
      width: 0.7rem
      height: 0.7rem
      border-radius: 0.7rem
      background-color: #fff
      position: absolute
      border: 1px dashed #ddd
      left: 50%
      margin-left: -0.35rem
  .name
    color: #293846
    font-weight: 700
    font-size: 0.18rem
  .plan
    margin-top: 0.16rem
    margin-bottom: 0.3rem
    font-size: 0.14rem
    color: #7f8c8d
.heart
  position: absolute
  top: 0.3rem
  left: 50%
  margin-left: -0.1132rem
  display: block
  transform: rotate(45deg)
  -webkit-transform: rotate(45deg)
  cursor: pointer
  width: 0.24rem
  height: 0.24rem
  z-index: 1
  background-color: #e3e3e3
  transition: background-color .3s linear
  &:hover
    background-color: #dd4b39
    &:after
    &:before
      background-color: #dd4b39
  &:after
  &:before
    content: ''
    display: block
    position: absolute
    border-radius: 50%
    width: 0.24rem
    height: 0.24rem
    background-color: #e3e3e3
    transition: background-color .3s linear
  &:before
    bottom: 0
    left: -0.12rem
  &:after
    top: -0.12rem
    right: 0
</style>
