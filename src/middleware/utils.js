import log from './log'

export default () => (req, res, next) => {
    log('utils').info('加载工具方法')
    // admin
    res.renderAdminPage = (name, data) => {
        if (!data) data = {}
        data.pageName = name
        res.render(`admin/pages/${name}`, data)
    }
    // homepage
    res.renderPage = (name, data) => {
        if (!data) data = {}
        data.pageName = name
        res.render(`homepage/pages/${name}`, data)
    }
    next()
}
