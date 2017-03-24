import log from '../../middleware/log'
import appManager from '../app/manager'

const viewPage = async (req, res) => {
    log('labs_controller').info('实验室')
    const applications = await appManager.findApps()
    res.renderPage('labs', { applications })
}

export default {
    viewPage
}
