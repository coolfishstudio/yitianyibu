import categoryManager from './manager'
import { getFromReq } from '../util/pagination'
import { formatResult, handlerCustomError } from '../util/format'
import { CATEGORY_LIMIT_DEFAULT } from '../util/const'

const findAll = async (req, res, next) => {
  try {
    const result = await categoryManager.findAll(getFromReq(req.query, CATEGORY_LIMIT_DEFAULT))
    res.json(formatResult(result))
  } catch (e) {
    next(handlerCustomError(107003, '查询失败'))
  }
}

export default {
  findAll
}
