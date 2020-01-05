const express = require('express')
const Goods = require('../models/goods')
const History = require('../models/history')
const multiparty = require('multiparty')
const fs = require('fs')

const modify = express.Router()

modify.get('/modify', function (req, res) {
    Goods.find(function (err, docs, next) {
        res.render('modify.html', {
            user: req.session.user,
            nickname: req.session.user.nickname,
            lists: docs,
        });
    })
})

modify.get('/modify_goods', function (req, res) {
    Goods.findOne({ _id: req.query.id }, function (err, docs, next) {

        if (err) {
            return res.status(500).json({
                err_code: 500,
                message: err.message
            })
        }
        res.render('modify_goods.html', {
            user: req.session.user,
            nickname: req.session.user.nickname,
            goods: docs,
        });
    })
})

modify.post('/modify_goods', function (req, res) {
    console.log("报错请检查 upload 文件夹位置")
    var form = new multiparty.Form();
    // 上传图片保存的地址 目录必须存在
    form.uploadDir = 'upload' // 上传图片保存的地址

    form.parse(req, function (err, fields, files) {
        // 获取表单提交的数据
        // console.log(fields);
        // 图片上传成功返回的信息
        console.log(files);

        // 取值 存入数据库
        var id = fields.id[0];
        var goodsName = fields.name[0];
        var brand = fields.brand[0];
        var age = fields.age[0];
        var color = fields.color[0];
        var madein = fields.madein[0];
        var gender_trend = fields.gender_trend[0];
        var original_price = fields.original_price[0];
        var current_price = fields.current_price[0];
        var discount = fields.discount[0];
        var description = fields.description[0];
        // 取图片地址
        var imgPath = files.image[0].path;


        // 若图片没有更新，则不上传图片地址
        if (!files.image[0].originalFilename) {
            var data = {
                goodsName: goodsName,
                brand: brand,
                age: age,
                color: color,
                madein: madein,
                gender_trend: gender_trend,
                original_price: original_price,
                current_price: current_price,
                discount: discount,
                description: description
            }
            // 删除自动生成的无用临时文件
            fs.unlink(imgPath);
        } else {
            var data = {
                goodsName: goodsName,
                brand: brand,
                age: age,
                color: color,
                madein: madein,
                gender_trend: gender_trend,
                original_price: original_price,
                current_price: current_price,
                discount: discount,
                description: description,
                imgPath: imgPath
            }
        }


        // console.log(goodsName);
        // console.log(id);

        Goods.findOne({ _id: id }, function (err, docs) {
            if (err) {
                return res.status(500).json({
                    err_code: 500,
                    message: "查找出错" + err
                })
            }

            Goods.updateOne({ _id: id }, data, function (err, goods) {
                if (err) {
                    return res.status(500).json({
                        err_code: 500,
                        message: "更新步骤出错" + err
                    })
                }
                new History({
                    type: "Modify Goods",
                    object_id: id,
                    before: docs,
                    after: data,
                    operator: req.session.user.nickname
                }).save(function (err, docs2) {
                    if (err) {
                        return res.status(500).json({
                            err_code: 500,
                            message: "历史记录存储错误！" + err
                        })
                    }
                    res.redirect('/modify')
                })


                // res.status(200).json({
                //     err_code: 0,
                //     message: 'OK'
                // })
            });
        })




    });
})

module.exports = modify