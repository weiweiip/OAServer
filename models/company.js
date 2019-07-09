const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name:String,
    linkman:String,
    phone:String,
    invoice_title:String,
    invoice_number:String
},{
    timestamps:true,
})
//企业考证
// const schemas = new mongoose.Schema({
//     name:String,
//     linkman:String,
//     phone:String,
//     invoice_title:String,
//     invoice_number:String
// },{
//     timestamps:true,
// })
module.exports = mongoose.model('company',schema)
// module.exports = mongoose.model('Certificate',schemas)