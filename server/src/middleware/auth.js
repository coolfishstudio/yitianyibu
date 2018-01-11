import passport from 'passport'
import { Strategy, ExtractJwt } from 'passport-jwt'

import userManager from '../lib/user/manager'
import { JWT_SECRET } from '../config'

const auth = (app) => {
  const params = {
    secretOrKey: JWT_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer')
  }
  console.log('params', params)
  const strategy = new Strategy(params, (payload, next) => {
    console.log('payload', payload)
    userManager.getUserById(payload.id)
      .then(user => {
        console.log('strategy', user)
        if (user) {
          console.log(user)
          return next(null, {
            id: user._id,
            email: user.email
          })
        }
        return next(null, null)
      })
      .catch(error => next(error, null))
  })
  passport.use(strategy)
  return {
    initialize: () => {
      return passport.initialize()
    },
    authenticate: () => {
      console.log('authenticate')
      return passport.authenticate('jwt', { session: false })
    }
  }
}

export default auth
