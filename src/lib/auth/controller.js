import authManager from './manager'
import log from '../../middleware/log'

const signin = async (req, res, next) => {
    const email = req.body.email || ''
    const password = req.body.password || ''

    if (!email || !password) {
        const err = new Error('参数不足')
        err.status = 400
        return next(err)
    }
    authManager.login(req, res, (error) => {
        if (error) return next(error)
        res.redirect('/admin')
    })
}

const signout = (req, res) => {
    req.logout()
    res.redirect('/')
}

const viewAdminLogin = (req, res) => {
    log('auth_controller').info('访问后台登录页')
    res.renderAdminPage('login')
}

export default {
    signin,
    signout,
    viewAdminLogin
}
