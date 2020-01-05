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
// 处理中
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

// 用户申请进入纠纷状态
proc_order.post('/dispute_order', function (req, res) {
    Order.findOne({ _id: req.body.id }, function (err, result) {
        if (err) {
            return res.status(500).json({
                err_code: 500,
                message: "查询出错" + err.message
            })
        }
        Order.updateOne({ _id: req.body.id }, {status:"Dispute"},function (err, result2) {
            if (err) {
                return res.status(500).json({
                    err_code: 500,
                    message: "更新出错" + err.message
                })
            }
            res.redirect('/my_order')
        })
    })
})

// 管理员确认进入纠纷状态
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

// 用户收货状态
proc_order.post('/received_order', function (req, res) {
    Order.findOne({ _id: req.body.id }, function (err, result) {
        if (err) {
            return res.status(500).json({
                err_code: 500,
                message: "查询出错" + err.message
            })
        }
        Order.updateOne({ _id: req.body.id }, {status:"Received"},function (err, result2) {
            if (err) {
                return res.status(500).json({
                    err_code: 500,
                    message: "更新出错" + err.message
                })
            }
            res.redirect('/my_order')
        })
    })
})

// 问题解决，用户关闭纠纷
proc_order.post('/solved_order', function (req, res) {
    Order.findOne({ _id: req.body.id }, function (err, result) {
        if (err) {
            return res.status(500).json({
                err_code: 500,
                message: "查询出错" + err.message
            })
        }
        Order.updateOne({ _id: req.body.id }, {status:"Solved"},function (err, result2) {
            if (err) {
                return res.status(500).json({
                    err_code: 500,
                    message: "更新出错" + err.message
                })
            }
            res.redirect('/my_order')
        })
    })
})

// 问题解决或成功收货，管理员选择交易成功或关闭交易
proc_order.post('/successful_order', function (req, res) {
    Order.findOne({ _id: req.body.id }, function (err, result) {
        if (err) {
            return res.status(500).json({
                err_code: 500,
                message: "查询出错" + err.message
            })
        }
        Order.updateOne({ _id: req.body.id }, {status:"Successful"},function (err, result2) {
            if (err) {
                return res.status(500).json({
                    err_code: 500,
                    message: "更新出错" + err.message
                })
            }
            res.redirect('/my_order')
        })
    })
})

module.exports = proc_order