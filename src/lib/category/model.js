import mongoose from '../../util/db'

const Schema = mongoose.Schema

const CategorySchema = new Schema({
    name       : { type: String, required: true },
    desc       : { type: String, default: '' },
    weight     : { type: Number, default: 0 },
    removed    : { type: Boolean, default: false },
    createdByID: { type: Schema.Types.ObjectId, required: true },
    createdAt  : { type: Date, default: Date.now },
    updatedAt  : { type: Date, default: null }
}, {
    collection: 'category'
})

export default mongoose.model('Category', CategorySchema)
