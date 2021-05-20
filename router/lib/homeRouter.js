module.exports = (router) => {
    router.get('/', async (ctx,next) =>{
        ctx.body = 'hello jerry'
    })
}