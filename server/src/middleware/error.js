const handler404 = (req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  error.code = 404
  next(error)
}

const handlerError = (error, req, res, next) => {
  const message = error.message || '发生了一个很奇怪的错误...'
  const status = error.status || 500
  res.status(status).json({
    status: {
      code: error.code || status,
      message: message,
    }
  })
}

export {
  handler404,
  handlerError
}
