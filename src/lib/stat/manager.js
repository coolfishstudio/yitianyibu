/* eslint-disable */
import 'babel-polyfill'
/* eslint-enable */
import Stat from './model'

const addStat = async (options) => {
    const result = await Stat.create(Object.assign({}, options))
    return result
}
const findStatsByOptions = async (options) => {
    const result = await Stat.find(options).sort({ createdAt: -1 })
    return result
}
const countStatByOptions = async (options) => {
    const result = await Stat.count({ options })
    return result
}

export default {
    addStat,
    findStatsByOptions,
    countStatByOptions
}
