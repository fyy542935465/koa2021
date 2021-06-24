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
}

module.exports = new Util()