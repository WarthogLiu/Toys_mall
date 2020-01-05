const express = require('express')
const Order = require('../models/order')

const proc_order = express.Router()

proc_order.get('/proc_order', function (req, res) {
    Order.find(function (err, docs, next) {
        res.render('proc_order.html', {
            user: req.session.user,
            nickname: req.session.user.nickname,
            lists: docs,
        });
    })
})

proc_order.get('/check_order', function (req, res) {
    Order.findOne({ _id: req.query.id }, function (err, docs, next) {
        res.render('check_order.html', {
            user: req.session.user,
            nickname: req.session.user.nickname,
            lists: docs,
        });
    })
})


// 订单业务逻辑模块
// 处理
proc_order.post('/processing_order', function (req, res) {
    Order.findOne({ _id: req.body.id }, function (err, result) {
        if (err) {
            return res.status(500).json({
                err_code: 500,
                message: "查询出错" + err.message
            })
        }
        Order.updateOne({ _id: req.body.id }, {status:"Processing"},function (err, result2) {
            if (err) {
                return res.status(500).json({
                    err_code: 500,
                    message: "更新出错" + err.message
                })
            }
            res.redirect('/proc_order')
        })
    })
})

// 关闭
proc_order.post('/closed_order', function (req, res) {
    Order.findOne({ _id: req.body.id }, function (err, result) {
        if (err) {
            return res.status(500).json({
                err_code: 500,
                message: "查询出错" + err.message
            })
        }
        Order.updateOne({ _id: req.body.id }, {status:"Closed"},function (err, result2) {
            if (err) {
                return res.status(500).json({
                    err_code: 500,
                    message: "更新出错" + err.message
                })
            }
            res.redirect('/proc_order')
        })
    })
})

// 未处理
proc_order.post('/unprocessing_order', function (req, res) {
    Order.findOne({ _id: req.body.id }, function (err, result) {
        if (err) {
            return res.status(500).json({
                err_code: 500,
                message: "查询出错" + err.message
            })
        }
        Order.updateOne({ _id: req.body.id }, {status:"Unprocessing"},function (err, result2) {
            if (err) {
                return res.status(500).json({
                    err_code: 500,
                    message: "更新出错" + err.message
                })
            }
            res.redirect('/proc_order')
        })
    })
})

// 进入纠纷状态
proc_order.post('/dispute_resolution_order', function (req, res) {
    Order.findOne({ _id: req.body.id }, function (err, result) {
        if (err) {
            return res.status(500).json({
                err_code: 500,
                message: "查询出错" + err.message
            })
        }
        Order.updateOne({ _id: req.body.id }, {status:"Dispute Resolution"},function (err, result2) {
            if (err) {
                return res.status(500).json({
                    err_code: 500,
                    message: "更新出错" + err.message
                })
            }
            res.redirect('/proc_order')
        })
    })
})


module.exports = proc_order