<template>
  <y-layout menu="labs">
    <div class="bm-panel labs-content shadow text-shadow">
      <h1>新作品</h1>
      <y-input title="名称" required name="name" v-model="name" placeholder="请输入新作品名称"></y-input>
      <y-input title="描述" name="desc" v-model="desc" placeholder="请输入一句话介绍"></y-input>
      <y-input title="外链" required name="url" v-model="url" placeholder="请输入外链地址"></y-input>
      <y-input type="radio" required title="类型" name="type" v-model="type" :list="typeList" placeholder="请选择类型" @change="changeRadio"></y-input>
      <y-input type="upload" required @upload="uploadIcon" title="图标" name="icon" :value="iconUrl" width="96px" height="96px"></y-input>
      <y-input type="upload" required @upload="uploadCover" title="封面" name="cover" :value="coverUrl" :height="coverHeight"></y-input>
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
      loading: false,
      name: null,
      title: null,
      desc: null,
      url: null,
      type: 0,
      icon: null,
      cover: null,
      typeList: [{value: 0, name: '插件'}, {value: 1, name: '应用'}, {value: 2, name: '游戏'}],
      iconUrl: null,
      coverUrl: null,
      coverHeight: 240 / 800 * 100 + '%'
    }
  },
  activated () {
    this.clearData()
  },
  methods: {
    clearData () {
      this.name = null
      this.title = null
      this.desc = null
      this.url = null
      this.type = 0
      this.icon = null
      this.cover = null
      this.iconUrl = null
      this.coverUrl = null
    },
    submit () {
      if (this._validate()) {
        this._insertLabs({
          name: this.name,
          title: this.name,
          desc: this.desc,
          url: this.url,
          type: this.type,
          icon: this.icon,
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
    changeRadio (value) {
      this.type = value
    },
    uploadIcon (e) {
      this.uploadImage(e, (error, data) => {
        if (error) {
          return this.errorTip(error)
        }
        if (data.status.code === 0) {
          this.icon = data.result[0].id
          this.iconUrl = `${api.host}/i/${this.icon}`
        }
      })
    },
    uploadCover (e) {
      this.uploadImage(e, (error, data) => {
        if (error) {
          return this.errorTip(error)
        }
        if (data.status.code === 0) {
          this.cover = data.result[0].id
          this.coverUrl = `${api.host}/i/${this.cover}`
        }
      })
    },
    uploadImage (e, callback) {
      let image = e.target.files[0]
      if (this._validateUploadImage(image)) {
        this._uploadImage(image, callback)
      }
    },
    _validate () {
      if (!this.name) {
        this.warnTip('请输入名称')
        return false
      }
      if (!this.url) {
        this.warnTip('请输入外链地址')
        return false
      }
      if ([0, 1, 2].indexOf(this.type) < 0) {
        this.warnTip('请输入选择类型')
        return false
      }
      if (!this.icon) {
        this.warnTip('请上传图标')
        return false
      }
      if (!this.cover) {
        this.warnTip('请上传封面')
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
    _insertLabs (option, callback) {
      api.insertLabs(option).then(data => {
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
.labs-content
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
  .labs-content
    margin-top: 0.5rem
    margin-bottom: 0
    .input
      padding-right: 0
    .btn
      width: 100%
</style>
