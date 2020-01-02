const express = require('express')

const Admin = express.Router()

Admin.get('/admin',function(req,res){
  // console.log(req.session.user)
    res.render('admin.html',{
      user:req.session.user,
      nickname:req.session.user.nickname
    })
})

module.exports = Admin