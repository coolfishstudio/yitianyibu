import settingManager from '../lib/setting/manager'
import contentManager from '../lib/content/manager'
import appManager from '../lib/app/manager'
import commentManager from '../lib/comment/manager'
import statManager from '../lib/stat/manager'

const getViewLocals = async (req) => {
    const resultSetting = await settingManager.getSetting()
    let slogan = resultSetting ? resultSetting.slogan : [ '' ]
    const url = (req.originalUrl || '/').replace(/\?.+$/, '')
    return {
        slogan: slogan[ Math.floor(Math.random() * slogan.length) ],
        count : {
            content: await contentManager.countContent(),
            app    : await appManager.countApp(),
            message: await commentManager.countCommentByContentId('message')
        },
        stat: {
            uv: statManager.countStatInToday()
        },
        url
    }
}

export default {
    getViewLocals
}
