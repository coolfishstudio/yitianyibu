import contentManager from './manager'
import categoryManager from '../category/manager'
import { getFromReq } from '../util/pagination'
import { formatResult, handlerCustomError } from '../util/format'
import { CONTENT_LIMIT_DEFAULT } from '../util/const'

const findAll = async (req, res, next) => {
  try {
    const result = await contentManager.findAll(getFromReq(req.query, CONTENT_LIMIT_DEFAULT))
    result.list = result.list.map(item => {
      return {
        _id: item._id,
        createdAt: item.createdAt,
        hits: item.hits,
        title: item.title
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
    const result = await contentManager.findAll(getFromReq(req.query, CONTENT_LIMIT_DEFAULT), {
      category: categoryInfo._id
    })
    result.list = result.list.map(item => {
      return {
        _id: item._id,
        createdAt: item.createdAt,
        hits: item.hits,
        title: item.title
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
      category: null
    }
    await contentManager.hitContentById(req.params.id)
    result.content = await contentManager.getById(req.params.id)
    if (!result.content) {
      next(handlerCustomError(104004, '获取文章信息失败'))
    }
    if (result.content.category) {
      result.category = await categoryManager.getById(result.content.category)
    }
    res.json(formatResult(result))
  } catch (e) {
    next(handlerCustomError(104005, '查询失败'))
  }
}

export default {
  findAll,
  findAllByCategory,
  getById
}
