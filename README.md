READEME格式参考：https://help.github.com/cn/github/writing-on-github/getting-started-with-writing-and-formatting-on-github  
高级格式：https://help.github.com/cn/github/writing-on-github/working-with-advanced-formatting  
# Graduation_Project
Graduation project of DJTU 2020

## 本地文件结构
views:代渲染视图文件  
public：静态资源  
node_modules:npm插件  

## 路由设计  
| 路由 | 方法 | get参数 | post参数 | 是否需要登录 | 备注 |
| --- | --- | --- | --- | --- | --- |
| /index | GET | | | | 渲染首页 |
| /regitser | GET | | | | 渲染注册页面 |
| /register | POST | | email,username,password | | 处理注册请求 |
| /login | GET | | | | 渲染登陆页面 |
| /login | POST | | email,password | | 处理登陆请求 |
| /logout | GET | | | | | 处理退出请求 |  
## NOTE
Express获取get请求参数  
req.query  
服务器获取post请求参数(body-parser中间件)  
req.body  
