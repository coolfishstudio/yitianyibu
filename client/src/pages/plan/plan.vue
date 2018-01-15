<template>
  <y-layout menu="plan">
    <p class="content-wrapper-title text-right text-shadow">
      手帐
    </p>
    <p class="content-wrapper-desc text-right text-shadow">
      用自己整理的教学文章集合来构成了这本计划预期的手帐。
    </p>
    <hr class="content-wrapper-line right"/>
    <div class="bm-panel content-plan-list clearfix" v-if="offset !== 0">
      <router-link tag="a" class="content-plan-list-item" to="/plan/create" v-if="isAuth">
        <div class="content-plan-list-item-cover create">
          <span class="icon-add"></span>
        </div>
      </router-link>
      <router-link tag="a" class="content-plan-list-item shadow" v-for="(item, index) in list" :key="index" :to="'/plan/' + (item.pathname || item._id)">
        <div class="content-plan-list-item-cover" :style="'background-image: url(' + item.cover + ');'">
          <div class="content-plan-list-item-header">
            <div class="content-plan-list-item-header-box">
              <span>{{ item.name }}</span>
            </div>
          </div>
        </div>
        <div class="content-plan-list-item-info text-shadow">
          <time>{{ item.time }}</time>
        </div>
      </router-link>
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
      list: [],
      offset: 0,
      limit: 20,
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
      this.getCategoryList()
    },
    getCategoryList () {
      this._getCategoryList((error, data) => {
        if (error) {
          return this.errorTip(error)
        }
        if (data.status.code === 0) {
          this.list = data.result.list.map(item => {
            item.time = dateFormat(item.createdAt, 'yyyy-MM-dd')
            if (item.cover) {
              if (/^[0-9a-f]{24}$/.test(item.cover)) {
                item.cover = `${api.host}/i/${item.cover}`
              } else {
                item.cover = item.cover
              }
            } else {
              item.cover = tempImageUrl.replace('*', String(item._id)[23])
            }
            return item
          })
          this.offset = data.result.meta.offset + this.limit
        }
      })
    },
    _getCategoryList (callback) {
      api.getCategoryList({
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
.content-plan-list
  .content-plan-list-item
    display: block
    width: 49%
    float: left
    margin-bottom: 2%
    &:nth-child(2n)
      margin-left: 2%
    &:hover
      .content-plan-list-item-cover
        .content-plan-list-item-header
          background-color: rgba(255, 255, 255, 0.15)
          .content-plan-list-item-header-box
            span
              background-color: rgba(0, 0, 0, 1)
              &:after
                border-right: 3px solid rgba(0, 0, 0, 1)
                border-bottom: 3px solid rgba(0, 0, 0, 1)
              &:before
                border-left: 3px solid rgba(0, 0, 0, 1)
                border-top: 3px solid rgba(0, 0, 0, 1)
    .content-plan-list-item-info
      font-size: .14rem
      color: #838383
      padding: .1rem
      line-height: 0.2rem
    .content-plan-list-item-cover
      width: 100%
      height: 0
      padding-bottom: 44.57%
      background-size: cover
      background-position: center
      text-align: center
      position: relative
      &.create
        height: 0.4rem
      .content-plan-list-item-header
        position: absolute
        top: 0
        left: 0
        right: 0
        bottom: 0
        background-color: rgba(255, 255, 255, 0.3)
        transition: background-color .15s linear
        .content-plan-list-item-header-box
          position: absolute
          height: 0.44rem
          margin-top: -0.22rem
          top: 50%
          width: 100%
          span
            color: #fff
            background-color: rgba(0, 0, 0, 0.7)
            line-height: 0.44rem
            font-size: 0.2rem
            transition: background-color .15s linear
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
@media (max-width:768px)
  .content-plan-list
    .content-plan-list-item
      width: 100%
      margin-bottom: 5%
      &:nth-child(2n)
        margin-left: 0
</style>
