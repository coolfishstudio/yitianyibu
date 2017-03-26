import settingManager from '../lib/setting/manager'
import contentManager from '../lib/content/manager'
import appManager from '../lib/app/manager'
import commentManager from '../lib/comment/manager'

const getViewLocals = async () => {
    const resultSetting = await settingManager.getSetting()
    let slogan = resultSetting ? resultSetting.slogan : [ '' ]
    return {
        slogan: slogan[ Math.floor(Math.random() * slogan.length) ],
        count : {
            content: await contentManager.countContent(),
            app    : await appManager.countApp(),
            message: await commentManager.countCommentByContentId('message')
        }
    }
}

export default {
    getViewLocals
}
