import log from '../../middleware/log'

const viewAdminPage = (req, res) => {
    log('category_controller').info('类别')
    res.renderAdminPage('category')
}

export default {
    viewAdminPage
}
