<template>
  <y-layout menu="labs">
    <p class="content-wrapper-title text-right text-shadow">
      实验
    </p>
    <p class="content-wrapper-desc text-right text-shadow">
      方轮子、圆轮子，能跑的就是好轮子。
    </p>
    <hr class="content-wrapper-line right"/>
    <div class="bm-panel content-labs-list">
      <a @click="gotoUrl(item.url, item._id)" class="content-labs-list-item shadow" v-for="(item, index) in list" :key="index">
        <div :style="'background-image: url(' + item.cover + ')'" class="content-labs-list-item-img"></div>
        <div class="content-labs-list-item-text text-shadow">
          <p class="content-labs-list-item-title">{{ item.name }}</p>
          <p class="content-labs-list-item-time">{{ item.time }}</p>
          <p class="content-labs-list-item-desc">{{ item.desc }}</p>
        </div>
      </a>
    </div>
  </y-layout>
</template>

<script>
import YLayout from 'components/layout/layout'
import api from 'api'
import { dateFormat } from 'common/js/util'

const tempImageHost = 'http://yitianyibu.com/images/homepage/'

export default {
  components: {
    YLayout
  },
  data () {
    return {
      list: [],
      offset: 0,
      limit: 20
    }
  },
  mounted () {
    this.initData()
  },
  methods: {
    initData () {
      this.getLabsList()
    },
    getLabsList () {
      this._getLabsList((error, data) => {
        if (error) {
          return this.errorTip(error)
        }
        if (data.status.code === 0) {
          this.list = data.result.list.map(item => {
            item.time = dateFormat(item.createdAt, 'yyyy.MM.dd')
            item.cover = item.cover.replace(/.*\/images\/homepage/, tempImageHost)
            return item
          })
          this.offset = data.result.meta.offset + this.limit
        }
      })
    },
    gotoUrl (url, id) {
      try {
        window.open(url)
      } finally {
        this._recordHit(id)
      }
    },
    _getLabsList (callback) {
      api.getLabsList({
        offset: this.offset,
        limit: this.limit
      }).then(data => {
        callback(null, data)
      }).catch(error => {
        callback(error.status.message)
      })
    },
    _recordHit (id) {
      api.recordHit(id)
    },
    errorTip (msg) {
      this.$notify({ type: 'error', title: '错误', text: msg })
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable"
.content-labs-list
  .content-labs-list-item
    display: block
    margin-bottom: 0.3rem
    background: #ffffff
    width: 100%
    height: auto
    cursor: pointer
    position: relative
    overflow: hidden
    .content-labs-list-item-img
      float: left
      padding-bottom: 24%
      width: 80%
      background-size: cover
      background-position: center
      background-color: #f2f2f2
    .content-labs-list-item-text
      float: left
      width: 20%
      text-align: center
      position: relative
      .content-labs-list-item-title
        padding-top: 0.40rem
        padding-bottom: 0
        font-size: 0.16rem
        color: $color-text-title
      .content-labs-list-item-time
        margin-top: 0.1rem
        color: $color-text-caption
        font-size: 0.12rem
      .content-labs-list-item-desc
        text-align: left
        padding: 0.15rem 0.3rem 0 0.3rem
        color: $color-text-body
        font-size: 0.13rem
        word-break: break-word
        line-height: 0.18rem
@media (max-width: 992px)
  .content-labs-list
    .content-labs-list-item
      .content-labs-list-item-img
      .content-labs-list-item-text
        width: 100%
      .content-labs-list-item-img
        padding-bottom: 44.57%
      .content-labs-list-item-text
        padding: 0.1rem 0
        line-height: 1.5
        text-align: left
        .content-labs-list-item-title
          padding-top: 0
          padding-left: 0.1rem
        .content-labs-list-item-time
          margin-top: 0
          position: absolute
          top: -0.28rem
          right: 0.1rem
          color: #fff
          font-weight: 500
        .content-labs-list-item-desc
          display: none
</style>
