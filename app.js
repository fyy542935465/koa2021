const Koa = require('koa')
const path = require('path')
const static = require('koa-static')
const koaBody = require('koa-body')
const cors = require('koa2-cors');
const app = new Koa()
/**
 * 静态资源目录
 */
const staticPath = './client-management/dist/'
app.use(static(
    path.join(__dirname, staticPath)
))

/**
 * 使用ctx.body解析中间件
 */
app.use(koaBody({
    jsonLimit: '50mb',
    formLimit: '50mb',
    multipart: true,
    queryString: {
        arrayLimit: 10000, //数组
        parameterLimit: 100000000000000
    },
    formidable: {
        //   uploadDir: Path.join(__dirname, '../uploads'),
        keepExtensions: true
    },
    onerror: function (err, ctx) {
        ctx.throw('body parse error', 422);
    }
}))

/**
 * 中间件
 */
require('./middleware')(app)
app.use(cors());

/**
 * router
 */
require('./router')(app)

app.listen(9800, () => {
    console.log('Server started on http://localhost:9800');
})