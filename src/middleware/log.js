import log4js from 'log4js'

const {
    LOG_LEVEL,
    NODE_ENV
} = process.env

const level = LOG_LEVEL || (NODE_ENV !== 'production' ? 'DEBUG' : 'INFO')

log4js.configure({
    appenders: [
        {
            type: 'console'
        }
    ],
    levels: {
        console: level
    }
})

export default (type) => {
    return log4js.getLogger(type)
}
