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
        category: {
          title: null,
          desc: null
        },
        tag: null
      },
      prev: null,
      next: null,
      comments: []
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
          console.log('===>', this.comments)
          const curLabels = (data.labels || [])[0] || {}
          this.info = {
            title: data.title || null,
            html: data.body || null,
            hits: data.comments || null,
            time: dateFormat(data.created_at, 'yyyy-MM-dd hh:mm:ss', true),
            category: {
              // title: data.result.category.name || null,
              // desc: data.result.category.desc || null,
              // link: data.result.category.pathname || data.result.category._id || null
              title: curLabels.name || null,
              desc: curLabels.description || curLabels.name || null,
              link: curLabels.name || null
            },
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
