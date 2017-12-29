import appManager from './manager'
import { getFromReq } from '../util/pagination'
import { formatResult, handlerCustomError } from '../util/format'
import { APP_LIMIT_DEFAULT } from '../util/const'

const findAll = async (req, res, next) => {
  try {
    const result = await appManager.findAll(getFromReq(req.query, APP_LIMIT_DEFAULT))
    res.json(formatResult(result))
  } catch (e) {
    next(handlerCustomError(107001, '查询失败'))
  }
}


const recordById = async (req, res, next) => {
  try {
    const result = await appManager.recordById(req.params.id)
    res.json(formatResult({}))
  } catch (e) {
    next(handlerCustomError(107002, '记录失败'))
  }
}


export default {
  findAll,
  recordById
}
