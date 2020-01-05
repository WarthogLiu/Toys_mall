const express = require('express')
const History = require('../models/history')

const history = express.Router()

history.get('/history', function (req, res) {
    History.find(function (err, docs, next) {
        res.render('history.html', {
            user: req.session.user,
            nickname: req.session.user.nickname,
            lists: docs,
        });
    })

})

history.get('/history_check', function (req, res) {
    History.findOne({ _id: req.query.id }, function (err, docs, next) {
        if (err) {
            return res.status(500).json({
                err_code: 500,
                message: err.message
            })
        }
        res.render('history_check.html', {
            user: req.session.user,
            nickname: req.session.user.nickname,
            lists: docs,
        });
    })
})

module.exports = history