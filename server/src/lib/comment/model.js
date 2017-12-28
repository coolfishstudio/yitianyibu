import mongoose from '../../middleware/db'

const Schema = mongoose.Schema

const CommentSchema = new Schema({
  ip: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, default: '' },
  content: { type: String, required: true },
  commentById: { type: Schema.Types.ObjectId, required: true },
  removed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: null }
}, {
    collection: 'comment'
})

export default mongoose.model('Comment', CommentSchema)
