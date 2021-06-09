const  express = require('express')
const app = express()
const path = require('path')
const htmlFile = path.resolve(__dirname,"pages/spa.html")


//url正则匹配 一下
//以product开头的url和铺面跟随数字，都跳转到同一个页面
app.get(/\/product(s|\/\d+)/,(req,res)=>{
    res.sendFile(htmlFile)
})

app.listen(8090,()=>{
    console.log('spa 服务');
})


