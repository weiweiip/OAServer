const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    typename:{type:String, required:true},
    parentId:{type:String}
})
module.exports = mongoose.model('bussesstype',schema);