<template>
  <y-layout menu="readme">
    <p class="content-wrapper-title text-right text-shadow">
      关于
    </p>
    <p class="content-wrapper-desc text-right text-shadow">
      不会做菜的起夜家就不是一个好的程序猿。
    </p>
    <hr class="content-wrapper-line right"/>
    <div class="bm-panel mb-1 clearfix">
      <y-loading :loading="initLoading"></y-loading>
      <d-readme v-if="!initLoading && error"></d-readme>
      <div class="markdown-body" v-if="!initLoading && !error" v-html="data || '无'"></div>
    </div>
  </y-layout>
</template>

<script>
import YLayout from 'components/layout/layout'
import YLoading from 'components/loading/loading'
import DReadme from './default'
import api from 'api/github'
import marked from 'marked'

export default {
  data () {
    return {
      error: false,
      initLoading: true,
      data: null
    }
  },
  components: {
    YLayout,
    YLoading,
    DReadme
  },
  activated () {
    this.initData()
  },
  deactivated () {
    this.data = null
    this.initLoading = true
    this.error = false
  },
  methods: {
    initData () {
      this.getReadMe()
    },
    getReadMe () {
      this._getReadMe((error, data) => {
        this.initLoading = false
        if (error) {
          return this.errorTip(error)
        }
        this.data = marked.parse(data) || null
      })
    },
    _getReadMe (callback) {
      api.getReadme().then(data => {
        callback(null, data)
      }).catch(error => {
        callback(error.message)
      })
    },
    errorTip (msg) {
      // this.$notify({ type: 'error', title: '错误', text: msg })
      this.error = true
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
</style>
