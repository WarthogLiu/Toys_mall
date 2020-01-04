const express = require('express')
const Goods = require('../models/goods')
const Cart = require('../models/cart')
const index = express.Router()

index.get('/index', function (req, res, next) {
    //渲染主页面
    // console.log(req.session.user.nickname)
    // 购物车 session 
    cart = req.session.cart;

    Goods.find(function (err, docs) {
        res.render('index.html', {
            user: req.session.user,
            lists: docs,
        });

    });


});



module.exports = index