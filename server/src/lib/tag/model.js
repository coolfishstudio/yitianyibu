import { mongoose } from '../../middleware/db'

const Schema = mongoose.Schema

const TagSchema = new Schema({
  name: { type: String, required: true },
  weight: { type: Number, default: 0 },
  removed: { type: Boolean, default: false },
  createdByID: { type: Schema.Types.ObjectId, required: true },
}, {
  collection: 'tag',
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
})

export default mongoose.model('Tag', TagSchema)
