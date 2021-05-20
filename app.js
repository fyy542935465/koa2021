const Koa = require('koa')
const path = require('path')
const static = require('koa-static')
const koaBody = require('koa-body')
const app = new Koa()
/**
 * 静态资源目录
 */
const staticPath = './static'
app.use(static(
    path.join(__dirname, staticPath)
))

/**
 * 使用ctx.body解析中间件
 */
app.use(koaBody({
    multipart: true,
    formidable: {
        maxFileSize: 200 * 1024 * 1024 // 设置上传文件大小最大限制，默认2M
    }
}))

/**
 * 中间件
 */
require('./middleware')(app)

/**
 * router
 */
require('./router')(app)

app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
})