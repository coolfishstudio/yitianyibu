'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _passportJwt = require('passport-jwt');

var _manager = require('../lib/user/manager');

var _manager2 = _interopRequireDefault(_manager);

var _config = require('../config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var auth = function auth(app) {
  var params = {
    secretOrKey: _config.JWT_SECRET,
    jwtFromRequest: _passportJwt.ExtractJwt.fromAuthHeaderWithScheme('Bearer')
  };
  var strategy = new _passportJwt.Strategy(params, function (payload, next) {
    _manager2.default.getUserById(payload.id).then(function (user) {
      if (user) {
        return next(null, {
          id: user._id,
          email: user.email
        });
      }
      return next(null, null);
    }).catch(function (error) {
      return next(error, null);
    });
  });
  _passport2.default.use(strategy);
  return {
    initialize: function initialize() {
      return _passport2.default.initialize();
    },
    authenticate: function authenticate() {
      return _passport2.default.authenticate('jwt', { session: false });
    }
  };
};

exports.default = auth;
//# sourceMappingURL=auth.js.map