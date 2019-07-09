module.exports = app => {
    const express = require('express')
    const router = express.Router();
    const assert = require("http-assert")
    const User = require('../../models/user')

    router.post('/user',async(req,res)=>{
        const result = await User.create(req.body)
        res.json({
            code:'success',
            msg:'添加成功',
            data:result
        })
    })
    router.delete('/user/:id',async(req,res)=>{
        await User.findByIdAndDelete(req.params.id)
        res.json({
            code: 'success',
            msg: '删除成功',
        })
    })

router.put('/user/:id',async(req,res)=>{
    try{
        const result = await User.findByIdAndUpdate(req.params.id,req.body)
        res.json({
            code:'success',
            msg: '修改成功',
        })
    }
    catch(err){
        res.json({
            code:'error',
            msg:err
        })
    }
})

    router.post('/login',async(req,res)=>{
        const{name,password} = req.body
        //1，根据用户名找用户
        const user = await User.findOne({name}).select('+password')
        if(!user){
            return res.status(422).send({
                message:'用户不存在'
            })
        }
        //校验密码
        const isValid = require('bcrypt').compareSync(password,user.password)
        if(!isValid){
            return res.status(422).send({
                message:'密码错误'
            })
        }

        //返回token 
        const jwt = require('jsonwebtoken')
        const token = jwt.sign({id:user._id},'asdfgwgh')
        res.send({token})
    })
    

    router.get('/user',async(req,res)=>{
        const result = await User.find()
        res.json({
            data:result
        })
    })

    router.delete('/user/:id',async(req,res)=>{
        await User.findByIdAndDelete(req.params.id)
        res.json({
            code: 'success',
        msg: '删除成功',
        })
    })


    app.use('/api', router)
}