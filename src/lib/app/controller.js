import log from '../../middleware/log'

const viewAdminPage = (req, res) => {
    log('app_controller').info('应用')
    res.renderAdminPage('app')
}

export default {
    viewAdminPage
}
