import axios from 'axios'
import storage from 'common/js/storage.js'
import CONST from './const'

// 走 Github 的接口
const github = {
  host: 'https://api.github.com',
  user: 'isaaxite', // 'coolfishstudio',
  repository: 'blog', // 'coolfishstudio.github.io',
  // user: 'coolfishstudio',
  // repository: 'coolfishstudio.github.io',
  perpage: 30,
  sort: 'created'
}

const GITHUB_API = {
  // 核心
  _core (url, data = {}, method = 'GET', headers = { 'Content-Type': 'application/json' }) {
    if (!headers['Content-Type']) {
      headers['Content-Type'] = 'application/json'
    }
    let token = storage.get(CONST.STORAGE_AUTH_TOKEN, null)
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }
    headers['accept'] = 'application/vnd.github.v3.html'
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
    }).catch(function (error) {
      let data = error.response.data
      if (error.response.status === 401) {
        data = {status: { code: 401401, message: '非法用户操作' }}
      }
      return Promise.reject(data)
    })
  },
  _get (url, data, headers) {
    return this._core(url, data, 'GET', headers)
  },
  _post (url, data, headers) {
    return this._core(url, data, 'POST', headers)
  },
  _delete (url, data, headers) {
    return this._core(url, data, 'DELETE', headers)
  },
  /** api **/
  // 获取个人信息
  getUserInfo () {
    return this._get(`${github.host}/users/${github.user}`)
  },
  // 获取标签列表
  getLabelList () {
    return this._get(`${github.host}/repos/${github.user}/${github.repository}/labels`, { per_page: 100 })
  },
  // 分页获取 issue 列表
  getIssueList (options = {}) {
    options.per_page = options.per_page || github.perpage
    options.sort = github.sort
    const query = [
      `repo:${github.user}/${github.repository}`,
      options.label ? `label:"${options.label}"` : ''
      // 'state:open'
    ].filter(i => i)
    if (options.keyword) {
      query.push(options.keyword)
    }
    return this._get(`${github.host}/search/issues?q=${query.join('+')}`, options)
  },
  // 获取 label 详情
  getLabel (id) {
    return this._get(`${github.host}/repos/${github.user}/${github.repository}/labels/${id}`)
  },
  // 获取 issue 详情
  getIssue (id) {
    return this._get(`${github.host}/repos/${github.user}/${github.repository}/issues/${id}`)
  },
  // 获取指定 issue 的 comment 列表
  getComments (id) {
    return this._get(`${github.host}/repos/${github.user}/${github.repository}/issues/${id}/comments`)
  }
}

export default GITHUB_API
