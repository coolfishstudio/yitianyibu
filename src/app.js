import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import router from './router'
import utilsMiddleware from './middleware/utils'
import errorMiddleware from './middleware/error'
import log from './middleware/log'
import { onReady } from './util/db'

const { PORT, NODE_ENV } = process.env
const app = express()
const port = PORT || 8080

app.set('views', `${__dirname}/../views`)
app.set('view engine', 'pug')
app.use(express.static(`${__dirname}/../public`))
app.get('/favicon.ico', (req, res) => { res.status(204).end() })

app.use(utilsMiddleware())
app.use(bodyParser.json())
app.use(cookieParser())
app.use(router)
app.use(errorMiddleware())

// 启动服务
onReady(() => {
    const server = app.listen(port, () => {
        const serverPort = server.address().port
        log('app').info(`服务运行环境: ${NODE_ENV}`)
        log('app').info(`端口号为: ${serverPort}`)
        log('app').info('服务已启动')
    })
})
