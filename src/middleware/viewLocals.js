import settingManager from '../lib/setting/manager'
import contentManager from '../lib/content/manager'
import appManager from '../lib/app/manager'
import categoryManager from '../lib/category/manager'

const getViewLocals = async () => {
    const resultSetting = await settingManager.getSetting()
    let slogan = resultSetting ? resultSetting.slogan : [ '' ]
    return {
        slogan: slogan[ Math.floor(Math.random() * slogan.length) ],
        count : {
            content : await contentManager.countContent(),
            app     : await appManager.countApp(),
            category: await categoryManager.countCategory()
        }
    }
}

export default {
    getViewLocals
}
