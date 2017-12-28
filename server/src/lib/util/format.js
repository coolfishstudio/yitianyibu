const formatResult = (result, code = 0) => {
  return {
    status: {
      code,
      message: 'success'
    },
    result
  }
}

const handlerCustomError = (code, message) => {
  const error = new Error(message)
  error.status = 400
  error.code = code
  return error
}

export {
  formatResult,
  handlerCustomError
}
