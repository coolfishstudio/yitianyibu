import fs from 'fs'
import formidable from 'formidable'

const uploadImagePath = 'images/homepage/apps'

const uploadImage = (req, res, callback) => {
    let form = new formidable.IncomingForm()
    form.parse(req, (error, fields, files) => {
        if (error) {
            const err = new Error('上传图片失败')
            err.status = 400
            console.error(error)
            return callback(err)
        }
        const ms = new Date().getTime()
        /* eslint-disable */
        for (let name in files) {
            ((item) => {
                if (!files[ item ].name) {
                    fields[ item ] = ''
                } else {
                    const types = files[ item ].name.split('.')
                    const imagePath = `${uploadImagePath}/${item}_${ms}.${String(types[ types.length - 1 ])}`
                    fields[ item ] = `./${imagePath}`
                    fs.renameSync(files[ item ].path, `./public/${imagePath}`)
                }
            })(name)
        }
        /* eslint-enable */
        callback(error, fields)
    })
}

export default {
    uploadImage
}
