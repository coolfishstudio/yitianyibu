'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _db = require('../../util/db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _db2.default.Schema;

var MessageSchema = new Schema({
    /* eslint-disable */
    email: {
        type: String,
        required: false,
        match: [/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i, 'Invalid email']
    },
    /* eslint-enable */
    username: { type: String, default: '' },
    content: { type: String, default: '' },
    ip: { type: String, required: true },
    removed: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, {
    collection: 'message'
});

exports.default = _db2.default.model('Message', MessageSchema);