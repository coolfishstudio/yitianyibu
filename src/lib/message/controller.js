import log from '../../middleware/log'
import commentManager from '../comment/manager'
import { getClientIp } from '../../util/helper'

const viewPage = async (req, res) => {
    log('message_controller').info('访问留言板')

    const ip = getClientIp(req)
    let data = {}
    data.clientIp = ip
    /* eslint-disable */
    data._id = 'message'
    /* eslint-enable */
    data.messages = await commentManager.findCommentsByContentId('message')
    res.renderPage('message', { data })
}
const viewAdminPage = (req, res) => {
    log('message_controller').info('访问留言板后台')
    res.renderAdminPage('message')
}

export default {
    viewPage,
    viewAdminPage
}
