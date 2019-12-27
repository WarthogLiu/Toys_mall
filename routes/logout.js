const express = require('express')

const logout = express.Router()

logout.get('/logout', function (req, res) {
    //处理登出请求

    //清除 session
    req.session.user = null
    //重定向回 index
    res.redirect('/index')
})



module.exports = logout