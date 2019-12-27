var mongoose = require('mongoose')
//连接网络数据库
mongoose.connect('mongodb+srv://admin:8638938lzY@mymongodb-rdfvx.azure.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true })

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