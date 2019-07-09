const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    name:{type:String,},
    number:{type:Number,required:true},
    time:{type:String},
    company:{type:String},
    linkman:{type:String},
    phone:{type:String},
    amount_payable:{type:Number},
    amount_paid:{type:Number}
},{
    timestamps:true
})
module.exports = mongoose.model('Purchase',schema)