var mongoose = require('mongoose')
const db_connect = require('../models/db_connect')

//连接网络数据库
mongoose.connect(db_connect, { useNewUrlParser: true });

var User_schema = mongoose.Schema

var userSchema = new User_schema({
    email: {
        type: String,
        required: true
    },
    nickname: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    group:{
        //用户组 默认为买家
        type: String,
        enum:[0, 1],
        default:0,
        require:true
    },
    create_time: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('User', userSchema)