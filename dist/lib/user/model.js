'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _db = require('../../util/db');

var _db2 = _interopRequireDefault(_db);

var _const = require('../../util/const');

var _const2 = _interopRequireDefault(_const);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 用户数据模型
 */
var Schema = _db2.default.Schema;

var UserSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    username: { type: String, default: '' }, // 用户名
    source: { type: String, default: 'user', enum: _const2.default.CONTENT_SOURCE_TYPES }, // 用户来源 用来区分是机器人还是真实用户
    emailVerified: { type: Boolean, default: false }, // 用户是否激活
    password: { type: String, default: '' }, // 密码
    salt: { type: String, default: '' }, // 自我描述
    createdAt: { type: Date, default: Date.now }, // 创建时间
    updatedAt: { type: Date, default: null }, // 修改时间
    firstLoginAt: { type: Date, default: null }, // 第一次登录
    lastLoginAt: { type: Date, default: null }, // 最后一次登录
    verifiedAt: { type: Date, default: null }, // 验证时间
    role: { type: String, default: 'user', enum: _const2.default.USER_ROLES }, // 角色
    totalLogin: { type: Number, default: 0 } // 登录总数
}, {
    collection: 'user'
});

exports.default = _db2.default.model('User', UserSchema);