const express = require('express')

const contact = express.Router()

contact.get('/contact', function (req, res) {
    //渲染官方简介页面
    res.render('contact.html',{
        user:req.session.user
    })
})



module.exports = contact