const express = require('express')
const Cart = require('../models/cart')
const Order = require('../models/order')
const Goods = require('../models/goods')


const cart = express.Router();

// cart.engine('html', require('hbs').__express);
// app.set('view engine', '.html');

cart.get('/add-to-cart/:id', function (req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    Product.findById(productId, function (err, product) {
        if (err) {
            return res.redirect('/index.htlm');
        }
        cart.add(product, product.id);
        req.session.cart = cart;
        console.log(req.session.cart);
        res.redirect('/index.html');
    });
});

cart.get('/cart', function (req, res, next) {

    cart = req.session.cart;


    if (!req.session.cart) {
        return res.render('cart.html', {
            products: null,
            user: req.session.user
        });
    }
    var cart = new Cart(req.session.cart);
    console.log(cart)

    res.render('cart.html', {
        user: req.session.user,
        cart: cart,
        products: cart.generateArray(),
        totalPrice: cart.totalPrice,
    });

});

cart.get('/remove_all', function(req,res){
    req.session.cart = null;
    res.redirect('/cart')
})

module.exports = cart