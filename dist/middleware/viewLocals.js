'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _controller = require('../lib/setting/controller');

var _controller2 = _interopRequireDefault(_controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var getViewLocals = function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var result, slogan;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return _controller2.default.getSetting();

                    case 2:
                        result = _context.sent;
                        slogan = result ? result.slogan : [''];
                        return _context.abrupt('return', {
                            slogan: slogan[Math.floor(Math.random() * slogan.length)]
                        });

                    case 5:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function getViewLocals() {
        return _ref.apply(this, arguments);
    };
}();

exports.default = {
    getViewLocals: getViewLocals
};