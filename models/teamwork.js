const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    name:{type:String,require:true},
    linkman:String,
    phone:String,
    number:Number,
    return_money:Number,
    date:String
},{
    timestamps:true,
})
module.exports = mongoose.model('teamwork',schema)