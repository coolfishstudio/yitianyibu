import mongoose from '../../util/db'

const Schema = mongoose.Schema

const AppSchema = new Schema({
    name       : { type: String, required: true },
    title      : { type: String, required: true },
    icon       : { type: String, default: '' },
    cover      : { type: String, default: '' },
    url        : { type: String, default: '' },
    desc       : { type: String, default: '' },
    type       : { type: Number, default: 0 },
    isTop      : { type: Boolean, default: false },
    hits       : { type: Number, default: 0 },
    removed    : { type: Boolean, default: false },
    createdByID: { type: Schema.Types.ObjectId, required: true },
    createdAt  : { type: Date, default: Date.now },
    updatedAt  : { type: Date, default: Date.now }
}, {
    collection: 'app'
})

export default mongoose.model('App', AppSchema)
