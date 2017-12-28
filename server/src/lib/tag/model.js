import mongoose from '../../middleware/db'

const Schema = mongoose.Schema

const TagSchema = new Schema({
  // 名称
  name: { type: String, required: true },
  // 权重
  weight: { type: Number, default: 0 },
  // 总数
  count: { type: Number, default: 0 },
  removed: { type: Boolean, default: false },
  createdByID: { type: Schema.Types.ObjectId, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: null }
}, {
    collection: 'tag'
})

export default mongoose.model('Tag', TagSchema)
