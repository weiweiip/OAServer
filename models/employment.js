const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name:{type:mongoose.SchemaTypes.ObjectId,ref:'student'},
    phone:{type:String},
    wechat:{type:String},
    salary:String,
    company:String,
    area:String,
    graduate_time:String,
    entry_time:String,
    names:String
},{
    timestamps:true,
})
module.exports = mongoose.model('Employment',schema) 