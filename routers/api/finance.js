module.exports = app => {
    const express = require('express')
    const router = express.Router();
    const Recharge = require('../../models/recharge')

// 新增充值信息
router.post('/recharge', async (req, res) => {
    const result = await Recharge.create(req.body)
    res.json({
        code: 'success',
        msg: '添加成功',
        data: result
    })
})

//获取采购信息
    router.get('/recharge', 
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
        if(req.query.recharge_obj) { //模糊查询
            query.recharge_obj = new RegExp(req.query.recharge_obj, 'i')
        }
        const totalCount = await Recharge.find(query).count();//数据总条数
        const result = await  Recharge.find(query).sort({createdAt:-1})
        .limit(per).skip(per * (page - 1));
        res.json({
            totalCount,
            pages:Math.ceil(totalCount/per),
            data:result
        })
    })



//根据id查找
router.get('/recharge/:id',async(req,res)=>{
    const result = await Recharge.findById(req.params.id)
    res.json({
        code: 'success',
        data: result
    })
})

//修改业务类型
router.put('/recharge/:id',async(req,res)=>{
    try{
        const result = await Recharge.findByIdAndUpdate(req.params.id,req.body)
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
router.delete('/recharge/:id',async(req,res)=>{
    await Recharge.findByIdAndDelete(req.params.id)
    res.json({
        code: 'success',
        msg: '删除成功',
    })
})

    app.use('/api', router)
}
