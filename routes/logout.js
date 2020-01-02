const express = require('express')

const logout = express.Router()

logout.get('/logout', function (req, res) {
    //处理登出请求

    // console.log(req.session.user)
    
    // 暂存用户组数据，用于判断用户类型
    var user_group = req.session.user.group

    //清除 session.user
    req.session.user = null
    // 用户定向主页 管理员定向登陆
    if(user_group == 0 ){
    res.redirect('/index');
    }else{
        res.redirect('/login');
    }
    
})

// logout.get('/ad_logout', function(req,res){
//     req.session.user = null
//     res.
// })



module.exports = logout