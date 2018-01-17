import crypto from 'crypto'
import MarkdownIt from 'markdown-it'
import jsxss from 'xss'

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

const md = new MarkdownIt()

md.set({
  HTML: false, // Enable HTML tags in source
  xhtmlOut: false, // Use '/' to close single tags (<br />)
  breaks: false, // Convert '\n' in paragraphs into <br>
  linkify: true, // Autoconvert URL-like text to links
  typographer: true, // Enable smartypants and other sweet transforms
})

const xss = new jsxss.FilterXSS({
  onIgnoreTagAttr(tag, name, value) {
    if (tag === 'pre' && name === 'class') {
      return `${name}="${jsxss.escapeAttrValue(value)}"`
    }
  }
})

export {
  getClientIp,
  getMD5,
  md,
  xss
}
