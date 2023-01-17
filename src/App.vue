<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <notifications position="bottom right" />
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.vue-notification
  padding: 20px
  margin: 0 0 5px
  .notification-title
    font-size: 16px
  .notification-content
    font-size: 14px
    margin-top: 10px
</style>
