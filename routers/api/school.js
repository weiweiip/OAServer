module.exports = app => {
    const express = require('express')
    const router = express.Router();
    const Schoolincome = require('../../models/school')
    const SchoolExpend = require('../../models/schoolpay')
    const Eduincome = require('../../models/eduincome')
    const Edupay = require('../../models/edupay')
// 新增学校收入信息
router.post('/schoolincome', async (req, res) => {
    const result = await Schoolincome.create(req.body)
    res.json({
        code: 'success',
        msg: '添加成功',
        data: result
    })
})

//获取学校收入信息
// router.get('/schoolincome', async (req, res) => {
//     var query = {}
//         if(req.query.name) { //模糊查询
//             query.name = new RegExp(req.query.name, 'i')
//         }
//     const result = await Schoolincome.find(query);
//     res.json({
//         code: 'success',
//         data: result
//     })
// })

   //校企合作信息
   router.get('/schoolincome', 
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
       const totalCount = await Schoolincome.find(query).count();//数据总条数
       const result = await Schoolincome.find(query).sort({createdAt:-1})
       .limit(per).skip(per * (page - 1));
       res.json({
           totalCount,
           pages:Math.ceil(totalCount/per),
           data:result
       })
   })

//根据id查找学校收入
router.get('/schoolincome/:id',async(req,res)=>{
    const result = await Schoolincome.findById(req.params.id)
    res.json({
        code: 'success',
        data: result
    })
})

//修改学校收入
router.put('/schoolincome/:id',async(req,res)=>{
    try{
        const result = await Schoolincome.findByIdAndUpdate(req.params.id,req.body)
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

//删除学校收入信息
router.delete('/schoolincome/:id',async(req,res)=>{
    await Schoolincome.findByIdAndDelete(req.params.id)
    res.json({
        code: 'success',
        msg: '删除成功',
    })
})

////////////////////////////////////////////////////////
///////////////////////////////////////////////////////
//学校支出

// 新增学校支出信息
router.post('/schoolexpend', async (req, res) => {
    const result = await SchoolExpend.create(req.body)
    res.json({
        code: 'success',
        msg: '添加成功',
        data: result
    })
})



//校企合作信息
router.get('/schoolexpend', 
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
    if(req.query.operator) { //模糊查询
        query.operator = new RegExp(req.query.operator, 'i')
    }
    if(req.query.payforman) { //模糊查询
        query.payforman = new RegExp(req.query.payforman, 'i')
    }
    const totalCount = await SchoolExpend.find(query).count();//数据总条数
    const result = await SchoolExpend.find(query).sort({createdAt:-1})
    .limit(per).skip(per * (page - 1));
    res.json({
        totalCount,
        pages:Math.ceil(totalCount/per),
        data:result
    })
})


//根据id查找学校支出信息
router.get('/schoolexpend/:id',async(req,res)=>{
    const result = await SchoolExpend.findById(req.params.id)
    res.json({
        code: 'success',
        data: result
    })
})

//修改学校支出信息
router.put('/schoolexpend/:id',async(req,res)=>{
    try{
        const result = await SchoolExpend.findByIdAndUpdate(req.params.id,req.body)
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

//删除学校支出信息
router.delete('/schoolexpend/:id',async(req,res)=>{
    await SchoolExpend.findByIdAndDelete(req.params.id)
    res.json({
        code: 'success',
        msg: '删除成功',
    })
})


////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
//学历部收入

router.post('/eduincome', async (req, res) => {
    const result = await Eduincome.create(req.body)
    res.json({
        code: 'success',
        msg: '添加成功',
        data: result
    })
})



//校企合作信息
router.get('/eduincome', 
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
    if(req.query.income_obj) { //模糊查询
        query.income_obj = new RegExp(req.query.income_obj, 'i')
    }
    const totalCount = await Eduincome.find(query).count();//数据总条数
    const result = await Eduincome.find(query).sort({createdAt:-1})
    .limit(per).skip(per * (page - 1));
    res.json({
        totalCount,
        pages:Math.ceil(totalCount/per),
        data:result
    })
})


//根据id查找学校支出信息
router.get('/eduincome/:id',async(req,res)=>{
    const result = await Eduincome.findById(req.params.id)
    res.json({
        code: 'success',
        data: result
    })
})

//修改学校支出信息
router.put('/eduincome/:id',async(req,res)=>{
    try{
        const result = await Eduincome.findByIdAndUpdate(req.params.id,req.body)
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

//删除学校支出信息
router.delete('/eduincome/:id',async(req,res)=>{
    await Eduincome.findByIdAndDelete(req.params.id)
    res.json({
        code: 'success',
        msg: '删除成功',
    })
})



////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
//学历部支出

router.post('/edupay', async (req, res) => {
    const result = await Edupay.create(req.body)
    res.json({
        code: 'success',
        msg: '添加成功',
        data: result
    })
})



//校企合作信息
router.get('/edupay', 
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
    if(req.query.pay_obj) { //模糊查询
        query.pay_obj = new RegExp(req.query.pay_obj, 'i')
    }
    const totalCount = await  Edupay.find(query).count();//数据总条数
    const result = await  Edupay.find(query).sort({createdAt:-1})
    .limit(per).skip(per * (page - 1));
    res.json({
        totalCount,
        pages:Math.ceil(totalCount/per),
        data:result
    })
})


//根据id查找学校支出信息
router.get('/edupay/:id',async(req,res)=>{
    const result = await  Edupay.findById(req.params.id)
    res.json({
        code: 'success',
        data: result
    })
})

//修改学校支出信息
router.put('/edupay/:id',async(req,res)=>{
    try{
        const result = await  Edupay.findByIdAndUpdate(req.params.id,req.body)
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

//删除学校支出信息
router.delete('/edupay/:id',async(req,res)=>{
    await  Edupay.findByIdAndDelete(req.params.id)
    res.json({
        code: 'success',
        msg: '删除成功',
    })
})



app.use('/api', router)
}


