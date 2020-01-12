React服务器端渲染之Typescript+Next.js实战 - 2019.12.29

https://ke.qq.com/course/367589

需要安装的依赖；
typescript react @types/react react-dom @types/node next axios @zeit/next-css antd babel-plugin-import koa koa-router redux react-redux express body-parser cors express-session connect-mongo mongoose

头条考的算法占1/3

nuxt next nest

nest+graphql微服务训练营（4天）

同构
同一套代码既可以跑在服务端，也可以跑在客户端

客户端渲染(CSR Client Side Render)
客户端访问服务端
服务端返回空HTML结构，JS脚本
客户端调用接口结构服务器接口数据
服务端接口数据返回

服务端渲染
客户端访问路由 /user
服务端先获取数据，比如查询数据库或者调用其它接口服务来获取数据。然后渲染出HTML数据

初始化
创建项目

mkdir nextdemo
cd nextdemo
npm init -y

yarn add --dev typescript react @types/react reac-dom @types/node axios next 

Next.js是约定大于配置的, 约定式路由，页面创建在/pages目录下

页面文件结构就是路由结构

从零写，没用脚手架

axios既可以在客户端运行，也可以在服务端运行，所以很适合做服务端渲染

支持路由懒加载，相当于根据访问的路由载入对应的页面文件，而不是一下子全部载入

静态资源映射目录: public

^是大版本号的锁定

next-dev.d.ts
安装typescript就会自动生成tsconfig.ts

public和pages有同样文件（路径冲突）的时候路由是优先那个资源呢?
public有限

安装样式支持插件
less @zeit/next-css antd babel-plugin-import

新建next.config.js
const withCSS = require('@zeit/next-css');
module.exports = withCSS({});

if(typeof require !== 'undefined') {
	require.extensions
}

页面文件不需要在引入react，因为内部处理了

全局布局组件
_app.tsx 这是定死的

// Component就是pages下的组件
const { Component } = this.props;

computed选项栏可以查看对应的样式

css in js
styled-jsx，生成独立作用域的css
https://github.com/zeit/styled-jsx
<style jsx>
{
    `a{display: inline-block;}`
}
</style>

添加img,默认相对于/public目录
<img src="/images/jglogo.png" />

路由跳转：
(1)标签式跳转
import Link from 'next/link';
<Link href="/profile"><a>profile</a></Link>
注意：Link标签里面要加个标签包一下,因为它只是监听了我们指定内容的click 事件，然后跳转到指定的路径

(2)函数式
import router from 'next/router';
router.push('/profile');

高阶组件，包装成路由组件
import { withRouter } from 'next/router'

withRouter(XXX)
这样就可以获取当前路由路径
props.router.pathname

支持css、less、sass、Stylus

定义UserLayout组件

import UserLayout from './index.tsx' -> import UserLayout from './';

Link只能通过query传参

获取此组件的初始化属性对象
UserList.getInitialProps = async () => {
	return {data: {}}
}

在组件中通过props.data来获取

如果重写了_app.tsx页面组件

则子组件中如果使用了getInitiaProps，就需要在_app.tsx中在重写getInitialProps
static async getInitialProps {}

集成koa
yarn add koa koa-router

相当于由koa来启动客户端页面

新建目录 client/index.js

handler是一个处理函数

客户端 -> KOA -> nextJS -> 客户端

koa处理
server.use(router.routes());

koa如果处理不了就交给nextJS处理
server.use(async (ctx, next) => {
    await handler(ctx.req, ctx.res);
});


封装axios

将session放到mongoose中

模块懒加载和组件懒加载
在根目录下新建个component/UserInfo组件

组件懒加载
import dynamic from 'next/dynamic';
const UserInfo = dynamic(import('xxx'))

模块懒加载
async functiin fn(){
    const moment = await import('moment');
}

添加登录功能
根目录添加login.tsx组件

集成redux
难点在于客户端和服务端的同步

安装：
yarn add redux

根目录下新建store目录

为什么要导出一个函数
一般来说我们的仓库只有一份，这个代码会在服务器端执行。
每个客户端访问服务器的时候，都要创建一个新的仓库(服务端)

exportdefault function(initState){
    return createStore(initialState, reducer);
}

如果是在服务器端运行的，那么直接创建新仓库返回
如果是在客户端执行的，第一次会创建新仓库，以后就直接复用老仓库

koa或者客户端的cookie需要同步给api服务器

构造函数App只会在客户端执行一次，LayoutApp只会初始化一次

刷新后登陆用户信息还在，因为服务端重新获取了,然后同步发送给客户端

数据脱水(服务端)数据吸水(客户端)

添加loading效果

监听路由变化,变化前到变化完成的过程添加loading效果
router.events.on('routeChangeStart') -> loading: true
router.events.on('routeChangeComplete') -> loading false

受保护组件，没登录不能显示
服务端和客户端都要做打回到登录页的逻辑

SEO
创建title和keywords、description
<title>我是title</title>
<meta name="keywords" content=""></meta>
<meta name="description" content=""></meta>

服务端创建个仓库，然后序列化数据发送给客户端，客户端重新创建store, 并且传入反序列化后的数据

执行顺序
constructor(负责创建store) > getInitProps(获取store)

服务端是每一个登录用户都重新创建store

创建_document.js: 可以用来配置源代码的内容，比如可以用来提前插入外联资源标签

服务端的计算压力会大点

SEO的内容可以写在_document.js、LayoutApp或者页面中

React SSR 文章：
React SSR 详解【近 1W 字】+ 2个项目实战
https://juejin.im/post/5def0816f265da33aa6aa7fe

React Hooks 详解 【近 1W 字】+ 项目实战:
https://juejin.im/post/5dbbdbd5f265da4d4b5fe57d

从 0 到 1 实现一款简易版 Webpack:
https://juejin.im/post/5da56e34f265da5b932e73fa

TODO:
自己手写一遍代码，放到 code_james 目录中
