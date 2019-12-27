const express = require('express')

const about = express.Router()

about.get('/about', function (req, res) {
    //渲染官方简介页面
    res.render('about.html',{
        user:req.session.user
    })
})



module.exports = about