import fs from 'fs'
import formidable from 'formidable'

const uploadImagePath = 'images/homepage'

const uploadImage = async (req) => {
    return new Promise((resolve, reject) => {
        let form = new formidable.IncomingForm()
        form.parse(req, (error, fields, files) => {
            if (error) {
                reject(error)
            }
            const ms = new Date().getTime()
            fields.ms = ms
            /* eslint-disable */
            for (let item in files) {
                if (!files[ item ].name) {
                    fields[ item ] = ''
                } else {
                    const types = files[ item ].name.split('.')
                    const imagePath = `${uploadImagePath}/${fields.path || 'temp'}/${ms}_${item}.${String(types[ types.length - 1 ])}`
                    fields[ item ] = `./${imagePath}`
                    fs.renameSync(files[ item ].path, `./public/${imagePath}`)
                }
            }
            /* eslint-enable */
            resolve(fields)
        })
    })
}

export default {
    uploadImage
}
