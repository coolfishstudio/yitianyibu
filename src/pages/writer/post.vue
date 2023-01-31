<template>
  <y-layout menu="post">
    <y-loading :loading="initLoading"></y-loading>
    <y-error :error="!initLoading && error"></y-error>
    <div class="bm-panel mb-1" v-if="!initLoading && !error">
      <y-post v-show="!loading" :info="info"></y-post>
      <!-- <y-post-near v-show="!loading" :next="next" :prev="prev"></y-post-near> -->
      <y-comment-list v-if="comments.length > 0" :list="comments"></y-comment-list>
      <!-- <y-comment-create v-if="false"></y-comment-create> -->
    </div>
  </y-layout>
</template>

<script>
import YLayout from 'components/layout/layout'
// import YCommentCreate from 'components/comment/create'
import YCommentList from 'components/comment/list'
// import YPostNear from 'components/post-near/post-near'
import YLoading from 'components/loading/loading'
import YError from 'components/error/error'
import YPost from 'components/post/post'
import api from 'api/github'
import { dateFormat } from 'common/js/util'

export default {
  components: {
    YLayout,
    // YCommentCreate,
    YCommentList,
    // YPostNear,
    YPost,
    YLoading,
    YError
  },
  data () {
    return {
      initLoading: true,
      error: false,
      loading: false,
      info: {
        title: null,
        html: null,
        hits: null,
        time: null,
        category: [],
        tag: null
      },
      // prev: null,
      // next: null,
      comments: []
    }
  },
  activated () {
    document.body.scrollTop = 0
    this.initData()
  },
  deactivated () {
    this.initLoading = true
    this.error = false
    this.loading = false
    this.info = {
      title: null,
      html: null,
      hits: null,
      time: null,
      category: [],
      tag: null
    }
    this.comments = []
  },
  methods: {
    initData () {
      this.getContentInfo()
    },
    getContentInfo () {
      this.loading = true
      this._getContentInfo((error, data) => {
        if (error) {
          this.initLoading = false
          this.loading = false
          return this.errorTip(error)
        }
        this._getComments((_error, comments) => {
          this.loading = false
          this.initLoading = false
          if (_error) {
            return this.errorTip(_error)
          }
          this.comments = (comments || []).map(i => {
            i.time = dateFormat(data.created_at, 'yyyy-MM-dd hh:mm:ss', true)
            return i
          })
          this.info = {
            title: data.title || null,
            html: data.body_html || null,
            hits: data.comments || null,
            time: dateFormat(data.created_at, 'yyyy-MM-dd hh:mm:ss', true),
            category: data.labels || [],
            // tag: data.result.content.tag || []
            tag: data.labels || []
          }
          // this.prev = (data.result.near && data.result.near.prev) || null
          // this.next = (data.result.near && data.result.near.next) || null
        })
      })
    },
    _getContentInfo (callback) {
      api.getIssue(this.$route.params.id).then(data => {
        callback(null, data)
      }).catch(error => {
        callback(error.message)
      })
    },
    _getComments (callback) {
      api.getComments(this.$route.params.id).then(data => {
        callback(null, data)
      }).catch(error => {
        callback(error.message)
      })
    },
    errorTip (msg) {
      this.$notify({ type: 'error', title: '错误', text: msg })
      this.error = true
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
</style>
