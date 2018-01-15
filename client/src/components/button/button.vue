<template>
  <div class="btn text-shadow">
    <button class="btn-submit" @click="submit">提交</button>
  </div>
</template>

<script>
export default {
  methods: {
    submit () {
      this.$emit('submit')
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.btn
  .btn-submit
    display: inline-block
    border: 1px dashed #e3e3e3
    color: #222
    background-color: #fff
    width: 100%
    padding: 0.1rem 0.2rem
    font-size: 0.14rem
    font-weight: 400
    border-radius: 3px
    cursor: pointer
    transition: border-color 0.2s linear, color 0.2s linear, background-color 0.2s linear
    &:hover
      color: #e3e3e3
      border: 1px solid #222222
      background-color: #222222
</style>
