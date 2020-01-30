var mongoose = require('mongoose');
const db_connect = require('../models/db_connect')

//连接网络数据库
mongoose.connect(db_connect, { useNewUrlParser: true });
var Order_schema = mongoose.Schema;

var orderSchema = new Order_schema({
    userId:{
        // 取自用户默认 _id
        type: Order_schema.Types.ObjectId,ref:'User',
        // require:true
    },
    cart:{
        // 购物车对象
        type:Object,
        // require:true
        default:{'cart':'0'}
    },
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    phone:{
        type:String,
        require:true
    },
    address:{
        type:String,
        require:true
    },
    status:{
        type:String,
        require:true,
        // enum:['paid', 'received', 'cancelled', 'closed']
    },
    create_time: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Order', orderSchema);