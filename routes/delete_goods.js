const express = require('express')
const Goods = require('../models/goods')
const History = require('../models/history')

const Del_goods = express.Router()

Del_goods.get('/delete_goods', function (req, res) {
    Goods.find(function (err, docs, next) {
        res.render('delete_goods.html', {
            user: req.session.user,
            nickname: req.session.user.nickname,
            lists: docs,
        });
    })
})

Del_goods.post('/delete_goods', function (req, res) {
    Goods.findOne({ _id: req.body.id }, function (err, docs) {
        if (err) {
            return res.status(500).json({
                err_code: 500,
                message: "查找出错" + err
            })
        }
        Goods.deleteOne({ _id: req.body.id }, function (err, result) {
            if (err) {
                return res.status(500).json({
                    err_code: 500,
                    message: err.message
                })
            }
            new History({
                type: "Delete Goods",
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
                res.redirect('/delete_goods')
            })

        })
    })
})

module.exports = Del_goods