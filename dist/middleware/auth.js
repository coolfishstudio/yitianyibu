'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var notAuth2Login = function notAuth2Login(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.redirect('/admin/login');
    }
    next();
};
var auth2Home = function auth2Home(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/admin');
    }
    next();
};

exports.default = {
    auth2Home: auth2Home,
    notAuth2Login: notAuth2Login
};