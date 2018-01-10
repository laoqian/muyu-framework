#  muyu开发框架
        利用spring-boot构建后端，redis作为系统缓存，react构建前端，webpack为前端发布工具的项目管理系统。
    使用了nginx作为代理访问node服务器请求前端页面，其他所有的http请求均由nginx代理到springboot后端服务器
        目前由于个人精力有限，暂时未提供发布生产环境方式。可以自行编译前端js后，统一使用maven打包合并为一个
    项目发布，提高访问效率。
        本项目使用的前端组件均为antd组件，再此表示感谢。
    
### 1、sprinboot启动
>server目录存放的springboot程序代码。按照一般maven项目启动即可。

### 2、client server启动
>cd  client &&
>npm start

### 3、启动nginx
>cd nginx-1.11.4
>&& run

### 4、打开页面
>http://localhost:8090

## 目前服务端正在增加以下功能
 > * 单点登录       √
 > * redis缓存      √
 > * nginx反向代理  √
 > * 文件上传       √
 > * 流程引擎       √
 > * 规则殷勤       *敬请期待*
 > * webSocket服务端     √
 
## 客户端增加以下功能
> * 用户登陆   √
> * 字典管理   √
> * 菜单管理   √
> * 用户管理   √
> * 机构管理   √
> * 角色管理   √
> * 权限管理   √
> * 流程编辑   √
> * webSocket客户端   √