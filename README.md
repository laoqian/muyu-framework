#  muyu快速开发框架
    利用spring-boot构建后端，redis作为系统缓存，react构建前端，webpack为前端发布工具的项目管理系统。使用了nginx作为代理访问node服
    务器请求前端页面，其他所有的http请求均由nginx代理到springboot后端服务器
### 1、sprinboot启动
>server目录存放的springboot程序代码。按照一般maven项目启动即可。

### 2、client server启动
>cd  client 
>npm start

### 3、启动nginx
>cd nginx-1.11.4
>run

### 4、打开页面
>http://localhost:8090

## 目前服务端正在增加以下功能
 > * 单点登录       √
 > * redis缓存      √
 > * nginx反向代理  √
 > * 文件上传       *敬请期待*
 > * 流程引擎       *敬请期待*
 > * 规则殷勤       *敬请期待*

 
## 客户端增加以下功能
> * 用户登陆   √
> * 字典管理   √
> * 菜单管理   √
> * 用户管理   √
> * 机构管理   √
> * 角色管理   √
> * 权限管理   √
> * 流程编辑   *敬请期待*