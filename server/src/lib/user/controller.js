import jwt from "jwt-simple"

import userManager from './manager'
import { getMD5 } from '../util/tool'
import { formatResult, handlerCustomError } from '../util/format'
import { JWT_SECRET } from '../../config'

const login = async (req, res, next) => {
  const email = req.body.email || ''
  const password = req.body.password || ''
  if (!email) {
    next(handlerCustomError(101001, '请输入账号'))
  }
  if (!password) {
    next(handlerCustomError(101002, '请输入密码'))
  }
  try {
    const result = await userManager.getUserByEmail(email)
    if (!result) {
      next(handlerCustomError(101003, '用户不存在'))
    } else if (getMD5(password) !== result.password) {
      next(handlerCustomError(101004, '密码不正确'))
    } else {
      const payload = { id: result._id }
      res.json(formatResult({ token: jwt.encode(payload, JWT_SECRET) }))
    }
  } catch (e) {
    next(handlerCustomError(101000, '登录失败'))
  }
}

export default {
  login
}
