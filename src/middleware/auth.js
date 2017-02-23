const notAuth2Login = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/admin/login')
    }
    next()
}
const auth2Home = (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.redirect('/admin')
    }
    next()
}

export default {
    auth2Home,
    notAuth2Login
}
