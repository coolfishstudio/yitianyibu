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
// 获取今天的pv
const countStatInToday = async () => {
    let day = new Date()
    const time = new Date([ day.getFullYear(), day.getMonth() + 1, day.getDate() ].join('-')).getTime()
    const result = await Stat.count({ createdAt: { $gte: time, $lte: time + 86400000 } })
    return result
}


export default {
    addStat,
    findStatsByOptions,
    countStatByOptions,
    countStatInToday
}
