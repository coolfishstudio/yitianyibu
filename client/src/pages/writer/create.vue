<template>
  <y-layout menu="plan">
    <div class="bm-panel plan-content shadow text-shadow">
      <h1>写文章</h1>
      <y-input name="title" placeholder="请输入标题"></y-input>
      <y-input name="tag" placeholder="请输入标签，逗号分隔"></y-input>
      <y-editor name="content" placeholder="编辑器"></y-editor>
      <y-button></y-button>
    </div>
  </y-layout>
</template>

<script>
import YLayout from 'components/layout/layout'
import YButton from 'components/button/button'
import YInput from 'components/input/input'
import YEditor from 'components/editor/editor'
// import api from 'api'
// import { dateFormat } from 'common/js/util'

export default {
  components: {
    YLayout,
    YButton,
    YInput,
    YEditor
  },
  data () {
    return {
      loading: false,
      data: {
        name: null,
        pathname: null,
        desc: null,
        weight: 0,
        coverUrl: null
      }
    }
  },
  methods: {
    errorTip (msg) {
      this.$notify({ type: 'error', title: '错误', text: msg })
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.plan-content
  padding: 3% 4% 4%
  h1
    letter-spacing: 2px
    font-size: 0.40rem
    padding-bottom: 3%
    margin-bottom: 4%
    border-bottom: 1px dashed #ddd
    color: rgba(0,0,0,0.75)
    text-align: center
  .btn
    width: 100%
    margin: 0 auto
@media (max-width: 768px)
  .plan-content
    margin-top: 0.5rem
    margin-bottom: 0
    .input
      padding-right: 0
    .btn
      width: 100%
</style>
