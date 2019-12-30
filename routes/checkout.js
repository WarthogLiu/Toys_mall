const express = require('express')
const Cart = require('../models/cart')
const Order = require('../models/order')
const md5 = require('blueimp-md5')

const checkout = express.Router();

checkout.get('/checkout', function (req, res) {

    cart = req.session.cart;
    // console.log(cart)
    

    if (!req.session.cart) {
        return res.render('cart.html', {
            user: req.session.user
        });
    }
    var cart = new Cart(req.session.cart);
    res.render('checkout.html', {
        total: cart.totalPrice,
        user: req.session.user
    });
});


checkout.post('/checkout', function (req, res) {
    //1.获取表单数据
    //2.查询是否存在
    //3.发送响应数据
    // console.log(req.body)
    //
    var body = req.body
    var cart = new Cart(req.session.cart)
    var user = req.session.user
    // console.log(req.body)
    // console.log(body)
    // console.log(user)
    // console.log(cart)
    // console.log(order)

    if(!body.name || !body.email || !body.phone || !body.address || !body.password){
        return res.status(200).json({
            err_code: 0,
            message: "请填写信息"
        })
    }
    else if (md5(md5(body.password)) != user.password) {
        return res.status(200).json({
            err_code: 1,
            message: "密码错误"
        })
    }else{

         res.status(200).json({
            err_code: 2,
            message:"下单成功"
        });
        var order = new Order({
            userId:user._id,
            cart:cart,
            name:body.name,
            email:body.email,
            phone:body.phone,
            address:body.address
        });
       order.save(function(err, result){
        });
    }
    req.session.cart = null;

})

module.exports = checkout