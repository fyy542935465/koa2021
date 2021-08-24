const User = require('../model/lib/sign')
const Util = require('../util')
module.exports = (app) => {
    app.use(async (ctx,next) => {
        if(ctx.originalUrl != '/sign' && ctx.headers.authorization){
            let data = await User.findById(ctx.headers.authorization)
            if(data){
                await next()
            }else{
                Util.fail('非法获取', ctx)
            }
        }else{
            Util.fail('非法获取', ctx)
        }
        
    })
}