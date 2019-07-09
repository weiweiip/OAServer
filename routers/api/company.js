module.exports = app => {
    const express = require('express')
    const router = express.Router();
    const Company = require('../../models/company')
    const Papers = require('../../models/papers')
    const Teamwork = require('../../models/teamwork')

    // 新增企业信息
router.post('/company', async (req, res) => {
    const result = await Company.create(req.body)
    res.json({
        code: 'success',
        msg: '添加成功',
        data: result
    })
})

//获取企业信息
router.get('/company', async (req, res) => {
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
    const totalCount = await Company.find(query).count();//数据总条数
    const result = await Company.find(query).sort({createdAt:-1})
    .limit(per).skip(per * (page - 1));
    res.json({
        totalCount,
        pages:Math.ceil(totalCount/per),
        data:result
    })
})




//根据id查找
router.get('/company/:id',async(req,res)=>{
    const result = await Company.findById(req.params.id)
    res.json({
        code: 'success',
        data: result
    })
})

//修改业务类型
router.put('/company/:id',async(req,res)=>{
    try{
        const result = await Company.findByIdAndUpdate(req.params.id,req.body)
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

//删除企业信息
router.delete('/company/:id',async(req,res)=>{
    await Company.findByIdAndDelete(req.params.id)
    res.json({
        code: 'success',
        msg: '删除成功',
    })
})


///////////////////////////////////////////
/////////////////////////////////////////////
//企业考证
   //获取学员信息
   router.get('/papers', 
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
       if(req.query.certificate) { //模糊查询
           query.certificate = new RegExp(req.query.certificate, 'i')
       }
       const totalCount = await Papers.find(query).count();//数据总条数
       const result = await Papers.find(query).populate('company').sort({createdAt:-1})
       .limit(per).skip(per * (page - 1));
       res.json({
           totalCount,
           pages:Math.ceil(totalCount/per),
           data:result
       })
   })


   
    // 新增考证信息
router.post('/papers', async (req, res) => {
    const result = await Papers.create(req.body)
    res.json({
        code: 'success',
        msg: '添加成功',
        data: result
    })
})

//修改业务类型
router.put('/papers/:id',async(req,res)=>{
    try{
        const result = await Papers.findByIdAndUpdate(req.params.id,req.body)
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

//删除企业信息
router.delete('/papers/:id',async(req,res)=>{
    await Papers.findByIdAndDelete(req.params.id)
    res.json({
        code: 'success',
        msg: '删除成功',
    })
})

    //根据企业获取考证信息
    router.get('/paper/:id',async(req,res)=>{
        var query = {company:req.params.id}
        const result = await Papers.find(query).populate('company'
        )
        res.json({
            code: 'success',
            data: result
        })
    })
    router.get('/papers/:id',async(req,res)=>{
        const result = await Papers.findById(req.params.id)
        res.json({
            code: 'success',
            data: result
        })
    })

    ////////////////////////////////////////////////
    ///////////////////////////////////////////////
    
   //校企合作信息
   router.get('/teamwork', 
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
       if(req.query.name) { //模糊查询
           query.name = new RegExp(req.query.name, 'i')
       }
       const totalCount = await Teamwork.find(query).count();//数据总条数
       const result = await Teamwork.find(query).sort({createdAt:-1})
       .limit(per).skip(per * (page - 1));
       res.json({
           totalCount,
           pages:Math.ceil(totalCount/per),
           data:result
       })
   })


   
    // 新增校企合作信息
router.post('/teamwork', async (req, res) => {
    const result = await Teamwork.create(req.body)
    res.json({
        code: 'success',
        msg: '添加成功',
        data: result
    })
})

//修改校企合作信息
router.put('/teamwork/:id',async(req,res)=>{
    try{
        const result = await Teamwork.findByIdAndUpdate(req.params.id,req.body)
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

//删除校企合作信息
router.delete('/teamwork/:id',async(req,res)=>{
    await Teamwork.findByIdAndDelete(req.params.id)
    res.json({
        code: 'success',
        msg: '删除成功',
    })
})

    router.get('/teamwork/:id',async(req,res)=>{
        const result = await Teamwork.findById(req.params.id)
        res.json({
            code: 'success',
            data: result
        })
    })



   app.use('/api', router)
}