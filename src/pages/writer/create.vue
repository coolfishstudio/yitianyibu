<template>
  <y-layout menu="plan">
    <div class="bm-panel plan-content shadow text-shadow">
      <h1>写文章</h1>
      <y-input name="title" v-model="title" placeholder="请输入标题"></y-input>
      <y-input name="tag" v-model="tag" placeholder="请输入标签，逗号分隔"></y-input>
      <y-editor name="content" placeholder="编辑器" ref="editor"></y-editor>
      <y-button @submit="submit"></y-button>
    </div>
  </y-layout>
</template>

<script>
import YLayout from 'components/layout/layout'
import YButton from 'components/button/button'
import YInput from 'components/input/input'
import YEditor from 'components/editor/editor'
import api from 'api'

export default {
  components: {
    YLayout,
    YButton,
    YInput,
    YEditor
  },
  data () {
    return {
      loading: false,
      title: null,
      tag: null,
      markdown: null
    }
  },
  activated () {
    this.clearData()
  },
  methods: {
    clearData () {
      this.title = null
      this.tag = null
      this.markdown = null
      this.$refs.editor.set('')
    },
    submit () {
      this.markdown = this.$refs.editor.get()
      if (this._validate()) {
        this._insertContent({
          category: this.$route.params.id,
          title: this.title,
          tag: this.tag,
          markdown: this.markdown
        }, (error, data) => {
          if (error) {
            return this.errorTip(error)
          }
          if (data.status.code === 0) {
            this.successTip('创建成功')
            setTimeout(() => {
              this.$router.back()
            }, 1000)
          }
        })
      }
    },
    _validate () {
      if (!this.title) {
        this.warnTip('请输入标题')
        return false
      }
      if (!this.tag) {
        this.warnTip('请输入标签')
        return false
      }
      if (!this.markdown) {
        this.warnTip('请输入内容')
        return false
      }
      return true
    },
    _insertContent (option, callback) {
      api.insertContent(option).then(data => {
        callback(null, data)
      }).catch(error => {
        callback(error.status.message)
      })
    },
    successTip (msg) {
      this.$notify({ type: 'success', title: '成功', text: msg })
    },
    warnTip (msg) {
      this.$notify({ type: 'warn', title: '警告', text: msg })
    },
    errorTip (msg) {
      this.$notify({ type: 'error', title: '错误', text: msg })
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.plan-content
  padding: 3% 4% 4%
  h1
    letter-spacing: 2px
    font-size: 0.40rem
    padding-bottom: 3%
    margin-bottom: 4%
    border-bottom: 1px dashed #ddd
    color: rgba(0,0,0,0.75)
    text-align: center
  .btn
    width: 100%
    margin: 0 auto
@media (max-width: 768px)
  .plan-content
    margin-top: 0.5rem
    margin-bottom: 0
    .input
      padding-right: 0
    .btn
      width: 100%
</style>
