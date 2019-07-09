module.exports = app => {
    const express = require('express')
    const router = express.Router();
    const Purchase = require('../../models/purchase')
    const Employment = require('../../models/employment')
// 新增采购信息
router.post('/purchase', async (req, res) => {
    const result = await Purchase.create(req.body)
    res.json({
        code: 'success',
        msg: '添加成功',
        data: result
    })
})

//获取采购信息
router.get('/purchase', async (req, res) => {
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
        if(req.query.linkman) { //模糊查询
            query.linkman = new RegExp(req.query.linkman, 'i')
        }
    const totalCount = await Purchase.find(query).count();//数据总条数
    const result = await Purchase.find(query).sort({createdAt:-1})
    .limit(per).skip(per * (page - 1));
    res.json({
        totalCount,
        pages:Math.ceil(totalCount/per),
        data:result
    })
})




//根据id查找
router.get('/purchase/:id',async(req,res)=>{
    const result = await Purchase.findById(req.params.id)
    res.json({
        code: 'success',
        data: result
    })
})

//修改业务类型
router.put('/purchase/:id',async(req,res)=>{
    try{
        const result = await Purchase.findByIdAndUpdate(req.params.id,req.body)
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

//删除采购信息
router.delete('/purchase/:id',async(req,res)=>{
    await Purchase.findByIdAndDelete(req.params.id)
    res.json({
        code: 'success',
        msg: '删除成功',
    })
})



    app.use('/api', router)
}


