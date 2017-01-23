import winston from 'winston'

const {
    LOG_LEVEL,
    NODE_ENV
} = process.env

const level = LOG_LEVEL || (NODE_ENV !== 'production' ? 'debug' : 'info')

export const log = new winston.Logger({
    transports: [
        new winston.transports.Console({
            colorize : true,
            timestamp: true,
            level
        })
    ]
})

export default (req, res, next) => {
    req.log = log
    next()
}
