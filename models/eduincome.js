const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    time:String,
    use:String,
    income_obj:{type:String},
    payee :String,
    actual_cost:Number,
    no_cost:Number,
    discounts:String,
    payment:String,
    remark:String
},{
    timestamps:true,
})
module.exports = mongoose.model('Eduincome',schema) 