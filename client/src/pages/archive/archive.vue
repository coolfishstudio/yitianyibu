<template>
  <y-layout menu="archive">
    <p class="content-wrapper-title text-right text-shadow">
      归档
    </p>
    <p class="content-wrapper-desc text-right text-shadow">
      在过去的{{ days }}天内，我写了<b>{{ total }}</b>篇文章，所有的文章都能在这里找到。
    </p>
    <hr class="content-wrapper-line right"/>
    <div class="bm-panel content-archive-list shadow">
      <div class="timeline">
        <div class="timeline-item" v-for="(item,index) in list">
          <div class="date" v-if="item.month">
            {{ item.year }}
            <span>{{ item.month }}</span>
          </div>
          <router-link tag="a" class="link" :to="'/p/' + item._id">
            {{ item.title }}
            <div class="hits">{{ item.hits }}</div>
          </router-link>
        </div>
      </div>
    </div>
  </y-layout>
</template>

<script>
import YLayout from 'components/layout/layout'
import api from 'api'
import { dateFormat } from 'common/js/util'

export default {
  components: {
    YLayout
  },
  data () {
    return {
      list: [],
      offset: 0,
      limit: -1,
      total: 0,
      days: 0
    }
  },
  mounted () {
    this.initData()
  },
  methods: {
    initData () {
      this.getContentList()
    },
    getContentList () {
      let lastMonth = null
      const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
      this._getContentList((error, data) => {
        if (error) {
          return this.errorTip(error)
        }
        if (data.status.code === 0) {
          this.list = data.result.list.map(item => {
            item.year = dateFormat(item.createdAt, 'yyyy')
            item.month = month[(dateFormat(item.createdAt, 'M') - 1) || 0]
            if (lastMonth !== item.month) {
              lastMonth = item.month
            } else {
              item.month = null
              item.year = null
            }
            return item
          })
          this.offset = data.result.meta.offset + this.limit
          this.total = data.result.meta.total || 0
          if (this.total) {
            let timestamp = new Date().getTime() - new Date(this.list[this.total - 1].createdAt).getTime()
            this.days = parseInt(timestamp / 1000 / 3600 / 24)
          }
        }
      })
    },
    _getContentList (callback) {
      api.getContentList({
        offset: this.offset,
        limit: this.limit
      }).then(data => {
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
@import "~common/stylus/variable"
.content-archive-list
  margin-bottom: 0.4rem
  padding: 2%
  .timeline
    position: relative
    &:before
      display: block
      content: ''
      position: absolute
      left: 0.28rem
      top: 0.3rem
      width: 0.02rem
      bottom: 0
      background-color: #d9d9d9
    .timeline-item
      position: relative
      margin: 0 0.2rem
      padding-left: 0.3rem
      .date
        padding-top: 0.1rem 
        position: relative
        font-size: 0.24rem
        color: #999
        line-height: 1.8
        &:after
          content: ''
          display: block
          width: 8px
          height: 8px
          border-radius: 8px
          background-color: #595959
          border: 4px solid #d9d9d9
          position: absolute
          left: -0.29rem
          top: 0.23rem
        span
          text-transform: uppercase
          color: #222
      .link
        display: block
        color: #666
        text-transform: uppercase
        font-size: 0.18rem
        line-height: 1.8
        &:hover
          color: #26272b
          border-bottom-color: #26272b
          .hits
            transform: translate(20%, -2px)
            opacity: 1
        .hits
          position: relative
          display: inline-block
          color: #fff
          padding: 3px 10px
          border-radius: 0.2rem
          font-size: 0.12rem
          line-height: 1
          opacity: 0
          transform: translate(30%, -2px)
          transition: all .3s ease-out
          background-color: #26272b
@media (max-width: 992px)
  .content-archive-list
    .timeline
      &:before
        left: 0.08rem
      .timeline-item
        padding-left: 0.1rem
        margin-right: 0
        .link
          font-size: 0.15rem
          text-overflow: ellipsis
          overflow: hidden
          white-space: nowrap
          .hits
            display: none
</style>
