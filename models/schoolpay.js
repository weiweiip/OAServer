const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    time:{type:String,required:true},
    use:String,
    payforman:String,
    operator:String,
    approver:String,
    cost:{type:Number,required:true},
    payment_method:String,
    collection_obj:String,
    account:String,
    imprest:Number,
    remark:String
},{
    timestamps:true
})

module.exports = mongoose.model('Schoolpay',schema) 
