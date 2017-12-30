import contentManager from './manager'
import { getFromReq } from '../util/pagination'
import { formatResult, handlerCustomError } from '../util/format'
import { CONTENT_LIMIT_DEFAULT } from '../util/const'

const findAll = async (req, res, next) => {
  try {
    const result = await contentManager.findAll(getFromReq(req.query, CONTENT_LIMIT_DEFAULT ))
    console.log(result)
    result.map(item => {
      delete item.html
      delete item.markdown
      delete item.images
      delete item.tag
      delete item.status
      delete item.featured
      delete item.removed
      delete item.createdByID
      return item
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
    result.map(item => {
      delete item.html
      delete item.markdown
      delete item.images
      delete item.tag
      delete item.status
      delete item.featured
      delete item.removed
      delete item.createdByID
      return item
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
