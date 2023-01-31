<template>
  <y-layout menu="archive">
    <p class="content-wrapper-title text-right text-shadow">
      归档
    </p>
    <p class="content-wrapper-desc text-right text-shadow">
      在过去的{{ days }}天内，我写了<b>{{ total }}</b>篇文章，所有的文章都能在这里找到。
    </p>
    <hr class="content-wrapper-line right"/>
    <y-loading :loading="initLoading"></y-loading>
    <y-error :error="!initLoading && error"></y-error>
    <div class="bm-panel content-archive-list" v-if="!initLoading && !error && total > 0">
      <div class="timeline">
        <div class="timeline-item" v-for="(item,index) in list" :key="index">
          <div class="date" v-if="item.month">
            {{ item.year }}
            <span>{{ item.month }}</span>
          </div>
          <router-link tag="a" class="link" :class="{'strikethrough': item.state !== 'open'}" :to="'/p/' + item.number">
            <span>{{ item.title }}</span>
            <span
              v-for="tag in (item.labels || [])"
              class="tag"
              :style="'background: #' + tag.color + ';'"
            >
              {{ tag.name }}
            </span>
            <div class="hits" v-if="item.comments">{{ item.comments }}</div>
          </router-link>
        </div>
      </div>
      <div v-if="total > list.length" class="timeline-item-next" v-on:click="getContentList">{{ loading ? '加载中' : '加载更多' }}</div>
      <div class="mb-1"></div>
    </div>
    <div class="bm-panel content-archive-list" v-if="!initLoading && !error && total === 0">
      <h3 style="text-align: center;font-size: 18px;">数据为空</h3>
    </div>
  </y-layout>
</template>

<script>
import YLayout from 'components/layout/layout'
import YLoading from 'components/loading/loading'
import YError from 'components/error/error'
import api from 'api/github'
import { dateFormat } from 'common/js/util'
import CONST from 'api/const'

export default {
  components: {
    YLayout,
    YLoading,
    YError
  },
  data () {
    return {
      initLoading: true,
      error: false,
      list: [],
      page: 1,
      per_page: 30,
      total: 0,
      days: Math.ceil((new Date().getTime() - new Date(`${CONST.CREATE_BLOG_TIME.YEAR}/${CONST.CREATE_BLOG_TIME.MONTH}/${CONST.CREATE_BLOG_TIME.DAY}`).getTime()) / 1000 / 3600 / 24),
      loading: false
    }
  },
  activated () {
    this.initData()
  },
  deactivated () {
    this.page = 1
    this.list = []
    this.total = 0
    this.initLoading = true
    this.error = false
  },
  methods: {
    initData () {
      this.getContentList()
    },
    getContentList () {
      if (this.loading) {
        return null
      }
      this.loading = true
      let lastMonth = null
      const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
      this._getContentList((error, data) => {
        this.loading = false
        this.initLoading = false
        if (error) {
          return this.errorTip(error)
        }
        this.list = this.list.concat(data.items || []).map(item => {
          item.year = item.year || dateFormat(item.created_at, 'yyyy')
          item.month = item.month || month[(dateFormat(item.created_at, 'M') - 1) || 0]
          if (lastMonth !== item.month) {
            lastMonth = item.month
          } else {
            item.month = null
            item.year = null
          }
          return item
        })
        this.page = this.page + 1
        this.total = data.total_count || 0
      })
    },
    _getContentList (callback) {
      api.getIssueList({
        page: this.page,
        per_page: this.per_page
      }).then(data => {
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
        .tag
          color: #fff
          box-sizing: border-box;
          margin: 0;
          padding: 0;
          font-size: 12px;
          line-height: 20px;
          list-style: none;
          height: auto;
          margin-inline-end: 8px;
          padding-inline: 7px;
          white-space: nowrap;
          border-radius: 4px;
          transition: all .2s;
          text-align: start;
          display: inline-block;
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
  .timeline-item-next
    position: relative;
    margin: 0.5rem 0.25rem 0;
    padding: 0.125rem;
    border-radius: 0px;
    border: 0.02rem dashed #d9d9d9;
    text-align: center;
    color: #666;
    text-transform: uppercase;
    font-size: 0.18rem;
    line-height: 1.2;
    cursor: pointer;
    transition: all .3s ease-out
    &:hover
      color: #26272b;
      background: #d9d9d9;
      border-style: solid;
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
