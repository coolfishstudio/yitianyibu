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
const viewAdminPage = async (req, res) => {
    log('message_controller').info('删除留言页面')
    const result = await commentManager.findCommentsByContentId('message')
    res.renderAdminPage('message/index', { result })
}
const viewAdminRemoveMessage = async (req, res) => {
    log('message_controller').info('访问留言板后台')
    const result = await commentManager.getCommentById(req.params.messageId)
    res.renderAdminPage('message/remove', { result })
}
const removeMessage = async (req, res, next) => {
    log('message_controller').info('删除留言')
    const result = await commentManager.removeCommentById(req.params.messageId)
    if (!result) {
        const err = new Error('删除失败')
        err.status = 400
        return next(err)
    }
    res.redirect('/admin/message')
}

export default {
    viewPage,
    viewAdminPage,
    viewAdminRemoveMessage,
    removeMessage
}
