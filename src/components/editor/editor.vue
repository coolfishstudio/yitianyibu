<template>
  <div class="editor">
    <mavon-editor v-model="value" :toolbars="toolbars" @imgAdd="uploadImage" ref="md"/>
  </div>
</template>
<script>
import api from 'api'

export default {
  data () {
    return {
      value: '',
      toolbars: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        preview: true, // 预览
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true // 清空
      }
    }
  },
  methods: {
    set (value) {
      this.value = value
    },
    get () {
      return this.value
    },
    uploadImage (pos, image) {
      if (this._validateUploadImage(image)) {
        this._uploadImage(image, (error, data) => {
          if (error) {
            return this.errorTip(error)
          }
          if (data.status.code === 0) {
            this.$refs.md.$img2Url(pos, `/i/${data.result[0].id}`)
          }
        })
      }
    },
    _validateUploadImage (e) {
      if (!e) {
        this.warnTip('获取图片失败')
        return false
      }
      if (['image/png', 'image/jpeg', 'image/gif'].indexOf(e.type) === -1) {
        this.warnTip('上传图片类型不正确，请上传JPG、PNG')
        return false
      }
      if (e.size > 1 * 1024 * 1024) {
        this.warnTip('图片文件过大，请上传小于1MB')
        return false
      }
      return true
    },
    _uploadImage (e, callback) {
      api.uploadImage(e).then(data => {
        callback(null, data)
      }).catch(error => {
        callback(error.status.message)
      })
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
  .editor
    margin-bottom: 0.15rem
    border: 1px dashed #e3e3e3
    border-radius: 4px
    .v-note-wrapper
      background-color: #fafafa
      .v-note-op
      .v-note-panel
        box-shadow: none
      .v-note-op
        background-color: #fafafa
        border-bottom: 1px dashed #e3e3e3
      .auto-textarea-input
        background: transparent
</style>
