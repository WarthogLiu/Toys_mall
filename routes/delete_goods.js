const express = require('express')
const Goods = require('../models/goods')

const Del_goods = express.Router()

Del_goods.get('/delete_goods',function(req,res){
    Goods.find(function (err, docs, next) {
        res.render('delete_goods.html', {
            user: req.session.user,
            nickname: req.session.user.nickname,
            lists: docs,
        });
    })
})

Del_goods.post('/delete_goods',function(req,res){
    Goods.deleteOne({_id:req.body.id},function(err, result){
        if (err) {
            return res.status(500).json({
                err_code: 500,
                message: err.message
            })
        }
        res.redirect('/delete_goods')
    })
})

module.exports = Del_goods