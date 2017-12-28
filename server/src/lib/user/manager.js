import Model from './model'
import { ADMIN_USERNAME, ADMIN_PASSWORD, ADMIN_EMAIL } from '../../config'
import { getMD5 } from '../util/tool'

const insert = async (options = {}) => {
  const result = await Model.create(options)
  return result
}

const getUserByEmail = async (email) => {
    const getResult = await Model.findOne({ email })
    return getResult
}

const initUser = async () => {
  const options = {
    username: ADMIN_USERNAME,
    password: ADMIN_PASSWORD,
    email   : ADMIN_EMAIL
  }
  console.log(`检查管理员初始化 管理员账户 [${ADMIN_EMAIL}]`)
  const findResult = await getUserByEmail(options.email)
  if (findResult) {
    // 管理员账户已存在
    console.log(`管理员账户已存在 管理员账户 [${ADMIN_EMAIL}]`)
    return null
  }
  console.log(`管理员账户不存在 开始初始化 管理员账户 [${ADMIN_EMAIL}]`)
  options.password = getMD5(options.password)
  const initResult = await insert(options)
  console.log('管理员账户初始化结束')
  return null
}

export default {
  getUserByEmail,
  initUser
}
