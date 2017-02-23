import authManager from './manager'

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

export default {
    signin,
    signout
}
