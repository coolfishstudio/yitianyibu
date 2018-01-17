import Model from './model'
import { getMeta } from '../util/pagination'

const findAll = async (queryOptions = {}, options = {}) => {
  const total = await Model.count({ removed: false })
  options = Object.assign(options, { removed: false })
  let list = []
  if (queryOptions.limit === -1) {
    list = await Model.find(options).sort({ createdAt: -1 })
  } else {
    list = await Model.find(options).limit(queryOptions.limit).skip(queryOptions.offset).sort({ createdAt: -1 })
  }
  return {
    meta: getMeta(total, list.length, queryOptions),
    list
  }
}

const getById = async (id) => {
  const result = await Model.findById(id)
  return result
}

const hitById = async (id) => {
    let analyse = await Model.findById(id)
    if (!analyse) {
        return null
    }
    ++analyse.hits
    const result = await analyse.save()
    return result
}

const getNearByCreatedAt = async (createdAt) => {
  const prev = await Model.findOne({ removed: false, createdAt: { $lt: createdAt } }).sort({ _id: -1 })
  const next = await Model.findOne({ removed: false, createdAt: { $gt: createdAt } }).sort({ _id: 1 })
  return {
    prev,
    next
  }
}

const insert = async (options = {}) => {
  const result = await Model.create(Object.assign({}, options))
  return result
}

export default {
  findAll,
  getById,
  hitById,
  getNearByCreatedAt,
  insert
}
