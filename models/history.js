var mongoose = require('mongoose')
const db_connect = require('../models/db_connect')

//连接网络数据库
mongoose.connect(db_connect, { useNewUrlParser: true });

var History_schema = mongoose.Schema;

var history_schema = new History_schema({
    type: {
        type: String,
        require: true
    },
    object_id: {
        type: String,
        require: true
    },
    before: {
        type: Object,
        require: false
    },
    after: {
        type: Object,
        require: false
    },
    operator: {
        type: String,
        require: true
    },
    create_time: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('History', history_schema)