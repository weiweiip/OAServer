const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
const User = require('./models/user')
//链接数据库
require('./db')(app)
//允许跨域
app.use(require('cors')())
//识别客户端提交过来的json
app.use(express.json())
require('./routers/api/user')(app)
app.all('*',async(req,res,next)=>{
  
        const token = String(req.headers.authorization || '').split(' ').pop()
        console.log(token)
       if(token.length<=6){

           return res.status(401).send({
               message:'请先登录'
           })
          
       }
        const {id} = jwt.verify(token,'asdfgwgh')
        req.user = await User.findById(id)
        if(!req.user){
            return res.status(401).send({
                message:'请先登录'
            })
        }
        await next()
    
})



require('./routers/api/student')(app)
require('./routers/api/school')(app)
require('./routers/api/purchase')(app)
require('./routers/api/company')(app)
require('./routers/api/finance')(app)



app.listen(3009,()=>{
    console.log('http://localhost:3009/')
})