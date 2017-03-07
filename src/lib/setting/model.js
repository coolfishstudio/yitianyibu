import mongoose from '../../util/db'

const Schema = mongoose.Schema

const SettingSchema = new Schema({
    slogan   : { type: Array, default: [] },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: null }
}, {
    collection: 'setting'
})

export default mongoose.model('Setting', SettingSchema)
