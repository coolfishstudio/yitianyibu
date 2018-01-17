import contentManager from './manager'
import categoryManager from '../category/manager'
import tagManager from '../tag/manager'
import { getFromReq } from '../util/pagination'
import { formatResult, handlerCustomError } from '../util/format'
import { CONTENT_LIMIT_DEFAULT } from '../util/const'
import { md, xss } from '../util/tool'

const findAll = async (req, res, next) => {
  try {
    let options = {}
    if (!req.headers['authorization']) {
      options.status = 'published'
    }
    const result = await contentManager.findAll(getFromReq(req.query, CONTENT_LIMIT_DEFAULT), options)
    result.list = result.list.map(item => {
      return {
        _id: item._id,
        createdAt: item.createdAt,
        hits: item.hits,
        title: item.title,
        status: item.status
      }
    })
    res.json(formatResult(result))
  } catch (e) {
    next(handlerCustomError(104001, '查询失败'))
  }
}

const findAllByCategory = async (req, res, next) => {
  try {
    let categoryInfo = null
    if (/^[0-9a-f]{24}$/.test(req.params.id)) {
      categoryInfo = await categoryManager.getById(req.params.id)
    } else {
      categoryInfo = await categoryManager.getByPathname(req.params.id)
    }
    if (!categoryInfo) {
      next(handlerCustomError(104002, '获取类别信息失败'))
    }
    let options = {
      category: categoryInfo._id
    }
    if (!req.headers['authorization']) {
      options.status = 'published'
    }
    const result = await contentManager.findAll(getFromReq(req.query, CONTENT_LIMIT_DEFAULT), options)
    result.list = result.list.map(item => {
      return {
        _id: item._id,
        createdAt: item.createdAt,
        hits: item.hits,
        title: item.title,
        status: item.status
      }
    })
    result.info = categoryInfo
    res.json(formatResult(result))
  } catch (e) {
    next(handlerCustomError(104003, '查询失败'))
  }
}

const getById = async (req, res, next) => {
  try {
    const result = {
      content: null,
      category: null,
      near: null
    }
    await contentManager.hitById(req.params.id)
    let _content = await contentManager.getById(req.params.id)
    if (!_content) {
      next(handlerCustomError(104004, '获取文章信息失败'))
    }
    result.content = {
      title: _content.title,
      html: _content.html,
      createdAt: _content.createdAt,
      hits: _content.hits
    }
    if (_content.tag && _content.tag.length > 0) {
      let _tag = []
      for (let i = 0; i < _content.tag.length; i++) {
        let info = await tagManager.getById(_content.tag[i])
        _tag.push(info.name.toString())
      }
      result.content.tag = _tag
    }
    if (_content.category) {
      let _category = await categoryManager.getById(_content.category)
      result.category = {
        _id: _category._id,
        name: _category.name,
        desc: _category.desc,
        pathname: _category.pathname
      }
    }
    result.near = await contentManager.getNearByCreatedAt(result.content.createdAt)
    if (result.near.prev) {
      result.near.prev = {
        _id: result.near.prev._id,
        title: result.near.prev.title
      }
    }
    if (result.near.next) {
      result.near.next = {
        _id: result.near.next._id,
        title: result.near.next.title
      }
    }
    res.json(formatResult(result))
  } catch (e) {
    next(handlerCustomError(104005, '查询失败'))
  }
}

const insert = async (req, res, next) => {
  const title = (req.body.title || '').trim()
  const tags = (req.body.tag || '').trim().split(',')
  const markdown = (req.body.markdown || '').trim()
  const category = (req.body.category || '').trim()
  const createdByID = req.user.id
  if (!title) {
    next(handlerCustomError(104006, '标题不能为空'))
  }
  if (!markdown) {
    next(handlerCustomError(104007, '内容不能为空'))
  }
  if (!category) {
    next(handlerCustomError(104008, '类别不能为空'))
  }
  if (!tags) {
    next(handlerCustomError(104009, '标签不能为空'))
  }
  if (!createdByID) {
    next(handlerCustomError(104010, '非法用户操作'))
  }
  try {
    let categoryInfo = null
    if (category) {
      categoryInfo = await categoryManager.getById(category)
      if (!categoryInfo) {
        return next(handlerCustomError(104011, '类别不存在'))
      }
    }
    const html = `<div class="markdown-text">${xss.process(md.render(markdown || ''))}</div>`
    const reg = new RegExp('!\\[.*?\\]\\((.*?)\\)', 'g')
    let images = markdown.match(reg) || []
    images = images.map((item) => {
        return item.replace(/!\[.*\]\(/, '').replace(/\)/, '')
    })
    let tag = []
    for (let i = 0; i < tags.length; i++) {
      let info = await tagManager.findOneAndCreate(tags[i], { createdByID })
      tag.push(info._id.toString())
    }
    const result = await contentManager.insert({
      title,
      tag,
      markdown,
      html,
      category: categoryInfo._id,
      images,
      createdByID
    })
    res.json(formatResult())
  } catch (e) {
    next(handlerCustomError(102002, '创建失败'))
  }
}

const update = (req, res, next) => {
  console.log(1)
}

export default {
  findAll,
  findAllByCategory,
  getById,
  insert,
  update
}
