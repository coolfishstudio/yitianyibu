import mongoose from '../../middleware/db'

const Schema = mongoose.Schema

const MessageSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  createdByID: { type: Schema.Types.ObjectId, required: true },
  removed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: null }
}, {
    collection: 'message'
})

export default mongoose.model('Message', MessageSchema)
