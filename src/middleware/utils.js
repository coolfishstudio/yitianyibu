export default () => (req, res, next) => {
    console.log('utilsMiddleware: init')
    // admin
    res.renderAdminPage = (name, data) => {
        if (!data) data = {}
        data.pageName = name
        res.render(`admin/pages/${name}`, data)
    }
    // homepage
    res.renderPage = function (name, data) {
        if (!data) data = {}
        data.pageName = name
        res.render(`homepage/pages/${name}`, data)
    }
    next()
}
