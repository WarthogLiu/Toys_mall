const express = require('express')
const Goods = require('../models/goods')
const multiparty = require('multiparty')

const new_arrival = express.Router()

new_arrival.get('/new_arrival', function (req, res) {
    //渲染页面
    // console.log(req.session.user)

    res.render('new_arrival.html', {
        user: req.session.user,
        nickname: req.session.user.nickname
    })
})


new_arrival.post('/new_arrival', function (req, res) {
    console.log("报错请检查 upload 文件夹位置")
    var form = new multiparty.Form();
    // 上传图片保存的地址 目录必须存在
    form.uploadDir = 'upload' // 上传图片保存的地址

    form.parse(req, function (err, fields, files) {
        // 获取表单提交的数据
        // console.log(fields);
        // 图片上传成功返回的信息
        // console.log(files);

        // 取值 存入数据库
        var goodsName = fields.name[0];
        var brand = fields.brand[0];
        var age = fields.age[0];
        var color = fields.color[0];
        var madein = fields.madein[0];
        var availability = fields.availability[0];
        var gender_trend = fields.gender_trend[0];
        var original_price = fields.original_price[0];
        var current_price = fields.current_price[0];
        var discount = fields.discount[0];
        var description = fields.description[0];
        // 取图片地址
        var imgPath = files.image[0].path;

        var body = {
            goodsName: goodsName,
            brand: brand,
            age: age,
            color: color,
            madein: madein,
            availability: availability,
            gender_trend: gender_trend,
            original_price: original_price,
            current_price: current_price,
            discount: discount,
            description: description,
            imgPath: imgPath
        }


        console.log(goodsName);
        console.log(body);

        Goods.findOne({
            goodsName: goodsName
        }, function (err, data) {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err
                });
            }
            if (data) {
                return res.status(200).json({
                    err_code: 1,
                    message: '商品已存在'
                });
            }

            new Goods(body).save(function (err, goods) {
                if (err) {
                    return res.status(500).json({
                        err_code: 500,
                        message: "请检查 性别趋向 首字母是否为大写！"
                    })
                }

                // 注册成功并使用session保存状态
                // req.session.user = user

                res.status(200).json({
                    err_code: 0,
                    message: 'OK'
                })
            });

        });


    });
});

// new_arrival.post('/new_arrival', function (req, res) {
//     //1.获取表单数据
//     //2.查询是否存在
//     //3.发送响应数据
//     // console.log(req.body)
//     //
//     var body = req.body;
//     console.log = body;
//     //
//     Goods.findOne({
//         goodsName: body.goodsName

//     }, function (err, data) {
//         if (err) {
//             return res.status(500).json({
//                 success: false,
//                 message: '服务端错误'
//             })
//         }
//         // console.log(data)
//         //如果已存在
//         if (data) {
//             return res.status(200).json({
//                 err_code: 1,
//                 message: '商品已存在'
//             })
//         }

//         //对密码md5双重加密
//         // body.password = md5(md5(body.password))

//         new Goods(body).save(function (err, goods) {
//             if (err) {
//                 return res.status(500).json({
//                     err_code: 500,
//                     message: '服务端错误'
//                 })
//             }

//             // 注册成功并使用session保存状态
//             // req.session.user = user

//             res.status(200).json({
//                 err_code: 0,
//                 message: 'OK'
//             })
//             // 同步请求跳转用
//             // res.redirect('/')
//         })



//     })

// })

module.exports = new_arrival