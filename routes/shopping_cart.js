const express = require('express')
const Cart = require('../models/cart')

const shopping_cart = express.Router()

shopping_cart.get('/shopping_cart', function (req, res) {
    // if (!req.session.cart) {
    //     return res.render('/shopping_cart', {
    //         test:"test pass"
    //     });
    // };
    res.render('/shopping_cart',{
        // user:req.session.Cart,
        cart:cart
    })

});



module.exports = shopping_cart