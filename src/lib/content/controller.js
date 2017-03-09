import log from '../../middleware/log'

const viewAdminContent = (req, res) => {
    log('content_controller').info('内容')
    res.renderAdminPage('content/list')
}

const viewAdminCreateContent = (req, res) => {
    log('content_controller').info('创建内容')
    res.renderAdminPage('content/create')
}
const uploadImage = (req, res) => {
    res.json({})
}

export default {
    viewAdminContent,
    viewAdminCreateContent,
    uploadImage
}
