const withCSS = require('@zeit/next-css');
if (typeof require !== 'undefined') {//服务器端环境
    //extensions扩展名 node针对不同的文件类型有不同的加载方式 js json .node .css
    require.extensions['.css'] = file => { }
}
module.exports = withCSS({});