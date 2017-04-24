import log from '../../middleware/log'
import statManager from './manager'
import { getClientIp } from '../../util/helper'

const viewAdminPage = (req, res) => {
    log('stat_controller').info('统计')
    res.renderAdminPage('stat')
}

// 记录数据
const recordStat = (req, res) => {
    const ip = getClientIp(req)
    const url = req.query.u
    statManager.addStat({ ip, url })
    res.send('ok')
}

export default {
    viewAdminPage,
    recordStat
}
