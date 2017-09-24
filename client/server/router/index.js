/**
 * Created by yu on 2016/1/25.
 */
let server = {};
let path = require('path');
const proxy = require('http-proxy-middleware');//引入代理中间件

const apiProxy = proxy('/api', { target: 'http://192.168.2.222:9999',changeOrigin: true,logLevel:'debug' });//将服务器代理到localhost:8080端口上[本地服务器为localhost:3000]
//api子目录下的都是用代理

exports = module.exports = function router_init(app){

  server = app;

  app.get('/',()=>path.join(__dirname,'../static/index.html'));
  app.use('/api/*', apiProxy);
}
















