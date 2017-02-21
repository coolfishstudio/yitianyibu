import mongoose from 'mongoose'
import log from '../middleware/log'

const { MONGO_URL } = process.env

// 连接数据库
mongoose.connect(
    MONGO_URL, // 数据库地址
    {
        db: {
            native_parser: true
        },
        server: {
            socketOptions: {
                keepAlive: 1
            }
        }
    }
)

const db = mongoose.connection
let isReady = false
let readyWaitingList = []

// 始终监听报错信息
db.on('error', (error) => {
    log('db').error(`数据库连接异常：${error}`)
})
// 监听一次连接成功信息
db.once('open', () => {
    log('db').info('数据库已建立连接。')
    isReady = true
    for (let i = 0, l = readyWaitingList.length; i < l; i += 1) {
        readyWaitingList[ i ]()
    }
    readyWaitingList = null
})

// 用于检测数据库是否正常连接
export const onReady = (callback) => {
    if (isReady) return callback()
    readyWaitingList.push(callback)
}

export default mongoose
