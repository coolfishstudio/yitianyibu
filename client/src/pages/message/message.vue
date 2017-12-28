<template>
  <y-layout menu="message">
    <p class="content-wrapper-title text-right">
      留言
    </p>
    <p class="content-wrapper-desc text-right">
      留下你的话语，带走我的问候，欢迎大家没事踩踩。
    </p>
    <hr class="content-wrapper-line right"/>
    <y-comment-list class="content-message-list" :list="list" :isAuth="isAuth" @remove="remove"></y-comment-list>
    <y-comment-create ref="create" @submit="submit"></y-comment-create>
  </y-layout>
</template>

<script>
import YLayout from 'components/layout/layout'
import YCommentCreate from 'components/comment/create'
import YCommentList from 'components/comment/list'
import api from 'api'
import { dateFormat } from 'common/js/util'
import storage from 'common/js/storage.js'

const STORAGE_AUTH_TOKEN = '__yitianyibu__auth__token__'

export default {
  data () {
    return {
      list: [],
      offset: 0,
      limit: 10,
      isAuth: !!storage.get(STORAGE_AUTH_TOKEN)
    }
  },
  components: {
    YLayout,
    YCommentCreate,
    YCommentList
  },
  mounted () {
    this.initData()
  },
  methods: {
    initData () {
      this.getMessageList()
    },
    refresh () {
      this.offset = 0
      this.getMessageList()
    },
    remove (id) {
      console.log(id)
    },
    getMessageList () {
      this._getMessageList((error, data) => {
        if (error) {
          return this.errorTip(error)
        }
        if (data.status.code === 0) {
          this.list = data.result.list.map(item => {
            item.name = item.name === '*' ? '匿名' : item.name
            item.time = dateFormat(item.createdAt, 'yyyy-MM-dd hh:mm')
            return item
          })
          this.offset = data.result.meta.offset + this.limit
        }
      })
    },
    submit (option) {
      this._insertMessage({
        name: option.name,
        email: option.email,
        content: option.content
      }, (error, data) => {
        if (error) {
          return this.errorTip(error)
        }
        if (data.status.code === 0) {
          this.successTip('发表成功')
          this.$refs.create.reset()
          this.refresh()
        }
      })
    },
    _getMessageList (callback) {
      api.getMessageList({
        offset: this.offset,
        limit: this.limit
      }).then(data => {
        callback(null, data)
      }).catch(error => {
        callback(error.status.message)
      })
    },
    _insertMessage (option, callback) {
      api.insertMessage(option).then(data => {
        callback(null, data)
      }).catch(error => {
        callback(error.status.message)
      })
    },
    successTip (msg) {
      this.$notify({ type: 'success', title: '成功', text: msg })
    },
    errorTip (msg) {
      this.$notify({ type: 'error', title: '错误', text: msg })
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable"
.content-message-list
  margin-top: 0.9rem !important
</style>
