import mongoose from '../../util/db'
import CONST from '../../util/const'

const Schema = mongoose.Schema

const UserSchema = new Schema({
    /* eslint-disable */
    email: {
        type    : String,
        required: true,
        match   : [
            /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i,
            'Invalid email'
        ]
    },
    /* eslint-enable */
    username     : { type: String, default: '' }, // 用户名
    emailVerified: { type: Boolean, default: false }, // 用户是否激活
    password     : { type: String, default: '' }, // 密码
    desc         : { type: String, default: '' }, // 自我描述
    createdAt    : { type: Date, default: Date.now }, // 创建时间
    updatedAt    : { type: Date, default: null }, // 修改时间
    firstLoginAt : { type: Date, default: null }, // 第一次登录
    lastLoginAt  : { type: Date, default: null }, // 最后一次登录
    verifiedAt   : { type: Date, default: null }, // 验证时间
    role         : { type: String, default: 'user', enum: CONST.USER_ROLES }, // 角色
    totalLogin   : { type: Number, default: 0 } // 登录总数
}, {
    collection: 'user'
})

export default mongoose.model('User', UserSchema)
