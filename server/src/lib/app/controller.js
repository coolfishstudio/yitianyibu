import appManager from './manager'
import { getFromReq } from '../util/pagination'
import { formatResult } from '../util/format'
import { APP_LIMIT_DEFAULT } from '../util/const'

const findAll = async (req, res, next) => {
  const result = await appManager.findAll(getFromReq(req.query, APP_LIMIT_DEFAULT))
  res.json(formatResult(result))
}

const getById = async (req, res, next) => {
  const result = await appManager.getById(req.params.id)
  res.json(formatResult(result))
}

const insert = (req, res, next) => {
  const name = (req.body.name || '').trim()
  const title = (req.body.title || '').trim()
  const pathname = (req.body.pathname || '').trim()
  const logo = (req.body.logo || '').trim()
  const cover = (req.body.cover || '').trim()
  const url = (req.body.url || '').trim()
  const desc = (req.body.desc || '').trim()
  const type = (req.body.type || '0').trim()
  res.json({'status':{'code':0,'message':'success'},'data':{}})
}

const updateById = (req, res, next) => {
  res.json({'status':{'code':0,'message':'success'},'data':{}})
}

const removeById = (req, res, next) => {
  res.json({'status':{'code':0,'message':'success'},'data':{}})
}

export default {
  findAll,
  getById,
  insert,
  updateById,
  removeById
}
