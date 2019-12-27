const express = require('express')
const Cart = require('../models/cart')
const Order = require('../models/order')

const checkout = express.Router();

checkout.get('/checkout', function (req, res, next) {

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
    var body = req.body;
    var cart = new Cart(req.session.cart);
    var user = req.session.user;
    console.log(body);
    console.log(user)
    console.log(cart)
    
    //
    var order = new Order({
        userId:user._id,
        cart:cart,
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        address:req.body.address
    });
    order.save(function(err, result){
        req.session.cart = null;
        res.redirect('/index');
    })

})

module.exports = checkout