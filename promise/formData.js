const express = require('express')
const path =  require('path')
const fileUpload = require('express-fileupload')

const app = express()
app.get('/submit',(req,res)=>{
    // __dirname 当前目录的绝对目录
     res.sendFile(path.resolve(__dirname,'formdata.html'))
})
 //服务端接收文件，这里用了一个中间件去解析body
app.post('/file',fileUpload(),(req,res)=>{
  req.files.file.mv(path.resolve(__dirname,'upload/aaa.txt'))
  res.status(201).send('ok') 
})

app.listen(3000,()=>{
    console.log('进入服务')
})