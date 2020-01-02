const express = require('express')
const User = require('../models/user')
const md5 = require('blueimp-md5')

const login = express.Router()

login.get('/login', function (req, res) {

    // console.log(req.session.user)

    // 但凡进入 login 页面，则默认清除用户登陆状态
    req.session.user = null

    //渲染主页面
    res.render('login.html', {
        user: req.session.user
    })
})

login.post('/login', function (req, res) {
    //1.获取表单数据
    //2.查询数据库用户名密码是否正确
    //3.发送响应数据
    // console.log(req.body)
    //
    var body = req.body
    console.log(req.body)

    User.findOne({
        //与 查询
        email: body.email,
        password: md5(md5(body.password))
    }, function (err, user) {
        if (err) {
            return res.status(500).json({
                err_code: 500,
                message: err.message
            })
        }

        if (!user) {
            return res.status(200).json({
                err_code: 1,
                message: 'Email or Password is invalid.'
            })
        }

        //用户存在，登陆成功， 通过 session 记录登陆状态
        req.session.user = user
        // console.log(typeof(req.session.user.group))
        // 用户登陆跳转
        if (user.group == 0) {
            return res.status(200).json({
                err_code: 0,
                nickname: user.nickname,
                message: 'OK Customer'
            })
        }
        // 管理员登陆跳转
        res.status(200).json({
            err_code: 2,
            nickname: user.nickname,
            message: 'OK Admin'
        })

    })

})

module.exports = login