import log from '../../middleware/log'

const viewAdminPage = (req, res) => {
    log('stat_controller').info('统计')
    res.renderAdminPage('stat')
}

export default {
    viewAdminPage
}
