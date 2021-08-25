const path = require('path')
const fs = require('fs')
const Customer = require('../../model/lib/customer')
const Util = require('../../util')
module.exports = (router) => {
    /** 
     * 
     * 客户数据添加
     */
    router.post('/customer/add', async (ctx, next) => {
        let params = ctx.body || ctx.request.body
        // 查询
        let data = await Customer.findbyTel(params.tel)
        if (data) {
            Util.fail('该手机号已存在', ctx)
        }else{
            let res = await Customer.add(params.name,params.tel,params.address)
            if (res) {
                Util.success({}, ctx)
            } else {
                Util.fail('添加失败', ctx)
            }
        }
    })

    /** 
     * 
     * 客户数据查询
     */
     router.get('/customer/find', async (ctx, next) => {
        let data = await Customer.findAll()
        Util.success(data, ctx)
    })

    /** 
     * 
     * 根据id删除
     */
     router.post('/customer/delete/:id', async (ctx, next) => {
        let params = ctx.params || ctx.request.params
        let res = await Customer.deleteById(params.id)
        Util.success({}, ctx)
    })
}