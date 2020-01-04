// 导入模块
const express = require('express')
const mongoose = require('mongoose')
var hbs = require('express-handlebars')

const Goods_detail = require('./routes/goods_detail')
const Sub_list = require('./routes/sub_list')
const Contact_list = require('./routes/contact_list')
const User_manage = require('./routes/user_manage')
const Del_goods = require('./routes/delete_goods')
const modify = require('./routes/modify')
const add_goods = require('./routes/add_goods')
const new_arrival = require('./routes/new_arrival')
const admin = require('./routes/admin')
const sub_cont = require('./routes/sub_cont')
const cart = require('./routes/cart')
// const Cart = require('../models/cart')
const index = require('./routes/index')
const register = require('./routes/register')
const login = require('./routes/login')
const logout = require('./routes/logout')
const about = require('./routes/about')
const contact = require('./routes/contact')
const product_detail = require('./routes/product_detail')
const product = require('./routes/product')
const checkout = require('./routes/checkout')
const my_order = require('./routes/my_order')
const Search = require('./routes/search')
// const shopping_cart = require('./routes/shopping_cart')
const bodyParser = require('body-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session) //将 session 存入数据库 

//测试模块

// const goods = require('./routes/goods')

const path = require('path')
// const ejs = require('ejs')
const app = express()

app.use(express.static('public'));
app.use('/upload',express.static('upload'));// 图片上传文件夹
app.use(express.static('models'));
app.use('/public', express.static(path.join(__dirname, './public/')))
app.use('/node_modules/', express.static(path.join(__dirname, './node_modules/')))



//设置渲染引擎
app.engine('html', require('express-art-template'))
app.set('view engine', 'template')


// app.set('view engine', '.html');
// app.engine('.html', hbs({defaultLayout: 'layout', extname: '.html'}));

// app.engine('html', require('hbs').__express);

// app.engine('html', hbs({
//   extname: 'hbs', 
//   defaultLayout: 'base', 
//   layoutsDir: path.join(__dirname, 'views/layouts'),
//   partialsDir  : [
//       //  path to your partials
//       path.join(__dirname, 'views/partials'),
//   ]
// }));



//session 可通过 req.session 来访问和设置 Session 成员
//添加Session: req.session.foo = 'bar'
//访问Session: req.session.foo
app.use(session({
  secret: 'itcast',//配置加密字符串，将会在原有加密基础上拼接该字符串以加密，提高安全性
  resave: false,
  saveUninitialized: false,//无论是否使用 session ，都默认配置秘钥
  store: new MongoStore({
    mongooseConnection: mongoose.connection
  }),
  cookie: { maxAge: 180 * 60 * 1000 } //cookie 周期
}))






// app.use(bodyParser.urlencoded({    
//     extended: true
//   }))


//配置解析表单 POST 请求插件
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use(function (req, res, next) {
  // res.locals.login = req.isAuthenticated();
  res.locals.session = req.session;
  next();
})
//把路由挂载到app中
app.use(Goods_detail)
app.use(Sub_list)
app.use(Contact_list)
app.use(User_manage)
app.use(Del_goods)
app.use(modify)
app.use(add_goods)
app.use(admin)
app.use(sub_cont)
app.use(Search)
app.use(my_order)
app.use(checkout)
app.use(cart)
app.use(product)
app.use(product_detail)
app.use(contact)
app.use(about)
app.use(login)
app.use(logout)
app.use(register)
app.use(index)

//测试路由
// app.use(shopping_cart)
app.use(new_arrival)
// app.use(goods)

// 直接路由




//运行监听
app.listen(3000, function () {
  console.log('listening port 3000...')
})