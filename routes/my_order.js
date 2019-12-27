const express = require('express')
const Order = require('../models/order')
const Cart = require('../models/cart')

const my_order = express.Router()

my_order.get('/my_order', function (req, res) {
    var orders = null;
    Order.find({ user: req.user }, function (err, orders) {
       if(err){
           return res.write('Error');
       }
       var cart;
       orders.forEach(function(order){
    cart = new Cart(order.cart);
order.items = cart.generateArray();
       });

    });
    res.render('my_order.html', {
        user: req.session.user,
        order:orders
    });

});

module.exports = my_order