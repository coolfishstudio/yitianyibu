import settingController from '../lib/setting/controller'

const getViewLocals = async () => {
    const result = await settingController.getSetting()
    let slogan = result ? result.slogan : [ '' ]
    return {
        slogan: slogan[ Math.floor(Math.random() * slogan.length) ]
    }
}

export default {
    getViewLocals
}
