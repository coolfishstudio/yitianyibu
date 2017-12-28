import fileManager from './manager'
import { formatResult } from '../util/format'

const getFileById = (req, res, next) => {
  fileManager.getFileInfoByID(req.params.id, (error, fileInfo) => {
    if (error) return next(error)
    if (!fileInfo) {
      const error = new Error('Image not found in the database.')
      error.status = 404
      error.code = 100001
      return next(error)
    }
    fileManager.getFileStreamByID(req.params.id, (error, stream) => {
      if (error) return next(error)
      stream.pipe(res)
    })
  })
}

const saveFile = (req, res, next) => {
  if (/^multipart\/form-data/i.test(req.headers[ 'content-type' ]) || 
        /^application\/x-www-form-urlencoded/i.test(req.headers[ 'content-type' ])) {
    req.pipe(fileManager.saveFile(req.headers, (error, result) => {
      res.json(formatResult(result))
    }))
  } else {
    const error = new Error('Image content-type not form-data or x-www-form-urlencoded.')
    error.status = 400
    error.code = 100002
    return next(error)
  }
}

export default {
  getFileById,
  saveFile
}
