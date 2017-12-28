<template>
  <div class="footer">
    <div class="copyright text-shadow">
      <span>©  2015 - 2018 </span>
      <a class="font-text" href="https://github.com/coolfishstudio">Yves</a>
      <a @click="gotoLogin">一天一步网</a>
      <a class="font-text" href="http://www.miitbeian.gov.cn">京ICP备14019006-4号</a>
    </div>
  </div>
</template>

<script>
import storage from 'common/js/storage.js'

const STORAGE_AUTH_TOKEN = '__yitianyibu__auth__token__'
export default {
  methods: {
    gotoLogin () {
      if (storage.get(STORAGE_AUTH_TOKEN)) {
        this.$router.push('/')
      } else {
        this.$router.push('/login')
      }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable"
.footer
  width: 100%
  border-top: 1px solid $color-border
  color: #a1b2b4
  background-color: #fcfcfc
  position: relative
  height: 0.50rem
  line-height: 0.50rem
  text-align: center
  max-width: 14.4rem
  min-width: 9rem
  .copyright
    font-size: 0
    height: 100%
    span
    a
      display: inline-block
      font-size: 0.14rem
      padding: 0 0.04rem
      cursor: pointer
</style>
