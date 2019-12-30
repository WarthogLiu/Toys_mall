const express = require('express')

const Admin = express.Router()

Admin.get('/admin',function(req,res){
    res.render('admin.html',{
      user:req.session.user
    })
})

module.exports = Admin