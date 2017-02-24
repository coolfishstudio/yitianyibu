import log from '../../middleware/log'

const viewAdminPage = (req, res) => {
    log('content_controller').info('内容')
    res.renderAdminPage('content')
}

export default {
    viewAdminPage
}
