'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _db = require('../../util/db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _db2.default.Schema;

var SettingSchema = new Schema({
    slogan: { type: Array, default: [] },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: null }
}, {
    collection: 'setting'
});

exports.default = _db2.default.model('Setting', SettingSchema);