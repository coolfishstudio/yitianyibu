import User from './model'

const getUserByEmail = async (email) => {
    const getResult = await User.findOne({ email })
    return getResult
}

const addUser = async (options = {}) => {
    const addResult = await User.create({
        username: options.username || '',
        password: options.password || '',
        email   : options.email || ''
    })
    return addResult
}

export default {
    addUser,
    getUserByEmail
}
