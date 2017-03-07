/* eslint-disable */
import 'babel-polyfill'
/* eslint-enable */
import Setting from './model'

const addSetting = async () => {
    const result = await Setting.create({})
    return result
}
const getSetting = async () => {
    const result = await Setting.findOne({})
    return result
}
const updateSetting = async (options = {}) => {
    let analyse = await Setting.findOne({})
    if (!analyse) {
        return null
    }
    analyse.slogan = options.slogan
    analyse.updatedAt = Date.now()
    const result = await analyse.save()
    return result
}

export default {
    addSetting,
    getSetting,
    updateSetting
}
