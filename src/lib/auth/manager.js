import passport from 'passport'
import passportLocal from 'passport-local'
import userManager from '../user/manager'
import helper from '../../util/helper'
import log from '../../middleware/log'

const LocalStrategy = passportLocal.Strategy

const login = async (req, res, callback) => {
    passport.authenticate('local', (error, user, info) => {
        if (error) {
            error.code = 500
            return callback(error)
        }
        if (info) {
            error.code = 400
            return callback(info)
        }
        req.logIn(user, (err) => {
            if (err) {
                return callback(err)
            }
            req.session.cookie.maxAge = 604800000
            req.user = user
            callback()
        })
    })(req, res, callback)
}

passport.use('local', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, (email, password, done) => {
    userManager.getUserByEmail(email).then((user) => {
        if (!user) {
            const err = new Error('查无此用户')
            err.status = 400
            return done(err)
        }
        if (helper.getMD5(password) !== user.password) {
            const err = new Error('密码错误')
            err.status = 400
            return done(err)
        }
        log('auth').info(`账户${user.email}已成功登录`)
        user.password = null
        return done(null, user)
    })
}))

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((user, done) => {
    done(null, user)
})

export default {
    login
}
