const express = require('express')
const mongoose = require('mongoose')
const Goods = require('../models/goods')
const Cart = require('../models/cart')

const product_detail = express.Router()

product_detail.get('/product_detail/', function (req, res) {
    // console.log(req.query)
    //渲染官方简介页面
    // 获取当前页面url
    // console.log(req.url)

    // 1.正则表达式解析商品id
    // function getUrlid(name) {
    //     var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构建一个含有目标参数的正则表达式对象     
    //     var r = req.url.substr(1).match(reg);//匹配目标参数  
    //     if (r != null) {
    //         return unescape(r[2]); //返回参数值  
    //     }
    //     return null;
    // }
    // console.log(getUrlid("?"))

    // 2.或使用 req.query 获取的对象 id
    var url_id = mongoose.Types.ObjectId(req.query.id)
    // console.log(url_id)
    Goods.findOne({
        // 依据默认 _id 查找对应商品
        _id: url_id
    }, function (err, goods) {
        res.render('product_detail.html', {
            user: req.session.user,
            goods: goods
        })
    })
});

product_detail.get('/add-to-cart/', function (req, res, next) {
    var GoodsId = mongoose.Types.ObjectId(req.query.id);

    // console.log(GoodsId);
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    Goods.findById(GoodsId, function (err, product) {
        if (err) {
            return res.redirect('/index');
        }
        cart.add(product, product.id);
        req.session.cart = cart;
        // 来看看都加了什么好东西
        console.log(req.session.cart);
        console.log(req.url);
        res.redirect('/index');
    });
});







module.exports = product_detail