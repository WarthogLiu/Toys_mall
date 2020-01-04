const express = require('express')
const Goods = require('../models/goods')
const Order = require('../models/order')
const User = require('../models/user')
const mongoose = require('mongoose')

const search = express.Router()


// 商城产品搜索
search.get('/search', function (req, res) {
    console.log(req.query);
    console.log(req.url);
    var val = String(req.query.search);
    // var Nval = Number(val);
    Goods.find({
        $or: [
            {
                goodsName: { $regex: val, $options: '$i' }  // $i不区分大小写
            },
            {
                brand: { $regex: val, $options: '$i' }
            },
            {
                age: { $regex: val, $options: '$i' }
            },
            {
                color: { $regex: val, $options: '$i' }
            },
            {
                madein: { $regex: val, $options: '$i' }
            },
            {
                gender_trend:{ $regex: val, $options: '$i' }
            },
            {
                discount:{ $regex: val, $options: '$i' }
            }
        ]
    }, function (err, data) {
        if (err) {
            return res.status(500).json({
                success: false,
                message: err
            });
        };
        if (data) {
            // console.log(data)
            res.render('product.html', {
                user: req.session.user,
                lists: data,
                val: val
            });
        };
    });
});


// 管理系统产品搜索
search.get('/add_goods_search', function (req, res) {
    console.log(req.query);
    console.log(req.url);
    var val = String(req.query.search);
    // var Nval = Number(val);
    Goods.find({
        $or: [
            {
                goodsName: { $regex: val, $options: '$i' }  // $i不区分大小写
            },
            {
                brand: { $regex: val, $options: '$i' }
            },
            {
                age: { $regex: val, $options: '$i' }
            },
            {
                color: { $regex: val, $options: '$i' }
            },
            {
                madein: { $regex: val, $options: '$i' }
            },
            {
                gender_trend:{ $regex: val, $options: '$i' }
            },
            {
                discount:{ $regex: val, $options: '$i' }
            }
        ]
    }, function (err, data,next) {
        if (err) {
            return res.status(500).json({
                success: false,
                message: err
            });
        };
        if (data) {
            // console.log(data)
            res.render('add_goods.html', {
                user: req.session.user,
                nickname:req.session.user.nickname,
                lists: data,
                val: val
            });
        };
    });
});

search.post('/search', function (req, res) {
    // console.log(req.body)
})

module.exports = search