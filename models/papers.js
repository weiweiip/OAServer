const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    certificate:{type:String,required:true},
   department:String,
   number:Number,
   price:Number,
   feedback:Number,
   time:String,
   remark:String,
   company:{type:mongoose.SchemaTypes.ObjectId,ref:'company'}
},{
    timestamps:true,
})
module.exports = mongoose.model('Papers',schema) 