import messageManager from './manager'
import { getFromReq } from '../util/pagination'
import { formatResult, handlerCustomError } from '../util/format'
import { MESSAGE_LIMIT_DEFAULT } from '../util/const'
import { getClientIp } from '../util/tool'

const findAll = async (req, res, next) => {
  try {
    const result = await messageManager.findAll(getFromReq(req.query, MESSAGE_LIMIT_DEFAULT))
    res.json(formatResult(result))
  } catch (e) {
    next(handlerCustomError(107003, '查询失败'))
  }
}

const insert = async (req, res, next) => {
  const ip = getClientIp(req)
  let name = (req.body.name || '').trim()
  const email = (req.body.email || '').trim()
  const content = (req.body.content || '').trim()
  if (!content.length) {
    next(handlerCustomError(107001, '内容不能为空'))
  }
  if (name === '') {
    let adds = ip.split('.')
    adds[ adds.length - 1 ] = '*'
    name = adds.join('.')
  }
  try {
    const result = await messageManager.insert({ ip, name, email, content })
    res.json(formatResult())
  } catch (e) {
    next(handlerCustomError(107002, '创建失败'))
  }
}

const removeById = async (req, res, next) => {
  try {
    const result = await messageManager.removeById(req.params.id)
    res.json(formatResult())
  } catch (e) {
    next(handlerCustomError(107004, '删除失败'))
  }
}

export default {
  findAll,
  insert,
  removeById
}
