const express = require('express')
const Goods = require('../models/goods')
const Cart = require('../models/cart')

const product = express.Router()

product.get('/product', function (req, res) {
    //渲染商品页面
    // console.log(req.session.user.nickname)
    Goods.find(function(err, docs, next){
        res.render('product.html', {
            user: req.session.user,
            lists:docs
        });
    })

})



module.exports = product