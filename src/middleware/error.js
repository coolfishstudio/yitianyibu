import log from './log'

export default () => [ (req, res) => {
    // 404
    const err = new Error('Not Found')
    err.status = 404
    log('error-404').error(err)
    res.status(err.status || 400).format({
        html: () => {
            res.renderPage('error', {
                errcode: 404,
                message: 'Not Found'
            })
        },
        json: () => {
            res.json({
                errcode: err.status || 404,
                message: 'Not Found'
            })
        }
    })
}, (err, req, res, next) => {
    if (!err) return next()
    log('error-500').error(err)
    const message = err.message || '发生了一个很奇怪的错误...'
    res.status(err.status || 500).format({
        html: () => {
            res.renderPage('error', {
                errcode: 500,
                message
            })
        },
        json: () => {
            res.json({
                errcode: err.status || 500,
                message
            })
        }
    })
} ]
