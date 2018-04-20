<template>
  <y-layout menu="post">
    <y-post v-show="!loading" :info="info"></y-post>
    <y-post-near v-show="!loading" :next="next" :prev="prev"></y-post-near>
    <y-comment-list v-if="false"></y-comment-list>
    <y-comment-create v-if="false"></y-comment-create>
  </y-layout>
</template>

<script>
import YLayout from 'components/layout/layout'
import YCommentCreate from 'components/comment/create'
import YCommentList from 'components/comment/list'
import YPostNear from 'components/post-near/post-near'
import YPost from 'components/post/post'
import api from 'api'
import { dateFormat } from 'common/js/util'

export default {
  components: {
    YLayout,
    YCommentCreate,
    YCommentList,
    YPostNear,
    YPost
  },
  data () {
    return {
      loading: false,
      info: {
        title: null,
        html: null,
        hits: null,
        time: null,
        category: {
          title: null,
          desc: null
        },
        tag: null
      },
      prev: null,
      next: null
    }
  },
  activated () {
    this.initData()
  },
  methods: {
    initData () {
      this.getContentInfo()
    },
    getContentInfo () {
      this.loading = true
      this._getContentInfo((error, data) => {
        this.loading = false
        if (error) {
          return this.errorTip(error)
        }
        if (data.status.code === 0) {
          data.result.content.html = data.result.content.html.replace(/src="\/images/img, 'src="http://v1.yitianyibu.com/images')
          data.result.content.html = data.result.content.html.replace(/src="\/i\//img, 'src="http://api.yitianyibu.com/i/')
          this.info = {
            title: data.result.content.title || null,
            html: data.result.content.html || null,
            hits: data.result.content.hits || null,
            time: dateFormat(data.result.content.createdAt, 'yyyy-MM-dd'),
            category: {
              title: data.result.category.name || null,
              desc: data.result.category.desc || null,
              link: data.result.category.pathname || data.result.category._id || null
            },
            tag: data.result.content.tag || []
          }
          this.prev = (data.result.near && data.result.near.prev) || null
          this.next = (data.result.near && data.result.near.next) || null
        }
      })
    },
    _getContentInfo (callback) {
      api.getContentInfo(this.$route.params.id).then(data => {
        callback(null, data)
      }).catch(error => {
        callback(error.status.message)
      })
    },
    errorTip (msg) {
      this.$notify({ type: 'error', title: '错误', text: msg })
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
</style>
