<template>
  <div class="footer">
    <div class="copyright text-shadow">
      <span>©  2015 - {{ new Date().getFullYear() }} </span>
      <a class="font-text" href="https://github.com/coolfishstudio">Yves</a>
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
  height: 0.5rem
  line-height: 0.5rem
  overflow: hidden
  text-align: center
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
@media (max-width: 992px)
  .footer
    min-width: 100%
    &.home
      display: none
@media (max-width:768px)
  .footer
    .copyright
      .miitbeian
        display: none
</style>
