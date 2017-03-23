import log from '../../middleware/log'

const viewUnfinishedPage = (req, res) => {
    log('homepage_controller').info('未完成页面')
    res.renderPage('unfinished')
}

export default {
    viewUnfinishedPage
}
