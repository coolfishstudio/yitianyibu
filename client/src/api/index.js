import axios from 'axios'

const NODE_ENV = process.env.NODE_ENV || 'development'

const host = {
  'production': 'http://api.yitianyibu.com',
  'development': 'http://api.yitianyibu.com'
  // 'development': 'http://localhost:9951'
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
  },
  // 实验室
  getLabsList (options = {}) {
    const url = `${host}/api/app`
    return this._get(url, options)
  },
  recordHit (id) {
    const url = `${host}/api/app/${id}/record`
    return this._get(url)
  },
  // 手帐
  getCategoryList (options = {}) {
    const url = `${host}/api/category`
    return this._get(url, options)
  },
  getContentByCategory (id, options = {}) {
    const url = `${host}/api/content/by/category/${id}`
    return this._get(url, options)
  },
  // 内容
  getContentList (options = {}) {
    const url = `${host}/api/content`
    return this._get(url, options)
  },
  getContentInfo (id) {
    const url = `${host}/api/content/${id}`
    return this._get(url)
  }
}

export default API
