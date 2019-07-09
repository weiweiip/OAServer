const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    time:String,
    use:String,
    pay_obj:{type:String},
    operator :String,
    approver:String,
    cost:Number,
    payment:String,
    collect_Obj:String,
    account:String,
    remark:String
},{
    timestamps:true,
})
module.exports = mongoose.model('Edupay',schema) 