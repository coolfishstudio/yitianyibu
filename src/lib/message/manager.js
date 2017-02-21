import Message from './model'

const addMessage = async (options = {}) => {
    const addResult = await Message.create(Object.assign({}, options))
    return addResult
}

const findMessage = async () => {
    const findResult = await Message.find({ removed: false }).sort({ createdAt: -1 })
    return findResult
}

const countMessage = async () => {
    const countResult = await Message.count({ removed: false })
    return countResult
}

export default {
    addMessage,
    findMessage,
    countMessage
}
