<template>
  <y-layout menu="post">
    <div class="bm-panel ">
      <y-post v-show="!loading" :info="info"></y-post>
      <!-- <y-post-near v-show="!loading" :next="next" :prev="prev"></y-post-near> -->
      <y-comment-list :list="comments"></y-comment-list>
      <!-- <y-comment-create v-if="false"></y-comment-create> -->
    </div>
  </y-layout>
</template>

<script>
import YLayout from 'components/layout/layout'
// import YCommentCreate from 'components/comment/create'
import YCommentList from 'components/comment/list'
// import YPostNear from 'components/post-near/post-near'
import YPost from 'components/post/post'
import api from 'api/github'
import { dateFormat } from 'common/js/util'

export default {
  components: {
    YLayout,
    // YCommentCreate,
    YCommentList,
    // YPostNear,
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
        category: [],
        tag: null
      },
      // prev: null,
      // next: null,
      comments: []
    }
  },
  activated () {
    this.initData()
  },
  deactivated () {
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
          return this.errorTip(error)
        }
        this._getComments((_error, comments) => {
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
          this.loading = false
          // this.prev = (data.result.near && data.result.near.prev) || null
          // this.next = (data.result.near && data.result.near.next) || null
        })
      })
    },
    _getContentInfo (callback) {
      api.getIssue(this.$route.params.id).then(data => {
        callback(null, data)
      }).catch(error => {
        callback(error.status.message)
      })
    },
    _getComments (callback) {
      api.getComments(this.$route.params.id).then(data => {
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
