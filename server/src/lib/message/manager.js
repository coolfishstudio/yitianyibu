import Model from './model'
import { getMeta } from '../util/pagination'

const insert = async (options = {}) => {
  const result = await Model.create(Object.assign({}, options))
  return result
}

const removeById = async (id) => {
  let analyse = await Model.findById(id)
  if (!analyse) {
    return null
  }
  analyse.removed = true
  analyse.updatedAt = Date.now()
  const result = await analyse.save()
  return result
}

const findAll = async (queryOptions = {}, options = {}) => {
  const total = await Model.count({ removed: false })
  options = Object.assign(options, { removed: false })
  const list = await Model.find(options).limit(queryOptions.limit).skip(queryOptions.offset).sort({ createdAt: -1 })
  return {
    meta: getMeta(total, list.length, queryOptions),
    list
  }
}

export default {
  findAll,
  insert,
  removeById
}
