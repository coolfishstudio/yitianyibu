import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import router from './router'
import utilsMiddleware from './middleware/utils'

const app = express()
const port = 9017

// 设置模版文件路径
app.set('views', `${__dirname}/../views`)
// 设置模版引擎
app.set('view engine', 'pug')
// 中间件
app.use(utilsMiddleware())
app.use(bodyParser.json())
app.use(cookieParser())
app.use(express.static(`${__dirname}/../public`))

// 挂载路由
app.use(router)
// 捕获错误
app.use((err, req, res) => {
    res.status(500).send('Error')
})
// 启动服务
const server = app.listen(port, () => {
    const serverHost = server.address().address
    const serverPort = server.address().port
    console.log('Express app listening at http://%s:%s', serverHost, serverPort)
})
