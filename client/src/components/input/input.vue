<template>
  <div class="input" :class="{'fill-input': !title}">
    <label v-if="title" class="title"><span v-if="required">＊</span>{{ title }}:</label>
    <div class="form-control" v-if="type === 'text'">
      <input type="text" ref="input" :value="value" @input="$emit('input', $event.target.value)"  :placeholder="placeholder">
    </div>
    <div class="form-upload" v-if="type === 'upload'" :style="'width: ' + (width ? width : '79%') + '; padding-bottom:' + (height ? height : '0.4rem')">
      <label :for="name" class="upload">
        <img :src="value" v-if="value">
        <input type="file" :id="name" accept="" style="display: none;" @change="$emit('upload', $event)">
        <span class="icon-add" v-if="!value"></span>
      </label>
    </div>
    <div class="form-radio" v-if="type === 'radio'">
      <span class="radio-btn" v-for="(item, index) in list" :class="{'active': item.value === value}" :key="index" @click="changeRadio(item.value)">{{ item.name }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    required: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'text'
    },
    value: null,
    placeholder: {
      type: String,
      default: ''
    },
    width: 0,
    height: 0,
    list: null
  },
  methods: {
    changeRadio (value) {
      this.$emit('change', value)
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.input
  font-size: 0
  margin-bottom: 0.15rem
  &.fill-input
    .form-control
      width: 98%
    .form-upload
    .form-radio
      width: 100%
  .title
    vertical-align: middle
    color: #222
    font-size: 0.14rem
    line-height: 0.4rem
    display: inline-block
    text-align: right
    width: 18%
    padding-right: 3%
    span
      color: #FD9846
      margin-right:0.04rem
  .form-control
    display: inline-block
    vertical-align: middle
    background-color: #fafafa
    width: 77%
    margin: -1px
    input
      width: 100%;
      height: 100%;
      background-color: transparent;
  .form-upload
    display: inline-block
    width: 79%
    height: 20%
    background-color: #fafafa
    text-align: center
    vertical-align: top
    margin: -1px
    color: #999
    position: relative
    padding-bottom: 0.4rem
    cursor: pointer
    .upload
      width: 100%
      height: 100%
      border: 1px dashed #d9d9d9
      border-radius: 0.04rem
      text-align: center
      vertical-align: middle
      display: block
      position: absolute
      top: 0
      left: 0
      cursor: pointer
      overflow: hidden
      img
        width: 100%
        height: 100%
  .form-radio
    display: inline-block
    width: 79%
    height: 20%
    vertical-align: top
    position: relative
    font-size: 0
    .radio-btn
      border: 1px dashed #d9d9d9
      border-radius: 0.04rem
      font-size: 0.14rem
      color: #666
      background-color: #fafafa
      line-height: 0.38rem
      padding: 0 0.14rem
      margin-right: 0.1rem
      display: inline-block
      text-shadow: none
      cursor: pointer
      &.active
        border-color: #222
        background-color: #222
        color: #e3e3e3
</style>
