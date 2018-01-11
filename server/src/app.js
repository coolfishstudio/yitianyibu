import express from 'express'
import bodyParser from 'body-parser'
import appRouter from './router'
import { PORT } from './config'
import auth from './middleware/auth'

const app = express()

app.use(bodyParser.json())
app.use(auth().initialize())
app.use(bodyParser.urlencoded({ extended: false }))
app.all('/*', (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', req.headers && req.headers.origin ? req.headers.origin : '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Connection, User-Agent, Cookie, Authorization')
  res.setHeader('Access-Control-Allow-Credentials', true)
  if (req.method === 'OPTIONS') {
    res.send(200)
  } else {
    next()
  }
})
appRouter(app)

app.listen(PORT, () => {
  console.log(`服务器已启动 端口号 [${PORT}]`)
})
