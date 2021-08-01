const path = require('path')
const fs = require('fs')
class Util{
    Util(){}
    success(obj,ctx){
        ctx.body = {
            status:'success',
            data:obj
        }
    }

    fail(err,ctx){
        ctx.body = {
            status:'fail',
            msg:err
        }
    }

    upload(ctx){
        let params = ctx.body || ctx.request.body
        const root = '/var/www/public/img'
        // 上传单个文件
        const file = ctx.request.files.file; // 获取上传文件
        if(file){
            // 创建可读流
            const reader = fs.createReadStream(file.path);
            let imgPath = `${new Date().getTime() + '.' + file.name.split('.')[1]}`
            let filePath = root + imgPath
            // 创建可写流
            const upStream = fs.createWriteStream(filePath);
            // 可读流通过管道写入可写流
            reader.pipe(upStream)
            return imgPath
        }else{
            return params.file
        }
        
    }
}

module.exports = new Util()