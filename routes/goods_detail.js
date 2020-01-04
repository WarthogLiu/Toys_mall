const express = require('express')
const Goods = require('../models/goods')

const Goods_detail = express.Router()

Goods_detail.get('/goods_detail', function(req,res){
    Goods.find(function (err, docs, next) {
        res.render('goods_detail.html', {
            user: req.session.user,
            nickname: req.session.user.nickname,
            goods: docs,
        });
    })
})

module.exports = Goods_detail