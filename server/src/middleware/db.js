import mongoose from 'mongoose'
import Grid from 'gridfs-stream'
import { MONGO_URL, MONGO_DB } from '../config'
import userManager from '../lib/user/manager'

mongoose.connect(`${MONGO_URL}${MONGO_DB}`)

const conn = mongoose.connection
Grid.mongo = mongoose.mongo

conn.on('error', (error) => {
  console.error('连接错误:', error)
})
conn.once('open', () => {
  console.log(`数据库已连接 数据库 [${MONGO_DB}]`)
  userManager.initUser()
})

let gfs = Grid(conn.db)

export {
  mongoose,
  gfs
}
