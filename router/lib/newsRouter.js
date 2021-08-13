const path = require('path')
const News = require('../../model/lib/news')
const Util = require('../../util')
module.exports = (router) => {
    /** 
     * 
     * 添加/编辑新闻
     */
    router.post('/news/save', async (ctx, next) => {
        let params = ctx.body || ctx.request.body
        let imgPath = Util.upload(ctx,ctx.request.files.imgFile)
        let videoPath = ""
        if(ctx.request.files.videoFile){
            videoPath = Util.upload(ctx,ctx.request.files.videoFile)
        }
        // 编辑
        if (params.id) {
            let data = await News.update(params.id, imgPath,videoPath,params.title,params.content)
            if (data) {
                Util.success({}, ctx)
            } else {
                Util.fail('保存失败', ctx)
            }
        } else { //添加
            let data = await News.add(imgPath, videoPath,params.title,params.content)
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
    router.get('/news/find', async (ctx, next) => {
        let res = await News.find()
        Util.success(res, ctx)
    })

    /** 
     * 
     * 根据id查询
     */
    router.get('/news/findByid/:id', async (ctx, next) => {
        let params = ctx.params || ctx.request.params
        let res = await News.findById(params.id)
        Util.success(res, ctx)
    })

    /** 
     * 
     * 根据id删除
     */
     router.post('/news/delete/:id', async (ctx, next) => {
        let params = ctx.params || ctx.request.params
        let res = await News.deleteById(params.id)
        Util.success({}, ctx)
    })
}