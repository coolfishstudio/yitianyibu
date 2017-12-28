import axios from 'axios'

const NODE_ENV = process.env.NODE_ENV || 'development'

const host = {
  'production': 'http://api.yitianyibu.com',
  'development': 'http://localhost:3006'
}[NODE_ENV]

const API = {
  // 核心
  _core (url, data = {}, method = 'GET', headers = { 'Content-Type': 'application/json' }) {
    if (!headers['Content-Type']) {
      headers['Content-Type'] = 'application/json'
    }
    let options = {
      url,
      method,
      headers
    }
    if (method === 'GET') {
      options.params = data
    } else {
      options.data = data
    }
    return axios(options).then(results => {
      return Promise.resolve(results.data)
    }).catch(function (error, data) {
      // todo 错误拦截
      return Promise.reject(error.response.data)
    })
  },
  _get (url, data, headers) {
    return this._core(url, data, 'GET', headers)
  },
  _post (url, data, headers) {
    return this._core(url, data, 'POST', headers)
  },
  /** api **/
  // 获取留言
  getMessageList (options = {}) {
    const url = `${host}/api/message`
    return this._get(url, options)
  },
  // 发布留言
  insertMessage (options = {}) {
    const url = `${host}/api/message`
    return this._post(url, options)
  },
  // 登录
  login (options = {}) {
    const url = `${host}/api/user/login`
    return this._post(url, options)
  }
}

export default API
