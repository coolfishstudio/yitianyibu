'use strict';

module.exports = function () {
    return function (req, res, next) {
        console.log('utilsMiddleware: init');
        // admin
        res.renderAdminPage = function (name, data) {
            if (!data) data = {};
            data.pageName = name;
            res.render('admin/pages/' + name, data);
        };
        // homepage
        res.renderPage = function (name, data) {
            if (!data) data = {};
            data.pageName = name;
            res.render('homepage/pages/' + name, data);
        };
        next();
    };
};
