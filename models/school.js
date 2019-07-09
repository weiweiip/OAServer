const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    time:{type:String,required:true},
    name:{type:String,required:true},
    phone:{type:String},
    wechat:{type:String},
    total_cost:{type:Number,required:true},
    actual_cost:{type:Number},
    nocompleted_cost:{type:Number},
    discounts:{type:Number},
    road_cost:{type:Number},
    payment_cost:{type:Number},
    payment_method:{type:String},
    origin:{type:String},
    remark:{type:String},
},{
    timestamps:true
})
module.exports = mongoose.model('School',schema) 