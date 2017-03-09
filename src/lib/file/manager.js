import fs from 'fs'
import path from 'path'
import formidable from 'formidable'
import utility from 'utility'

const uploadImagePath = 'images/homepage'
const uploadContentImagePath = 'images/content'

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

const uploadContentImage = (file, options, callback) => {
    const filename = options.filename
    const newFilename = utility.md5(filename + String((new Date()).getTime())) +
    path.extname(filename)

    const filePath = path.join(`./public/${uploadContentImagePath}`, newFilename)
    const fileUrl = `/${uploadContentImagePath}/${newFilename}`

    file.on('end', () => {
        callback(null, {
            url: fileUrl
        })
    })
    file.pipe(fs.createWriteStream(filePath))
}

export default {
    uploadImage,
    uploadContentImage
}
