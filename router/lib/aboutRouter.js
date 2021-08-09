const path = require('path')
const fs = require('fs')
const About = require('../../model/lib/about')
const Util = require('../../util')
module.exports = (router) => {
    /** 
     * 
     * 保存
     */
    router.post('/about/save', async (ctx, next) => {
        let params = ctx.body || ctx.request.body
        let res = await About.find()
        if(res.length){
            let data = await About.update(res.id,params.title, params.content)
            if (data) {
                Util.success({}, ctx)
            } else {
                Util.fail('保存失败', ctx)
            }
        }else{
            let data = await About.add(params.title, params.content)
            if (data) {
                Util.success({}, ctx)
            } else {
                Util.fail('保存失败', ctx)
            }
        }
        
    })

    /** 
     * 
     * 查询
     */
    router.get('/about/find', async (ctx, next) => {
        let res = await About.find()
        Util.success(res, ctx)
    })
}