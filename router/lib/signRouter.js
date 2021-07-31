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
     * 文件上传
     */
    router.post('/upload', async (ctx, next) => {
        const root = '/var/www/public/img'
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