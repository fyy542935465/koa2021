const path = require('path')
const fs = require('fs')
const Admin = require('../../model/lib/admin')
const Util = require('../../util')
module.exports = (router) => {
    /** 
     * 
     * 添加管理员
     */
    router.post('/admin/add', async (ctx, next) => {
        let params = ctx.body || ctx.request.body
        // 查询
        let data = await Admin.findbyAccount(params.account)
        if (data) {
            Util.fail('该账号已存在', ctx)
        }else{
            let res = await Admin.add(params.account,params.password)
            if (res) {
                Util.success({}, ctx)
            } else {
                Util.fail('添加失败', ctx)
            }
        }
    })

    /** 
     * 
     * 管理员查询
     */
     router.get('/admin/find', async (ctx, next) => {
        let data = await Admin.findAll()
        Util.success(data, ctx)
    })
}