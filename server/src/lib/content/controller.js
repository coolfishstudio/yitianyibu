import contentManager from './manager'
import { getFromReq } from '../util/pagination'
import { formatResult, handlerCustomError } from '../util/format'
import { CONTENT_LIMIT_DEFAULT } from '../util/const'

const findAll = async (req, res, next) => {
  try {
    const result = await contentManager.findAll(getFromReq(req.query, CONTENT_LIMIT_DEFAULT ))
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
    console.log(e)
    next(handlerCustomError(104001, '查询失败'))
  }
}

const findAllByCategory = async (req, res, next) => {
  try {
    const result = await contentManager.findAll(getFromReq(req.query, CONTENT_LIMIT_DEFAULT ), {
      category: req.params.id
    })
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
    console.log(e)
    next(handlerCustomError(104002, '查询失败'))
  }
}

export default {
  findAll,
  findAllByCategory
}
