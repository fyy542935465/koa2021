const Router = require('koa-router')
const router = new Router()

module.exports = (app) => {
    require('./lib/homeRouter')(router)
    app.use(router.routes())
    .use(router.allowedMethods())
}