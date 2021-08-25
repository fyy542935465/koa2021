const path = require('path')
const fs = require('fs')
const User = require('../../model/lib/sign')
const Util = require('../../util')
module.exports = (router) => {
    /** 
     * 
     * 登录
     */
    router.post('/sign', async (ctx, next) => {
        let params = ctx.body || ctx.request.body
        // 查询
        let data = await User.find(params.account)
        if (data) {
            if(data.password === params.password){
                Util.success({
                    id:data.id,
                    account:data.account
                }, ctx)
            }else{
                Util.fail('密码错误', ctx)
            }
        }else{
            Util.fail('账号不存在', ctx)
        }
    })

    /** 
     * 
     * 注册管理员
     */
     router.post('/register', async (ctx, next) => {
        let params = ctx.body || ctx.request.body
        // 查询
        let data = await User.find(params.account)
        if (data) {
            if(data.password === params.password){
                Util.success({
                    id:data.id,
                    account:data.account
                }, ctx)
            }else{
                Util.fail('密码错误', ctx)
            }
        }else{
            Util.fail('账号不存在', ctx)
        }
    })
}