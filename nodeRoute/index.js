 const  express = require('express')
 const app = express()
 const fs = require('fs')
 const path = require('path')
 //解析当前pages的相对路径为绝对路径  __dirname 找到当前的路径
 const pageDir = path.resolve(__dirname,"pages")
 //读取文件夹中的文件
 const htmls =  fs.readdirSync(pageDir)


 //高阶函数显示
 function displayHtmlFile(name,ext){
      return (req,res)=>{
          res.sendFile(path.resolve(pageDir,`${name}.${ext}`))
      }
 }

 htmls.forEach(file=>{
  const  [name,ext] = file.split('.')
    app.get(`/${name}`,displayHtmlFile(name,ext))
 })


 app.listen(3000,()=>{
     console.log('欢迎进入路由服务');
 })