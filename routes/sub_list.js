const express = require('express')
const Sub = require('../models/sub')

const Sub_list = express.Router()

Sub_list.get('/sub_list', function (req, res) {
    Sub.find(function (err, docs, next) {
        res.render('sub_list.html', {
            user: req.session.user,
            nickname: req.session.user.nickname,
            lists: docs,
        });
    })
})

module.exports = Sub_list