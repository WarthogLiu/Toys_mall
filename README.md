基础格式参考：https://help.github.com/cn/github/writing-on-github/getting-started-with-writing-and-formatting-on-github  
高级格式：https://help.github.com/cn/github/writing-on-github/working-with-advanced-formatting  
# Graduation_Project
Graduation project of DJTU 2020  
本项目为大连交通大学2020届毕业设计  
  
## 本地文件结构
views:代渲染视图文件  
routers:路由文件  
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
| /new_arrival | GET | | | | 新货上架 |  
| /new_arrival | POST | | 数据库对象 | | 存放新产品信息 |  
| /modify | GET | /modify | | | 渲染待修改列表页面 |  
| /modify | GET | /modify_goods | | | 渲染修改详情页面 |  

  
## NOTE
Express获取get请求参数  
req.query  

服务器获取post请求参数(body-parser中间件)  
req.body  

用户登陆状态保存  
session.user  

购物车内容保存  
session.cart  

获取字符类型  
typeof  
console.log(typeof(req.body))  

字符类型转换  
String -> Number  
parseFloat()  

## 已知漏洞  
# index.html  
在index页面代码中，商品展示数目写死，当写定数目小于数据库中实际商品数目时，将会报错。  
原因：无法获取到不存在的商品信息，故出错，无法加载页面，并报错信息中没有体现。  