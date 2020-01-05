const express = require('express')
const User = require('../models/user')
const History = require('../models/history')

const User_manage = express.Router()

User_manage.get('/user_manage', function (req, res) {
    User.find(function (err, docs, next) {
        res.render('user_manage.html', {
            user: req.session.user,
            nickname: req.session.user.nickname,
            lists: docs,
        });
    })
})

User_manage.post('/user_manage', function (req, res) {
    User.findOne({ _id: req.body.id }, function (err, docs) {
        if (err) {
            return res.status(500).json({
                err_code: 500,
                message: "查找出错" + err
            })
        }
        User.deleteOne({ _id: req.body.id }, function (err, result) {
            if (err) {
                return res.status(500).json({
                    err_code: 500,
                    message: err.message
                })
            }
            new History({
                type: "Delete User",
                object_id: req.body.id,
                before: docs,
                after: null,
                operator: req.session.user.nickname
            }).save(function (err, docs) {
                if (err) {
                    return res.status(500).json({
                        err_code: 500,
                        message: "历史记录存储错误！" + err
                    })
                }
                res.redirect('/user_manage')
            })

        })
    })
})

module.exports = User_manage