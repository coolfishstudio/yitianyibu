import log from './log'

export default () => [ (req, res, next) => {
    // 404
    const err = new Error('Not Found')
    err.status = 404
    log('error-404').error(err)
    next(err)
}, (err, req, res, next) => {
    if (!err) return next()
    log('error-500').error(err)
    const message = err.message || '发生了一个很奇怪的错误...'
    res.status(err.status || 500).format({
        html: () => {
            res.renderPage('error', {
                message
            })
        },
        json: () => {
            res.json({
                code: err.status || 500,
                message
            })
        }
    })
} ]
