const express = require('express')
const path =  require('path')
const fs = require('fs')
const bodyParser = require('body-parser')


const app = express()
app.get('/submit',(req,res)=>{
    // __dirname 当前目录的绝对目录
     console.log(req)
     res.sendFile(path.resolve(__dirname,'html5_base64.html'))
})
 //服务端接收文件，这里用了一个中间件去解析body
app.post('/fileb64',bodyParser.json(),(req,res)=>{
  console.log(req.body)
  const  buffer = new Buffer(req.body.data,'base64')
  fs.writeFileSync(path.resolve(__dirname,`upload/${req.body.name}`),buffer)
  res.status(201).send('created')
})

app.listen(3000,()=>{
    console.log('进入服务')
})