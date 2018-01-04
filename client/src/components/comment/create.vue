<template>
  <div class="bm-panel content-comment-creat shadow">
    <div class="content-comment-creat-meta">
      <div class="content-comment-creat-name">
        <input class="form-control" v-model="name" type="text" name="name" placeholder="昵称[111.207.128.*]">
      </div>
      <div class="content-comment-creat-email">
        <input class="form-control" v-model="email" type="text" name="email" placeholder="邮箱">
      </div>
    </div>
    <div class="content-comment-creat-textarea">
      <textarea class="form-control" v-model="content" placeholder="写下你的评论..." name="content"></textarea>
    </div>
    <div class="content-comment-creat-submit text-shadow">
      <button class="btn-submit" @click="submit">提交</button>
    </div>
  </div>
</template>

<script>
import YLayout from 'components/layout/layout'
export default {
  components: {
    YLayout
  },
  data () {
    return {
      name: '',
      email: '',
      content: ''
    }
  },
  methods: {
    submit () {
      if (this._validate()) {
        this.$emit('submit', {
          name: this.name,
          email: this.email,
          content: this.content
        })
      }
    },
    reset () {
      this.name = ''
      this.email = ''
      this.content = ''
    },
    _validate () {
      if (this.email && !/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(this.email)) {
        this.warnTip('您的邮箱格式错误')
        return false
      }
      if (!this.content || !this.content.trim().length) {
        this.warnTip('请输入您的留言内容')
        return false
      }
      return true
    },
    warnTip (msg) {
      this.$notify({ type: 'warn', title: '警告', text: msg })
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable"
.content-comment-creat
  margin-top: 0.4rem
  padding: 2%
  .content-comment-creat-meta
    font-size: 0
    margin-bottom: 0.15rem
    .content-comment-creat-name
    .content-comment-creat-email
      display: inline-block
      width: 49%
      font-size: 0.14rem
      .form-control
        width: 96%
        padding: 0.07rem 2%
    .content-comment-creat-name
      margin-right: 2%
  .content-comment-creat-textarea
    margin-bottom: 0.15rem
    textarea
      height: 1.2rem
      border: 1px dashed #e3e3e3
      background-image: url(../../assets/text_cover.png)
      background-repeat: no-repeat
      background-position: right bottom
      background-size: 100px
  .content-comment-creat-submit
    .btn-submit
      display: inline-block
      border: 1px dashed #e3e3e3
      color: #222
      background-color: #fff
      width: 100%
      padding: 0.1rem 0.2rem
      font-size: 0.14rem
      font-weight: 400
      border-radius: 3px
      cursor: pointer
      transition: border-color 0.2s linear, color 0.2s linear, background-color 0.2s linear
      &:hover
        color: #e3e3e3
        border: 1px solid #222
        background-color: #222222
</style>
