let koa = require('koa');
let Router = require('koa-router');
let next = require('next');
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
//handler是一个处理函数，我们可以我们的请求和响应传递给它，由它来进行最后的响应，渲染组件
const handler = app.getRequestHandler();
app.prepare().then(() => {
    const server = new koa();
    let router = new Router();
    //一会我们会在这里定义路由
    server.use(router.routes());
    server.use(async (ctx, next) => {
        await handler(ctx.req, ctx.res);
        ctx.response = false;
    });
    server.listen(3000, () => console.log('Next.js服务器已经在3000进行启动'));
});