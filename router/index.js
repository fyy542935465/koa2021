const Router = require('koa-router')
const router = new Router()

module.exports = (app) => {
    require('./lib/signRouter')(router)
    require('./lib/aboutRouter')(router)
    require('./lib/customerRouter')(router)
    require('./lib/productRouter')(router)
    require('./lib/newsRouter')(router)
    app.use(router.routes())
    .use(router.allowedMethods())
}