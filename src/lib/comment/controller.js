import log from '../../middleware/log'

const viewAdminPage = (req, res) => {
    log('comment_controller').info('评论')
    res.renderAdminPage('comment')
}

export default {
    viewAdminPage
}
