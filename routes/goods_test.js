const express = require('express')
const Goods = require('../models/goods')

const goods = express.Router()


goods.get('/goods', function (req, res) {
    //渲染主页面
    // console.log(req.session.user)
    Goods.find(function (err, docs) {
        // console.log(docs);
        res.render('goods', {
            lists: docs
        });
        
    });
});

module.exports = goods