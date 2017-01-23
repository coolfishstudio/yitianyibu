export default () => [ (req, res, next) => {
    // 404
    const err = new Error('Not Found')
    err.status = 404
    next(err)
}, (err, req, res, next) => {
    if (!err) return next()
    console.error(err)
    const message = err.message || '发生了一个很奇怪的错误...'
    res.status(err.status || 500).format({
        html: () => {
            res.renderPage('index')
        },
        json: () => {
            res.json({
                code: err.status || 500,
                message
            })
        }
    })
} ]


// export default () => [ (req, res, next) => {
//     const err = new Error('Not Found')
//     err.status = 404
//     next(err)
// }, (err, { app, log }, res, next) => {
//     if (!err) return next()
//     log.error(err)
//     const message = err.message || '发生了一个很奇怪的错误...'
//     // 针对客户端报错进行处理
//     if (res.locals.isClient && err.rs === 0) {
//         err.status = 200
//     }
//     res.status(err.status || 500).format({
//         html: () => {
//             res.render('pages/error', {
//                 pageName: 'error',
//                 error   : app.get('env') === 'development' ? err.stack : {},
//                 message
//             })
//         },
//         json: () => {
//             res.json({
//                 code: 400,
//                 message,
//             })
//         }
//     })
// }, (err, req, res, next) => {
//     if (!err) return next()
//     res.status(500).send('<h2>发生了一个很奇怪的错误...</h2>')
// } ]
