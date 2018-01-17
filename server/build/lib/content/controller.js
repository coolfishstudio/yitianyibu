'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _manager = require('./manager');

var _manager2 = _interopRequireDefault(_manager);

var _manager3 = require('../category/manager');

var _manager4 = _interopRequireDefault(_manager3);

var _manager5 = require('../tag/manager');

var _manager6 = _interopRequireDefault(_manager5);

var _pagination = require('../util/pagination');

var _format = require('../util/format');

var _const = require('../util/const');

var _tool = require('../util/tool');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var findAll = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res, next) {
    var options, result;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            options = {};

            if (!req.headers['authorization']) {
              options.status = 'published';
            }
            _context.next = 5;
            return _manager2.default.findAll((0, _pagination.getFromReq)(req.query, _const.CONTENT_LIMIT_DEFAULT), options);

          case 5:
            result = _context.sent;

            result.list = result.list.map(function (item) {
              return {
                _id: item._id,
                createdAt: item.createdAt,
                hits: item.hits,
                title: item.title,
                status: item.status
              };
            });
            res.json((0, _format.formatResult)(result));
            _context.next = 13;
            break;

          case 10:
            _context.prev = 10;
            _context.t0 = _context['catch'](0);

            next((0, _format.handlerCustomError)(104001, '查询失败'));

          case 13:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 10]]);
  }));

  return function findAll(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var findAllByCategory = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res, next) {
    var categoryInfo, options, result;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            categoryInfo = null;

            if (!/^[0-9a-f]{24}$/.test(req.params.id)) {
              _context2.next = 8;
              break;
            }

            _context2.next = 5;
            return _manager4.default.getById(req.params.id);

          case 5:
            categoryInfo = _context2.sent;
            _context2.next = 11;
            break;

          case 8:
            _context2.next = 10;
            return _manager4.default.getByPathname(req.params.id);

          case 10:
            categoryInfo = _context2.sent;

          case 11:
            if (!categoryInfo) {
              next((0, _format.handlerCustomError)(104002, '获取类别信息失败'));
            }
            options = {
              category: categoryInfo._id
            };

            if (!req.headers['authorization']) {
              options.status = 'published';
            }
            _context2.next = 16;
            return _manager2.default.findAll((0, _pagination.getFromReq)(req.query, _const.CONTENT_LIMIT_DEFAULT), options);

          case 16:
            result = _context2.sent;

            result.list = result.list.map(function (item) {
              return {
                _id: item._id,
                createdAt: item.createdAt,
                hits: item.hits,
                title: item.title,
                status: item.status
              };
            });
            result.info = categoryInfo;
            res.json((0, _format.formatResult)(result));
            _context2.next = 25;
            break;

          case 22:
            _context2.prev = 22;
            _context2.t0 = _context2['catch'](0);

            next((0, _format.handlerCustomError)(104003, '查询失败'));

          case 25:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[0, 22]]);
  }));

  return function findAllByCategory(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

var getById = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, res, next) {
    var result, _content, _tag, i, info, _category;

    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            result = {
              content: null,
              category: null,
              near: null
            };
            _context3.next = 4;
            return _manager2.default.hitById(req.params.id);

          case 4:
            _context3.next = 6;
            return _manager2.default.getById(req.params.id);

          case 6:
            _content = _context3.sent;

            if (!_content) {
              next((0, _format.handlerCustomError)(104004, '获取文章信息失败'));
            }
            result.content = {
              title: _content.title,
              html: _content.html,
              createdAt: _content.createdAt,
              hits: _content.hits
            };

            if (!(_content.tag && _content.tag.length > 0)) {
              _context3.next = 21;
              break;
            }

            _tag = [];
            i = 0;

          case 12:
            if (!(i < _content.tag.length)) {
              _context3.next = 20;
              break;
            }

            _context3.next = 15;
            return _manager6.default.getById(_content.tag[i]);

          case 15:
            info = _context3.sent;

            _tag.push(info.name.toString());

          case 17:
            i++;
            _context3.next = 12;
            break;

          case 20:
            result.content.tag = _tag;

          case 21:
            if (!_content.category) {
              _context3.next = 26;
              break;
            }

            _context3.next = 24;
            return _manager4.default.getById(_content.category);

          case 24:
            _category = _context3.sent;

            result.category = {
              _id: _category._id,
              name: _category.name,
              desc: _category.desc,
              pathname: _category.pathname
            };

          case 26:
            _context3.next = 28;
            return _manager2.default.getNearByCreatedAt(result.content.createdAt);

          case 28:
            result.near = _context3.sent;

            if (result.near.prev) {
              result.near.prev = {
                _id: result.near.prev._id,
                title: result.near.prev.title
              };
            }
            if (result.near.next) {
              result.near.next = {
                _id: result.near.next._id,
                title: result.near.next.title
              };
            }
            res.json((0, _format.formatResult)(result));
            _context3.next = 37;
            break;

          case 34:
            _context3.prev = 34;
            _context3.t0 = _context3['catch'](0);

            next((0, _format.handlerCustomError)(104005, '查询失败'));

          case 37:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[0, 34]]);
  }));

  return function getById(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();

var insert = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(req, res, next) {
    var title, tags, markdown, category, createdByID, categoryInfo, html, reg, images, tag, i, info, result;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            title = (req.body.title || '').trim();
            tags = (req.body.tag || '').trim().split(',');
            markdown = (req.body.markdown || '').trim();
            category = (req.body.category || '').trim();
            createdByID = req.user.id;

            if (!title) {
              next((0, _format.handlerCustomError)(104006, '标题不能为空'));
            }
            if (!markdown) {
              next((0, _format.handlerCustomError)(104007, '内容不能为空'));
            }
            if (!category) {
              next((0, _format.handlerCustomError)(104008, '类别不能为空'));
            }
            if (!tags) {
              next((0, _format.handlerCustomError)(104009, '标签不能为空'));
            }
            if (!createdByID) {
              next((0, _format.handlerCustomError)(104010, '非法用户操作'));
            }
            _context4.prev = 10;
            categoryInfo = null;

            if (!category) {
              _context4.next = 18;
              break;
            }

            _context4.next = 15;
            return _manager4.default.getById(category);

          case 15:
            categoryInfo = _context4.sent;

            if (categoryInfo) {
              _context4.next = 18;
              break;
            }

            return _context4.abrupt('return', next((0, _format.handlerCustomError)(104011, '类别不存在')));

          case 18:
            html = '<div class="markdown-text">' + _tool.xss.process(_tool.md.render(markdown || '')) + '</div>';
            reg = new RegExp('!\\[.*?\\]\\((.*?)\\)', 'g');
            images = markdown.match(reg) || [];

            images = images.map(function (item) {
              return item.replace(/!\[.*\]\(/, '').replace(/\)/, '');
            });
            tag = [];
            i = 0;

          case 24:
            if (!(i < tags.length)) {
              _context4.next = 32;
              break;
            }

            _context4.next = 27;
            return _manager6.default.findOneAndCreate(tags[i], { createdByID: createdByID });

          case 27:
            info = _context4.sent;

            tag.push(info._id.toString());

          case 29:
            i++;
            _context4.next = 24;
            break;

          case 32:
            _context4.next = 34;
            return _manager2.default.insert({
              title: title,
              tag: tag,
              markdown: markdown,
              html: html,
              category: categoryInfo._id,
              images: images,
              createdByID: createdByID
            });

          case 34:
            result = _context4.sent;

            res.json((0, _format.formatResult)());
            _context4.next = 41;
            break;

          case 38:
            _context4.prev = 38;
            _context4.t0 = _context4['catch'](10);

            next((0, _format.handlerCustomError)(102002, '创建失败'));

          case 41:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined, [[10, 38]]);
  }));

  return function insert(_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();

var update = function update(req, res, next) {
  console.log(1);
};

exports.default = {
  findAll: findAll,
  findAllByCategory: findAllByCategory,
  getById: getById,
  insert: insert,
  update: update
};
//# sourceMappingURL=controller.js.map