const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name:{type:String},
    sex:{type:String},
    age:{type:String},
    origin:{type:mongoose.SchemaTypes.ObjectId,ref:'stuorign'},
    id:{type:String},
    address:{type:String},
    phone:{type:String},
    wechat:{type:String},
    activity:{type:mongoose.SchemaTypes.ObjectId,ref:'bussesstype'},
    introducer :{type:String}
},{
    timestamps:true,
})
module.exports = mongoose.model('student',schema) 
