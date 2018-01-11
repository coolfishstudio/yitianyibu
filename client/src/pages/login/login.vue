<template>
  <y-layout menu="login">
    <div class="content-home">
      <div class="content-login-box shadow">
        <h1>一天一步</h1>
        <div class="input-group">
          <div class="input-item">
            <i class="input-icon input-icon-username"></i>
            <input type="text" v-model="email" placeholder="用户名" class="input-name"/>
          </div>
          <div class="input-item">
            <i class="input-icon input-icon-password"></i>
            <input type="password" v-model="password" placeholder="密码"/>
          </div>
        </div>
        <div class="btn" @click="submit">登录</div>
      </div>
    </div>
  </y-layout>
</template>

<script>
import YLayout from 'components/layout/layout'
import api from 'api'
import storage from 'common/js/storage.js'
import CONST from 'api/const'

export default {
  components: {
    YLayout
  },
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    submit () {
      if (this._validate()) {
        this._login((error, data) => {
          if (error) {
            return this.errorTip(error)
          }
          if (data.status.code === 0) {
            this.successTip('登录成功')
            storage.set(CONST.STORAGE_AUTH_TOKEN, data.result.token)
            this.$router.push('/')
          }
        })
      }
    },
    _validate () {
      if (!this.email || !this.email.trim().length) {
        this.warnTip('您的账号不能为空')
        return false
      }
      if (!/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(this.email)) {
        this.warnTip('您的账号格式错误')
        return false
      }
      if (!this.password || !this.password.trim().length) {
        this.warnTip('您的密码不能为空')
        return false
      }
      return true
    },
    _login (callback) {
      api.login({
        email: this.email,
        password: this.password
      }).then(data => {
        callback(null, data)
      }).catch(error => {
        callback(error.status.message)
      })
    },
    successTip (msg) {
      this.$notify({ type: 'success', title: '成功', text: msg })
    },
    errorTip (msg) {
      this.$notify({ type: 'error', title: '错误', text: msg })
    },
    warnTip (msg) {
      this.$notify({ type: 'warn', title: '警告', text: msg })
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.content-home
  position: relative
  height: 100%
  .content-login-box
    width: 3rem
    padding: 0.5rem 0.5rem 0.8rem
    background-color: #fff
    position: absolute
    top: 40%
    left: 50%
    margin-left: -2rem
    margin-top: -1.91rem
    h1
      margin: 0 auto 0.25rem
      height: 0.5rem
      color: #b2b6b7
      font-size: 30px
      letter-spacing: 4px
      line-height: 0.5rem
      text-align: center
    .input-group
      margin-bottom: 0.22rem
      .input-item
        position: relative
        width: 100%
        margin-bottom: 0
        input
          width: 2.51rem
          height: 0.4rem
          margin-bottom: 0
          padding: 0.04rem 0.12rem 0.04rem 0.35rem
          border: 1px solid #c8c8c8
          border-radius: 0 0 4px 4px
          background-color: hsla(0, 0%, 71%,.1)
          vertical-align: middle
          &.input-name
            border-radius: 4px 4px 0 0
            border-bottom: none
        .input-icon
          position: absolute
          top: 0.15rem
          left: 0.11rem
          font-size: 18px
          color: #969696
          display: block
          width: 0.18rem
          height: 0.2rem
          background-size: 18px 20px
          background-repeat: no-repeat
          &.input-icon-username
            background-image: url(./image/username.png)
          &.input-icon-password
            background-image: url(./image/password.png)
    .btn
      display: block
      height: 0.34rem
      text-align: center
      line-height: 0.34rem
      padding: 0.06rem 0.18rem
      font-size: 18px
      border-radius: 4px
      cursor: pointer
      color: #fff
      background-color: #666
      border-color: #666
      margin-top: 0.1rem
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1)
      letter-spacing: 2px
      &:hover
      &:focus
        color: #fff
        background-color: #222
        border-color: #222
@media (max-width:768px)
  .content-home
    .content-login-box
      width: 2rem
      margin-left: -1.5rem
      .input-group
        .input-item
          input
            width: 1.51rem
</style>
