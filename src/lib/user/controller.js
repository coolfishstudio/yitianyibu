import UserManager from './manager'
import helper from '../../util/helper'
import log from '../../middleware/log'

const { ADMIN_USERNAME, ADMIN_PASSWORD, ADMIN_EMAIL } = process.env

const createUser = async (options = {}) => {
    if (!options.email) {
        return Promise.resolve({
            success: false,
            message: '邮箱不能为空'
        })
    }
    if (!options.username) {
        return Promise.resolve({
            success: false,
            message: '用户名不能为空'
        })
    }
    if (!options.password) {
        return Promise.resolve({
            success: false,
            message: '密码不能为空'
        })
    }
    const findResult = await UserManager.getUserByEmail(options.email)
    if (findResult) {
        return Promise.resolve({
            success: false,
            message: '邮箱已注册'
        })
    }
    options.password = helper.getMD5(options.password)
    const addResult = await UserManager.addUser(options)
    return addResult
}

const initUser = async () => {
    log('user_controller').info('检测管理员账户是否存在')
    const options = {
        username: ADMIN_USERNAME,
        password: ADMIN_PASSWORD,
        email   : ADMIN_EMAIL
    }
    const findResult = await UserManager.getUserByEmail(options.email)
    if (findResult) {
        log('user_controller').info('管理员账户已存在')
        return null
    }
    log('user_controller').info('管理员账户不存在, 开始创建管理员')
    options.password = helper.getMD5(options.password)
    const initResult = await UserManager.addUser(options)
    if (initResult) {
        log('user_controller').info('创建管理员成功')
    } else {
        log('user_controller').info('创建管理员失败')
    }
    return null
}

export default {
    initUser,
    createUser
}
