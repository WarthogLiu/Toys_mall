const express = require('express')
const Order = require('../models/order')
const Cart = require('../models/cart')

const my_order = express.Router()

my_order.get('/my_order', function (req, res) {
    var orders = null;


    Order.find({ userId: req.session.user._id }, function (err, orders) {
        if (err) {
            return res.write('Error');
        }

        res.render('my_order.html', {
            user: req.session.user,
            order: orders
        });
    });
});

my_order.get('/order_detail', function (req, res) {
    console.log(typeof(req.query.id))
    console.log(req.query.id)
    var id = req.query.id
    id = id.replace("\"","").replace("\"","");
    console.log(id)
    
    Order.findOne({ _id: id }, function (err, orders) {
        if (err) {
            return res.write('Error');
        }

        res.render('order_detail.html', {
            user: req.session.user,
            order: orders
        });
    });
});

module.exports = my_order