import mongoose from '../../util/db'

const Schema = mongoose.Schema

const StatSchema = new Schema({
    ip       : { type: String, required: true },
    url      : { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
}, {
    collection: 'stat'
})

export default mongoose.model('Stat', StatSchema)
