import log from '../../middleware/log'

const viewPage = (req, res) => {
    log('about_controller').info('关于我')
    res.renderPage('about')
}

export default {
    viewPage
}
