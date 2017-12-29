import { mongoose } from '../../middleware/db'

const Schema = mongoose.Schema

const UserSchema = new Schema({
  email: {
      type: String,
      required: true,
      match: [
        /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i,
        'Invalid email'
      ]
  },
  username: { type: String, default: '' }, // 用户名
  password: { type: String, default: '' } // 密码
}, {
  collection: 'user',
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
})

export default mongoose.model('User', UserSchema)
