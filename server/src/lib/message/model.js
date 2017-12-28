import { mongoose } from '../../middleware/db'

const Schema = mongoose.Schema

const MessageSchema = new Schema({
  ip: { type: String, required: true },
  name: { type: String, default: '' },
  email: { type: String, default: '' },
  content: { type: String, required: true },
  removed: { type: Boolean, default: false }
}, {
    collection: 'message',
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
})

export default mongoose.model('Message', MessageSchema)
