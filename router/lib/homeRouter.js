const path = require('path')
const fs = require('fs')
const User = require('../../model/index')
const Util = require('../../util')
module.exports = (router) => {
    /** 
     * 
     * 添加客户
     */
    router.post('/addUser', async (ctx, next) => {
        let params = ctx.body || ctx.request.body
        // 判断手机号是否已存在
        let data = await User.findByTel(params.tel)
        if (data) {
            Util.fail('手机号已存在，请确认', ctx)
            return
        }

        // 添加客户
        let res = await User.addUser(params.userName, params.tel)
        if (res.id) {
            Util.success({}, ctx)
        } else {
            Util.fail('添加失败', ctx)
        }
    })

    /** 
     * 
     * 查询所有客户
     */
    router.get('/find', async (ctx, next) => {
        let res = await User.findAll()
        if (res) {
            Util.success(res, ctx)
        } else {
            Util.fail('查询失败', ctx)
        }
    })

    /** 
     * 
     * 文件上传
     */
    router.post('/upload', async (ctx, next) => {
        const root = '/var/www/public/upload/img/'
        // 上传单个文件
        const file = ctx.request.files.file; // 获取上传文件
        // 创建可读流
        const reader = fs.createReadStream(file.path);
        let filePath = root + `/${file.name}`;
        console.log(filePath)
        // 创建可写流
        const upStream = fs.createWriteStream(filePath);
        // 可读流通过管道写入可写流
        try{
            reader.pipe(upStream);
            Util.success({}, ctx)
        }catch(err){
            Util.fail('文件上传失败', ctx)
        }
        
    })
}