const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    name:{type:String,require:true},
    password:{type:String,
        require:true,
        set(val){
            return require('bcrypt').hashSync(val,10)
        }},

  
},{
    timestamps:true,
})
module.exports = mongoose.model('User',schema)