import Model from './model'
import { getMeta } from '../util/pagination'

const findAll = async (queryOptions = {}, options = {}) => {
  const total = await Model.count({ removed: false })
  options = Object.assign(options, { removed: false })
  const list = await Model.find(options).limit(queryOptions.limit).skip(queryOptions.offset).sort({ createdAt: -1 })
  return {
    meta: getMeta(total, list.length, queryOptions),
    list
  }
}

const recordById = async (appId) => {
  let analyse = await Model.findById(appId)
  console.log(analyse)
  if (!analyse) {
      return null
  }
  ++analyse.hits
  console.log(analyse)
  const result = await analyse.save()
  console.log(result)
  return result
}

export default {
  findAll,
  recordById
}
