import crypto from 'crypto'

const getMD5 = (str) => {
    let result = ''
    const md5 = crypto.createHash('md5')
    result = md5.update(str).digest('hex')
    return result
}

export default {
    getMD5
}
