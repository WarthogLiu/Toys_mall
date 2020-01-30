var mongoose = require('mongoose')
const db_connect = require('../models/db_connect')

//连接网络数据库
mongoose.connect(db_connect, { useNewUrlParser: true });

var Contact_schema = mongoose.Schema;

var contact_schema = new Contact_schema({
    email: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    content: {
        type: String,
        require: true
    },
    status: {
        type: String,
        default: true
    },
    create_time: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('Contact', contact_schema)