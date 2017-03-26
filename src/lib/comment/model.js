import mongoose from '../../util/db'

const Schema = mongoose.Schema

const CommentSchema = new Schema({
    ip       : { type: String, required: true },
    name     : { type: String, required: true },
    email    : { type: String, required: true },
    content  : { type: Array, required: true },
    contentId: { type: String, default: null },
    removed  : { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, {
    collection: 'comment'
})

export default mongoose.model('Comment', CommentSchema)
