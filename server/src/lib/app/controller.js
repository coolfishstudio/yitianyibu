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

const insert = async (req, res, next) => {
  const name = (req.body.name || '').trim()
  const title = (req.body.title || '').trim()
  const desc = (req.body.desc || '').trim()
  const url = (req.body.url || '').trim()
  const type = parseInt(req.body.type) || 0
  const icon = (req.body.icon || '').trim()
  const cover = (req.body.cover || '').trim()

  const createdByID = req.user.id
  if (!name) {
    next(handlerCustomError(107005, '名称不能为空'))
  }
  if (!title) {
    next(handlerCustomError(107006, '标题不能为空'))
  }
  if (!url) {
    next(handlerCustomError(107007, '外链不能为空'))
  }
  if (!icon) {
    next(handlerCustomError(107008, '请上传图标'))
  }
  if (!cover) {
    next(handlerCustomError(107009, '请上传封面'))
  }
  if (!createdByID) {
    next(handlerCustomError(107010, '非法用户操作'))
  }
  try {
    const result = await appManager.insert({ name, title, desc, url, icon, type, cover, createdByID })
    res.json(formatResult())
  } catch (e) {
    console.log(e)
    next(handlerCustomError(107003, '创建失败'))
  }
}

export default {
  findAll,
  recordById,
  insert
}
