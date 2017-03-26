import log from '../../middleware/log'
import commentManager from './manager'
import { getClientIp } from '../../util/helper'

const viewAdminPage = (req, res) => {
    log('comment_controller').info('评论')
    res.renderAdminPage('comment')
}
const createComment = async (req, res, next) => {
    const ip = getClientIp(req)
    let name = (req.body.name || '').trim()
    const email = (req.body.email || '').trim()
    const content = (req.body.content || '').trim()
    // 校验
    let createError = ''
    if (content === '') {
        createError = '内容不能为空'
    }
    // 校验结果
    if (createError) {
        const err = new Error(createError)
        err.status = 400
        return next(err)
    }
    if (name === '') {
        let adds = ip.split('.')
        adds[ adds.length - 1 ] = '*'
        name = adds.join('.')
    }
    const result = await commentManager.addComment({
        ip,
        name,
        email,
        content,
        contentId: req.params.pid
    })
    if (!result) {
        const err = new Error('评论失败')
        err.status = 400
        return next(err)
    }
    if (req.params.pid === 'message') {
        res.redirect(`/${req.params.pid}`)
    } else {
        res.redirect(`/post/${req.params.pid}`)
    }
}

export default {
    viewAdminPage,
    createComment
}
