const express = require('express')
const Goods = require('../models/goods')

const new_arrival = express.Router()

new_arrival.get('/new_arrival', function (req, res) {
    //渲染主页面
    // console.log(req.session.user)
    res.render('new_arrival.html')
})

new_arrival.post('/new_arrival', function (req, res) {
    //1.获取表单数据
    //2.查询是否存在
    //3.发送响应数据
    // console.log(req.body)
    //
    var body = req.body;
    console.log = body;
    //
    Goods.findOne({
        goodsName: body.goodsName

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
                message: '商品已存在'
            })
        }

        //对密码md5双重加密
        // body.password = md5(md5(body.password))

        new Goods(body).save(function (err, goods) {
            if (err) {
                return res.status(500).json({
                    err_code: 500,
                    message: '服务端错误'
                })
            }

            // 注册成功并使用session保存状态
            // req.session.user = user

            res.status(200).json({
                err_code: 0,
                message: 'OK'
            })
            // 同步请求跳转用
            // res.redirect('/')
        })



    })

})

module.exports = new_arrival