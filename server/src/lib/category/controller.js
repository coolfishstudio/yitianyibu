import categoryManager from './manager'
import { getFromReq } from '../util/pagination'
import { formatResult } from '../util/format'
import { CATEGORY_LIMIT_DEFAULT } from '../util/const'

const findAll = async (req, res, next) => {
  const result = await categoryManager.findAll(getFromReq(req.query, APP_LIMIT_DEFAULT))
  res.json(formatResult(result))
}

export default {
  findAll
}
