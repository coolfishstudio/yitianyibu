<template>
  <y-layout menu="plan">
    <div class="bm-panel plan-list-content" v-if="info.name">
      <div class="plan-list-header" :style="'background-image: url(' + info.cover + ');'">
        <div class="plan-list-cover">
        </div>
        <div class="plan-list-title">
          <span>{{ info.name }}</span>
        </div>
      </div>
      <div class="plan-list-items text-shadow">
        <blockquote v-if="info.desc">
          <p>
            {{ info.desc }}
          </p>
        </blockquote>
        <router-link tag="a" class="plan-list-post-create create" :to="'/plan/' + info.id + '/create'" v-if="isAuth">
          <div class="content-labs-list-item-img">
            <span class="icon-add"></span>
          </div>
        </router-link>
        <router-link tag="a" class="plan-list-post-item" v-for="(item, index) in list" :key="index" :to="'/p/'+ item._id">
          <div class="plan-list-post-title" :class="{'strikethrough': item.status !== 'published'}">
            {{ item.title }}
          </div>
          <div class="plan-list-post-time">
            <time>{{ item.time }}</time>
          </div>
        </router-link>
      </div>
    </div>
  </y-layout>
</template>

<script>
import YLayout from 'components/layout/layout'
import api from 'api'
import { dateFormat } from 'common/js/util'
import storage from 'common/js/storage.js'
import CONST from 'api/const'

const tempImageUrl = 'http://yitianyibu.com/static/image/small/*.jpg'

export default {
  components: {
    YLayout
  },
  data () {
    return {
      info: {
        id: null,
        name: null,
        cover: null,
        desc: null
      },
      list: [],
      offset: 0,
      limit: -1,
      isAuth: false
    }
  },
  activated () {
    this.initData()
  },
  methods: {
    initData () {
      this.offset = 0
      this.isAuth = !!storage.get(CONST.STORAGE_AUTH_TOKEN)
      this.getContentByCategory()
    },
    getContentByCategory () {
      this._getContentByCategory((error, data) => {
        if (error) {
          return this.errorTip(error)
        }
        if (data.status.code === 0) {
          this.info = {
            id: data.result.info._id,
            name: data.result.info.name,
            desc: data.result.info.desc
          }
          if (data.result.info.cover) {
            if (/^[0-9a-f]{24}$/.test(data.result.info.cover)) {
              this.info.cover = `${api.host}/i/${data.result.info.cover}`
            } else {
              this.info.cover = data.result.info.cover
            }
          } else {
            this.info.cover = tempImageUrl.replace('*', String(data.result.info._id)[23])
          }
          this.list = data.result.list.map(item => {
            item.time = dateFormat(item.createdAt, 'yyyy-MM-dd hh:mm')
            return item
          })
          this.offset = data.result.meta.offset + this.limit
        }
      })
    },
    _getContentByCategory (callback) {
      api.getContentByCategory(this.$route.params.id, {
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
.plan-list-content
  .plan-list-items
    padding: 1% 0% 3%
    blockquote
      padding: .15rem .2rem
      border-left: 5px solid #ccc
      background-color: #f8f8f8
      margin: .2rem 0
      p
        margin: 0
        font-size: .15rem
        color: #333
        line-height: 2
        word-break: break-all
        font-style: italic
    .plan-list-post-create
      padding: .12rem
      height: 0.22rem
      position: relative
      display: block
      margin: 0.2rem 0
    .plan-list-post-item
      border-bottom: 1px solid #eee
      font-size: .16rem
      padding: .12rem
      overflow: hidden
      display: block
      color: #666
      &:last-child
        border-bottom: 0
      &:hover
        .plan-list-post-title
          border-left: 3px solid #2ecc40
          color: #26272b
        .plan-list-post-time
          color: #2ecc40
      .plan-list-post-title
        display: inline-block
        padding-left: .15rem
        border-left: 3px solid #fff
        line-height: normal
      .plan-list-post-time
        float: right
        min-width: 1.5rem
        time
          vertical-align: middle
          margin-right: .05rem
  .plan-list-header
    background-color: #fff
    background-size: cover
    background-position: center
    padding-bottom: 32.73%
    height: 0
    position: relative
    filter: grayscale(100%)
    transition: all 0.3s
    &:hover
      filter: grayscale(0%)
    .plan-list-cover
      position: absolute
      top: 0
      left: 0
      right: 0
      bottom: 0
      background-color: rgba(255, 255, 255, 0.25)
    .plan-list-title
      position: absolute
      height: 0.84rem
      margin-top: -0.42rem
      top: 50%
      width: 100%
      text-align: center
      span
        color: #fff
        background-color: rgba(0, 0, 0, 0.7)
        line-height: 0.84rem
        font-size: 0.35rem
        font-weight: 100
        display: inline-block
        padding: 0 2%
        min-width: 50%
        position: relative
        &:after
        &:before
          content: ''
          display: block
          color: #fff
          border: 3px solid rgba(0, 0, 0, 0.7)
          z-index: 1
          position: absolute
          width: 75%
          height: 50%
          transition: border-color .15s linear
        &:before
          top: -6px
          left: -6px
          border-right: 3px solid transparent
          border-bottom: 3px solid transparent
        &:after
          bottom: -6px
          right: -6px
          border-left: 3px solid transparent
          border-top: 3px solid transparent
@media (max-width: 992px)
  .plan-list-content
    padding-top: 5%
    .plan-list-items
      padding-left: 0
      padding-right: 0
      .plan-list-post-item
        &:hover
          .plan-list-post-title
            color: inherit
            border-color: #fff
        .plan-list-post-title
          padding-left: 0
@media (max-width:768px)
  .plan-list-content
    .plan-list-items
      .plan-list-post-item
        .plan-list-post-time
          display: none
    .plan-list-header
      .plan-list-title
        height: 0.44rem
        margin-top: -0.22rem
        span
          line-height: 0.44rem
          font-weight: inherit
          font-size: 0.2rem
</style>
