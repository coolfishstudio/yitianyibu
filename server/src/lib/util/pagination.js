/**
 * 格式化页码
 */
const getFromReq = (query = {}, defaultLimit) => {
  let offset = parseInt(query.offset, 10)
  if (isNaN(offset) || offset < 0) {
    offset = 0
  }
  let limit = parseInt(query.limit, 10)
  if (isNaN(limit) || limit === 0 || limit < -1 || limit > defaultLimit) {
    limit = defaultLimit
  }
  return {
    offset,
    limit
  }
}

const getMeta = (totalLength, currentLength, pagination) => {
  return {
    offset: pagination.offset,
    limit: pagination.limit,
    total: totalLength,
    length: currentLength,
    remaining: currentLength === 0 ? 0 : totalLength - pagination.offset - currentLength
  }
}

export {
  getFromReq,
  getMeta
}
