const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    time:{type:String,required:true},
    recharge_obj:{type:String,required:true},
    phone:String,
    operator:String,
    approver:String,
    cost:Number,
    payment:String,
    account:String
},{
    timestamps:true
})

module.exports = mongoose.model('Recharge',schema) 