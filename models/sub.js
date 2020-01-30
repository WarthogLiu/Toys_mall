var mongoose = require('mongoose')
const db_connect = require('../models/db_connect')

//连接网络数据库
mongoose.connect(db_connect, { useNewUrlParser: true });

var Sub_schema = mongoose.Schema

var subSchema = new Sub_schema({
    email: {
        type: String,
        require: false
    },
    create_time: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Sub', subSchema)