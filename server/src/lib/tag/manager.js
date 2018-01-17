import Model from './model'

const findOneAndCreate = async (name, options = {}) => {
  console.log()
  let result = await Model.findOne({ name })
  if (!result) {
    result = await Model.create(Object.assign({ name }, options))
  }
  return result
}

const getById = async (id) => {
  const result = await Model.findById(id)
  return result
}

export default {
  findOneAndCreate,
  getById
}
