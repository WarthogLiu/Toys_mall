//导入模块
const express = require('express')
const User = require('../models/user')
const md5 = require('blueimp-md5')
// const ejs = require('ejs')
// const bodyPaser = require('body-parser')

//挂载所有路由到 register
const register = express.Router()

register.get('/register', function (req, res) {
    // 但凡进入 login 页面，则默认清除用户登陆状态
    req.session.user = null

    // 渲染注册页面
    res.render('register.html', {
        user: req.session.user
    })
})

register.post('/register', function (req, res) {
    //1.获取表单提交的数据
    //2.操作数据库
    //3.发送响应
    // console.log(req.body)
    // 
    var body = req.body
    // console.log(body.group)
    //
    User.findOne({
        //或 查询
        $or: [
            {
                email: body.email
            },
            {
                nickname: body.nickname
            }
        ]
    }, function (err, data) {
        if (err) {
            return res.status(500).json({
                success: false,
                message: '服务端错误'
            })
        }
        // console.log(data)
        //如果已存在
        if (data) {
            return res.status(200).json({
                err_code: 1,
                message: '邮箱或昵称已存在'
            })
        }

        //对密码md5双重加密
        body.password = md5(md5(body.password))

        new User(body).save(function (err, user) {
            if (err) {
                return res.status(500).json({
                    err_code: 500,
                    message: '服务端错误'
                })
            }

            // 注册成功并使用session保存状态
            req.session.user = user

            // console.log(typeof(user.group));
            // console.log(user.group);
            // console.log(typeof(body.group));
            // console.log(body.group);
            // 用户注册跳转

            if (body.group == 0) {
                return res.status(200).json({
                    err_code: 0,
                    nickname: body.nickname,
                    message: 'OK Customer'
                })
            }
            // 管理员注册跳转
            if (body.group == 1) {
                res.status(200).json({
                    err_code: 2,
                    nickname: body.nickname,
                    message: 'OK Admin'
                })
            }
            // 同步请求跳转用
            // res.redirect('/')
        })



    })

})

// register.get('/login', function (req, res) {
//     //渲染登陆页面
//     res.render('login')
// })

// register.post('/login', function (req, res) {
//     //渲染登陆页面
//     res.render('login')
// })
//导出接口
module.exports = register