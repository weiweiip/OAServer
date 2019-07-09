module.exports = app => {
    const express = require('express')
    const router = express.Router();
    const Student = require('../../models/student')
    const StuOrigin = require('../../models/stuOrigin')
    const BussessType = require('../../models/bussessType')
    const Employment = require('../../models/employment')
    const User = require('../../models/user')
    const jwt = require('jsonwebtoken')
    router.get('/', (req, res) => {
        res.send('index')
    })

    // 新增学员信息
    router.post('/stu', async (req, res) => {
        const stu = await Student.create(req.body)
        res.send(stu)
        res.json({
            code: 'success',
            msg: '添加成功',
            data: stu
        })
    })

    //获取学员信息
    router.get('/stu', 
    async (req, res) => {
        console.log(req.user)
        const per = req.query.per*1 || 10;
        const page = req.query.page * 1 || 1;
        if(page<= 0){
            page = 1;
        }
        if(per <=0){
            per = 10;
        }
        var query = {}
        if(req.query.name) { //模糊查询
            query.name = new RegExp(req.query.name, 'i')
        }
        const totalCount = await Student.find(query).count();//数据总条数
        const result = await Student.find(query).populate('origin').populate('activity').sort({createdAt:-1})
        .limit(per).skip(per * (page - 1));
        res.json({
            totalCount,
            pages:Math.ceil(totalCount/per),
            data:result
        })
    })

    // router.get('/stus',
    // async(req,res)=>{
    //         const result = await Student.find().populate({
    //             path:'origin',
    //             select:"_id",
    //         })
    //         res.json({
    //             code: 'success',
    //             data: result
    //         })
    //     }
        
 
    // )

    //根据id获取学员信息
    router.get('/stu/:id',async(req,res)=>{
        const result = await Student.findById(req.params.id)
        res.json({
            code: 'success',
            data: result
        })
    })
    //根据生源类型获取学员信息
    router.get('/stus/:id',async(req,res)=>{
        const per = req.query.per*1 || 10;
        const page = req.query.page * 1 || 1;
        if(page<= 0){
            page = 1;
        }
        if(per <=0){
            per = 10;
        }
        var query = {origin:req.params.id}
        if(req.query.name) { //模糊查询
            query.name = new RegExp(req.query.name, 'i')
        }
        const totalCount = await Student.find(query).populate('origin').count();
        const result = await Student.find(query).populate(
            'origin'
            // {path:'origin',
            // match:{_id:req.params.id}
        // }
        ).sort({createdAt:-1}).limit(per).skip(per * (page - 1));
        res.json({
            code: 'success',
            totalCount,
            pages:Math.ceil(totalCount/per),
            data: result
        })
    })


    //删除学员信息
    router.delete('/stu/:id',async(req,res)=>{
        await Student.findByIdAndDelete(req.params.id)
        res.json({
            code: 'success',
            msg: '删除成功',
        })
    })

    //修改学员信息
    router.put('/stu/:id',async(req,res)=>{
        try{
            const result = await Student.findByIdAndUpdate(req.params.id,req.body)
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

    //新增学生来源信息
    router.post('/stuorigin', async (req, res) => {
        const result = await StuOrigin.create(req.body)
        res.json({
            code: 'success',
            msg: '添加成功',
            data: result
        })
    })

    //获取学生来源信息
    router.get('/stuorigin', async (req, res) => {
        const result = await StuOrigin.find()
        res.json({
            code: 'success',
            data: result
        })
    })

     //修改学生来源信息
     router.put('/stuorigin/:id',async(req,res)=>{
        try{
            const result = await StuOrigin.findByIdAndUpdate(req.params.id,req.body)
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

        //删除学生来源信息
       router.delete('/stuorigin/:id',async(req,res)=>{
        await StuOrigin.findByIdAndDelete(req.params.id)
        res.json({
            code: 'success',
            msg: '删除成功',
        })
    })

   // 新增业务类型
    router.post('/activity',async(req,res)=>{
        const result = await BussessType.create(req.body)
        res.json({
            code:'success',
            msg:'添加成功',
            data:result
        })
    })
    //获取业务类型
    router.get('/activity',async(req,res)=>{
        const result = await BussessType.find()
        res.json({
            code:'success',
            msg:'数据获取成功',
            data:result
        })
    })

    //修改业务类型
    router.put('/activity/:id',async(req,res)=>{
        try{
            const result = await BussessType.findByIdAndUpdate(req.params.id,req.body)
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

        //删除业务类型
       router.delete('/activity/:id',async(req,res)=>{
        await BussessType.findByIdAndDelete(req.params.id)
        res.json({
            code: 'success',
            msg: '删除成功',
        })
    })

    //根据id获取业务信息
    router.get('/activity/:id',async(req,res)=>{
        const result = await BussessType.findById(req.params.id)
        res.json({
            code: 'success',
            data: result
        })
    })

    //根据业务类型获取学员信息
    router.get('/activitys/:id',async(req,res)=>{
        const per = req.query.per*1 || 10;
        const page = req.query.page * 1 || 1;
        if(page<= 0){
            page = 1;
        }
        if(per <=0){
            per = 10;
        }
        var query = {activity:req.params.id}
        if(req.query.name) { //模糊查询
            query.name = new RegExp(req.query.name, 'i')
        }
        const totalCount = await Student.find(query).populate('activity').count();
        const result = await Student.find(query).populate('activity').sort({createdAt:-1}).limit(per).skip(per * (page - 1));
        res.json({
            code: 'success',
            totalCount,
            pages:Math.ceil(totalCount/per),
            data: result
        })
    })

    //根据一级业务类型获取学员信息
    // router.get('/activityss/:id',async(req,res)=>{
       
    //     res.json({
    //         code: 'success',
    //         data: result
    //     })
    // })


    ///////////////////////////////////////////////
//////////////////////////////////////////////
//就业信息
router.post('/employment',async(req,res)=>{
    const result = await Employment.create(req.body)
    res.json({
        code: 'success',
        msg: '添加成功',
        data: result
    })
})
//获取就业信息
// router.get('/employment', async (req, res) => {
//     const result = await Employment.find().populate('name');
//     res.json({
//         code: 'success',
//         data: result
//     })
// })

//获取就业信息
router.get('/employment', 
async (req, res) => {
    const per = req.query.per*1 || 10;
    const page = req.query.page * 1 || 1;
    if(page<= 0){
        page = 1;
    }
    if(per <=0){
        per = 10;
    }
    var query = {}
    if(req.query.names) { //模糊查询
        query.names = new RegExp(req.query.names, 'i')
    }
    const totalCount = await Employment.find(query).count();//数据总条数
    const result = await Employment.find(query).populate('name').sort({createdAt:-1})
    .limit(per).skip(per * (page - 1));
    res.json({
        totalCount,
        pages:Math.ceil(totalCount/per),
        data:result
    })
})


//删除就业信息
router.delete('/employment/:id',async(req,res)=>{
    await Employment.findByIdAndDelete(req.params.id)
    res.json({
        code: 'success',
        msg: '删除成功',
    })
})
 //修改就业类型
 router.put('/employment/:id',async(req,res)=>{
    try{
        const result = await Employment.findByIdAndUpdate(req.params.id,req.body)
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


    //根据就业信息获取学员信息
    router.get('/employments/:id',async(req,res)=>{
        var query = {name:req.params.id}
        const result = await Employment.find(query).populate('origin'
        )
        res.json({
            code: 'success',
            data: result
        })
    })

    //根据id查询就业信息
    router.get('/employment/:id',async(req,res)=>{
        const result = await Employment.findById(req.params.id)
        res.json({
            code: 'success',
            data: result
        })
    })   




    app.use('/api', router)
    app.use(async(err,req,res,next)=>{
        //如果err中没有statusCode则会报错，这里加上一个500容错
        res.status(err.statusCode || 500).send({
            message:err.message
        })
    })
}