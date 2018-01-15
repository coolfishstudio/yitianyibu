<template>
  <y-layout menu="plan">
    <div class="bm-panel plan-content shadow text-shadow">
      <h1>手帐本</h1>
      <y-input title="名称" required name="name" v-model="name" placeholder="请输入手帐本名称"></y-input>
      <y-input title="链接" name="pathname" v-model="pathname" placeholder="请输入自定义链接"></y-input>
      <y-input title="描述" name="desc" v-model="desc" placeholder="请输入一句话介绍"></y-input>
      <y-input title="权重" required name="weight" v-model="weight" placeholder="请输入权重，例如 1"></y-input>
      <y-input type="upload" @upload="uploadImage" title="封面" name="cover" :value="coverUrl" :height="coverHeight"></y-input>
      <y-button @submit="submit"></y-button>
    </div>
  </y-layout>
</template>

<script>
import YLayout from 'components/layout/layout'
import YButton from 'components/button/button'
import YInput from 'components/input/input'
import api from 'api'

export default {
  components: {
    YLayout,
    YButton,
    YInput
  },
  data () {
    return {
      name: null,
      pathname: null,
      desc: null,
      weight: null,
      cover: null,
      coverUrl: null,
      coverHeight: 300 / 673 * 100 + '%'
    }
  },
  activated () {
    this.clearData()
  },
  methods: {
    clearData () {
      this.name = null
      this.pathname = null
      this.desc = null
      this.weight = null
      this.cover = null
      this.coverUrl = null
    },
    submit () {
      if (this._validate()) {
        this._insertCategory({
          name: this.name,
          pathname: this.pathname,
          desc: this.desc,
          weight: this.weight,
          cover: this.cover
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
    uploadImage (e) {
      let image = e.target.files[0]
      if (this._validateUploadImage(image)) {
        this._uploadImage(image, (error, data) => {
          if (error) {
            return this.errorTip(error)
          }
          if (data.status.code === 0) {
            this.cover = data.result[0].id
            this.coverUrl = `${api.host}/i/${this.cover}`
          }
        })
      }
    },
    _validate () {
      if (!this.name) {
        this.warnTip('请输入名称')
        return false
      }
      if (this.pathname && !/^[a-zA-Z0-9-_]+$/.test(this.pathname)) {
        this.warnTip('请输入合法的自定义链接')
        return false
      }
      return true
    },
    _validateUploadImage (e) {
      if (!e) {
        this.warnTip('获取图片失败')
        return false
      }
      if (['image/png', 'image/jpeg'].indexOf(e.type) === -1) {
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
    _insertCategory (option, callback) {
      api.insertCategory(option).then(data => {
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
  .input
    padding-right: 8%
  .btn
    width: 84%
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
