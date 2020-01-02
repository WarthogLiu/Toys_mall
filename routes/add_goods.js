const express = require('express')
const Goods = require('../models/goods')

const add_goods = express.Router()

add_goods.get('/add_goods',function(req, res){
    Goods.find(function(err, docs, next){
        res.render('add_goods.html', {
            user: req.session.user,
            nickname:req.session.user.nickname,
            lists:docs,
        });
    })

})

add_goods.post('/add_goods',function(req,res){
    Goods.findOne({_id:req.body.id},function(err,docs, next){
        if (err) {
            return res.status(500).json({
                err_code: 500,
                message: err.message
            })
        }
        var a = parseFloat(docs.availability) + parseFloat(req.body.add_number);

        Goods.updateOne({_id:req.body.id},{availability:a},function(err,docs){
            if (err) {
                return res.status(500).json({
                    err_code: 500,
                    message: err.message
                })
            }
            res.redirect('/add_goods')
        })
    })
    
})


module.exports = add_goods