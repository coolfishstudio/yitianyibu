import crypto from 'crypto'

const getClientIp = (req) => {
  return req.headers[ 'x-forwarded-for' ] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress
}

const getMD5 = (str) => {
  let result = ''
  const md5 = crypto.createHash('md5')
  result = md5.update(str).digest('hex')
  return result
}

export {
  getClientIp,
  getMD5
}
