const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    originname:{type:String,require:true}
},{
    timestamps:true,
})
module.exports = mongoose.model('stuorign',schema)