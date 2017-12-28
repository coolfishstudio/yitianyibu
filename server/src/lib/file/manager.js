import Busboy from 'busboy'
import { gfs } from '../../middleware/db'

const getFileStreamByID = (id, callback) => {
  callback(null, gfs.createReadStream({ _id: id }))
}

const getFileInfoByID = (id, callback) => {
  gfs.findOne({ _id: id }, (error, file) => {
    if (error) return callback(error)
    if (file) {
      file.id = file._id
      delete file._id
    }
    callback(null, file)
  })
}

const getFileInfoByMD5 = (md5, callback) => {
  gfs.findOne({ md5 }, (error, file) => {
    if (error) return callback(error)
    if (file) {
      file.id = file._id
      delete file._id
    }
    callback(null, file)
  })
}

const saveFile = (headers, callback) => {
  let files = []
  let num = 0
  let finished = false
  let busboy = new Busboy({ headers })

  busboy.on('file', (fieldname, file, name, encoding, mimetype) => {
    ((index) => {
      let writestream = gfs.createWriteStream({
        filename: name,
        content_type: mimetype
      })
      file.pipe(writestream)
      writestream.on('close', (result) => {
        result.id = result._id
        delete result._id
        if (result.length !== 0) {
          files[index] = result
        }
        if (--num === 0 && finished) {
          callback(null, files)
        }
      })
    })(num++)
  })
  busboy.on('finish', () => {  
    finished = true
    if (!num) {
      callback(null, files)
    }
  })
  return busboy
}

export default {
  getFileInfoByID,
  getFileInfoByMD5,
  getFileStreamByID,
  saveFile
}
