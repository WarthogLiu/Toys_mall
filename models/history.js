var mongoose = require('mongoose')
mongoose.connect('mongodb+srv://admin:8638938lzY@mymongodb-rdfvx.azure.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true });

var History_schema = mongoose.Schema;

var history_schema = new History_schema({
    name: {
        type: String,
        require: true
    },
    id: {
        type: String,
        require: true
    },
    content: {
        type: String,
        require: true
    },
    create_time: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model('History', history_schema)