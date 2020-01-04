const express = require('express')
const Contact = require('../models/contact')

const Contact_list = express.Router()

Contact_list.get('/contact_list', function (req, res) {
    Contact.find(function (err, docs, next) {
        res.render('contact_list.html', {
            user: req.session.user,
            nickname: req.session.user.nickname,
            lists: docs,
        });
    })
})

Contact_list.get('/contact_detail', function (req, res) {
    Contact.findOne({
        _id: req.query.id
    },function (err, docs, next) {
        res.render('contact_detail.html', {
            user: req.session.user,
            nickname: req.session.user.nickname,
            lists: docs,
        });
    })
})

Contact_list.post('/contact_processed',function(req,res){
    Contact.updateOne({_id:req.body.id},{status:"Processed"},function(err,docs){
        if (err) {
            return res.status(500).json({
                err_code: 500,
                message: err.message
            })
        }
        res.redirect('/contact_list')
    })
})

Contact_list.post('/contact_unprocessed',function(req,res){
    Contact.updateOne({_id:req.body.id},{status:"Unprocessed"},function(err,docs){
        if (err) {
            return res.status(500).json({
                err_code: 500,
                message: err.message
            })
        }
        res.redirect('/contact_list')
    })
})

module.exports = Contact_list