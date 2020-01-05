var mongoose = require('mongoose')
mongoose.connect('mongodb+srv://admin:8638938lzY@mymongodb-rdfvx.azure.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true });

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