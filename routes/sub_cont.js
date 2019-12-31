const express = require('express')
const Sub = require('../models/sub')
const Cont = require('../models/contact')

const sub_cont = express.Router()

sub_cont.post('/sub', function (req, res) {
    // console.log(req.body.sub)

    Sub.findOne({
        email: req.body.sub
    }, function (err, result) {
        if (err) {
            return res.status(500).json({
                err_code: 500,
                message: err.message
            });
        };
        if (result) {
            return res.status(200).json({
                err_code: 1,
                message: 'Email already exists'
            });
        } else {
            new Sub({ email: req.body.sub }).save(function (err, result) {
                // console.log(result)

                if (err) {
                    return res.status(500).json({
                        err_code: 500,
                        message: '服务端错误'
                    })
                } else {
                    return res.status(200).json({
                        err_code: 0,
                        message: 'Thanks for your subscription'
                    });
                };
            });
        }
    })
})

sub_cont.post('/contact', function (req, res) {
    // console.log(req.body)
    new Cont(req.body).save(function (err, result) {
        if (err) {
            return res.status(500).json({
                err_code: 500,
                message: '服务端错误'
            });
        } else {
            return res.status(200).json({
                err_code: 0,
                message: 'Thanks for your contact'
            });
        };
    })
})

module.exports = sub_cont