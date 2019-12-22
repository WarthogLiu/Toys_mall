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
| / | GET |   |      | 渲染首页 |
## NOTE
Express获取get请求参数  
req.query  
服务器获取post请求参数(body-parser中间件)  
req.body  
