import mongoose from '../../util/db'

const Schema = mongoose.Schema

const TagSchema = new Schema({
    name       : { type: String, required: true },
    weight     : { type: Number, default: 0 },
    removed    : { type: Boolean, default: false },
    createdByID: { type: Schema.Types.ObjectId, required: true },
    createdAt  : { type: Date, default: Date.now },
    updatedAt  : { type: Date, default: null }
}, {
    collection: 'tag'
})

export default mongoose.model('Tag', TagSchema)
