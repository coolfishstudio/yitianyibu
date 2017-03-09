import log from '../../middleware/log'
import fileManager from '../file/manager'

const viewAdminContent = (req, res) => {
    log('content_controller').info('内容')
    res.renderAdminPage('content/list')
}

const viewAdminCreateContent = (req, res) => {
    log('content_controller').info('创建内容')
    res.renderAdminPage('content/create')
}
const uploadImage = (req, res, next) => {
    let isFileLimit = false
    req.busboy.on('file', (fieldname, file, filename) => {
        file.on('limit', () => {
            isFileLimit = true
            res.json({
                success: false,
                msg    : 'File size too large. Max is 1Mb'
            })
        })
        fileManager.uploadContentImage(file, { filename }, (err, result) => {
            if (err) {
                return next(err)
            }
            if (isFileLimit) {
                return false
            }
            res.json({
                success: true,
                url    : result.url
            })
        })
    })
    req.pipe(req.busboy)
}

export default {
    viewAdminContent,
    viewAdminCreateContent,
    uploadImage
}
