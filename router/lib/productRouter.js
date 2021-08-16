const path = require('path')
const Product = require('../../model/lib/product')
const Util = require('../../util')
module.exports = (router) => {
    /** 
     * 
     * 添加/编辑产品
     */
    router.post('/product/save', async (ctx, next) => {
        let params = ctx.body || ctx.request.body
        let filePath = Util.upload(ctx,ctx.request.files.imgFile)
        // 编辑
        if (params.id) {
            let data = await Product.update(params.id, filePath, params.title,params.content)
            if (data) {
                Util.success({}, ctx)
            } else {
                Util.fail('保存失败', ctx)
            }
        } else { //添加
            let data = await Product.add(filePath, params.title,params.content)
            if (data) {
                Util.success({}, ctx)
            } else {
                Util.fail('保存失败', ctx)
            }
        }
    })

    /** 
     * 
     * 查询所有
     */
    router.get('/product/find', async (ctx, next) => {
        let res = await Product.find()
        Util.success(res, ctx)
    })

    /** 
     * 
     * 根据id查询
     */
    router.get('/product/findByid/:id', async (ctx, next) => {
        let params = ctx.params || ctx.request.params
        let res = await Product.findById(params.id)
        Util.success(res, ctx)
    })

    /** 
     * 
     * 根据id删除
     */
     router.post('/product/delete/:id', async (ctx, next) => {
        let params = ctx.params || ctx.request.params
        let res = await Product.deleteById(params.id)
        Util.success({}, ctx)
    })
}