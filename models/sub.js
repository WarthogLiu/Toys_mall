var mongoose = require('mongoose')
mongoose.connect('mongodb+srv://admin:8638938lzY@mymongodb-rdfvx.azure.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true });

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