import mongoose from '../../util/db'

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
    username : { type: String, default: '' }, // 用户名
    password : { type: String, default: '' }, // 密码
    createdAt: { type: Date, default: Date.now }, // 创建时间
    updatedAt: { type: Date, default: null }, // 修改时间
}, {
    collection: 'user'
})

export default mongoose.model('User', UserSchema)
