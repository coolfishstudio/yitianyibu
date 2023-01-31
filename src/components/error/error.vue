<template>
  <div class="error" v-if="error">
    <div class="error-icon">
      <svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8050"><path d="M896 128H128a40 40 0 0 0-40 40v544a40 40 0 0 0 40 40h768a40 40 0 0 0 40-40V168a40 40 0 0 0-40-40z m-32 552H160V200h704zM752 824H272a40 40 0 0 0-40 40v28a4 4 0 0 0 4 4h552a4 4 0 0 0 4-4v-28a40 40 0 0 0-40-40zM376.2 530.5l45.3 45.3a4 4 0 0 0 5.6 0l84.9-84.9 84.9 84.9a4 4 0 0 0 5.6 0l45.3-45.3a4 4 0 0 0 0-5.6L562.9 440l84.9-84.9a4 4 0 0 0 0-5.6l-45.3-45.3a4 4 0 0 0-5.6 0L512 389.1l-84.9-84.9a4 4 0 0 0-5.6 0l-45.3 45.3a4 4 0 0 0 0 5.6l84.9 84.9-84.9 84.9a4 4 0 0 0 0 5.6z" p-id="8051"></path></svg>
    </div>
    <div class="error-text">
      <h3>抱歉，页面似乎出现了一些问题</h3>
      <p>
        我们将尽快修复此问题,您也可以
        <a @click="reload">
          刷新页面
        </a>
        试试
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    reload (e) {
      e.preventDefault()
      e.stopPropagation()
      location.reload()
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.error
  position: relative
  text-align: center
  padding: 1.8rem 0
.error-text
  line-height: 0.28rem
  font-size: 0.16rem
  color: #000
  display: block
  padding: 0.1rem 0
  a
    cursor: pointer
    &:hover
      color: #009a61
.error-icon
  position: relative
  box-sizing: border-box
  display: inline-block
  font-size: 0
  color: #000
  width: 0.48rem
  height: 0.48rem

</style>
