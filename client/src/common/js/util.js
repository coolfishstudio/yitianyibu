/**
  工具方法
*/
// 内核判断
const deviceCore = {
  _ua: navigator.userAgent.toLowerCase(),
  // 获取浏览器版本
  _getVersion: (nece) => {
    let arr = nece.split('.')
    return parseFloat(`${arr[ 0 ]}.${arr[ 1 ]}`)
  },
  // 设备检测
  _detect: (kernel) => {
    let reg = new RegExp(kernel, 'img')
    return reg.test(deviceCore._ua)
  }
}

export const device = {
  isIOS: () => { return deviceCore._detect('iPhone|iPad|iPod|iOS|mac os') },
  isAndroid: () => { return deviceCore._detect('Android') },
  isUCBrowser: () => { return deviceCore._detect('UCBrowser') },
  isQQBrowser: () => { return deviceCore._detect('QQBrowser') },
  isWeixin: () => { return deviceCore._detect('MicroMessenger') },
  isPC: () => { return !deviceCore._detect('phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone') },
  qqBrowserVersion: () => { return device.isQQBrowser() ? deviceCore._getVersion(deviceCore._ua.split('mqqbrowser/')[ 1 ]) : 0 },
  ucBrowserVersion: () => { return device.isUCBrowser() ? deviceCore._getVersion(deviceCore._ua.split('ucbrowser/')[ 1 ]) : 0 },
  iOSVersion: () => { return device.isIOS() ? parseInt(deviceCore._ua.match(/\s*os\s*\d+/gi)[ 0 ].split(' ')[ 2 ], 10) : 0 }
}

export const dateFormat = (date, format = 'yyyy-MM-dd hh:mm:ss', readability = false) => {
  if (!date) {
    date = new Date()
  }
  if (typeof date === 'string' && /^\d+$/.test(date)) {
    date = new Date(+date)
  }
  if (typeof date === 'number') {
    date = new Date(date)
  }
  if (typeof date !== 'number' && !(date instanceof Date)) {
    date = date.replace(/年|月/g, '-').replace(/日/g, '')
    date = new Date(date)
  }

  const duration = Date.now() - date
  const level1 = 60 * 1000                // 1 分钟
  const level2 = 60 * 60 * 1000           // 1 小时
  const level3 = 24 * 60 * 60 * 1000      // 1 天
  const level4 = 3 * 24 * 60 * 60 * 1000  // 3 天
  if (readability && duration < level4) {
    let str = ''
    if (duration < level1) str = '刚刚'
    if (duration > level1 && duration < level2) str = `${Math.round(duration / level1)}分钟前`
    if (duration > level2 && duration < level3) str = `${Math.round(duration / level2)}小时前`
    if (duration > level3 && duration < level4) str = `${Math.round(duration / level3)}天前`
    return str
  }
  const o = {
    'M+': date.getMonth() + 1,  // 月份
    'd+': date.getDate(),       // 日
    'h+': date.getHours(),      // 小时
    'm+': date.getMinutes(),    // 分
    's+': date.getSeconds(),    // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, String(date.getFullYear()).substr(4 - RegExp.$1.length))
  }
  Object.keys(o).forEach(k => {
    if (new RegExp(`(${k})`).test(format)) {
      format = format.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[ k ]) : ((`00${o[ k ]}`).substr((String(o[ k ])).length)))
    }
  })
  return format
}

// **** 压缩图片 ****
// 压缩
function compress (sourceImgObj, quality) {
  let cvs = document.createElement('canvas')
  let multiple = (sourceImgObj.naturalWidth > 1000) ? 2 : 1
  // naturalWidth真实图片的宽度
  cvs.width = sourceImgObj.naturalWidth / multiple
  cvs.height = sourceImgObj.naturalHeight / multiple
  cvs.getContext('2d').drawImage(sourceImgObj, 0, 0, cvs.width, cvs.height)
  let newImageData = cvs.toDataURL('image/jpeg', quality / 100)
  let resultImageObj = new Image()
  resultImageObj.src = newImageData
  return resultImageObj
}
// 转blob
function convertBase64UrlToBlob (urlData) {
  // 去掉url的头，并转换为byte
  let bytes = window.atob(urlData.split(',')[ 1 ])
  // 处理异常,将ascii码小于0的转换为大于0
  let ab = new ArrayBuffer(bytes.length)
  let ia = new Uint8Array(ab)
  for (let i = 0; i < bytes.length; i++) {
    ia[ i ] = bytes.charCodeAt(i)
  }
  return new Blob([ ab ], { type: 'image/png' })
}
export function compressImage (imageFile, callback) {
  const size = imageFile.size
  if (size < 2 * 1024 * 1024) {
    callback(imageFile)
  } else {
    const url = URL.createObjectURL(imageFile)
    let img = new Image()
    let timestamp = Date.now()
    img.src = url
    img.addEventListener('load', () => {
      let blobFile = convertBase64UrlToBlob(compress(img, 70).src)
      blobFile.src = compress(img, 70).src
      blobFile.name = imageFile.name
      blobFile.isCompress = true
      blobFile.timestamp = timestamp
      callback(blobFile)
    })
  }
}
