var mongoose = require('mongoose');
//连接网络数据库
mongoose.connect('mongodb+srv://admin:8638938lzY@mymongodb-rdfvx.azure.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true });

var Goods_schema = mongoose.Schema;

var goodsSchema = new Goods_schema({
    goodsName: {
        type: String,
        require: true,
    },
    brand: {
        type: String,
        require: true
    },
    age: {
        // 适合年龄段 3+ 3- all
        type: String,
        require: true,
    },
    color: {
        type: String,
        require: true
    },
    madein: {
        type: String,
        require: true
    },
    availability: {
        type: String,
        require: true
    },
    imgPath: {
        type: String,
        require: true,
        default: '../public/goodsimg/default.img'
    },
    description: {
        type: String,
        require: true
    },
    price: {
        type: String,
        require: true
    },
    create_time: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Goods', goodsSchema)