const express = require('express')
const path =  require('path')
const fs = require('fs')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')


const app = express()
app.get('/submit',(req,res)=>{
    // __dirname 当前目录的绝对目录
     console.log(req)
     res.sendFile(path.resolve(__dirname,'blob.html'))
})
 //服务端接收文件，这里用了一个中间件去解析body
app.post('/fileBlob',fileUpload(),(req,res)=>{
    req.files.file.mv(path.resolve(__dirname,`upload/${req.body.name}`))
    res.status(201).send('ok') 
})

app.listen(3000,()=>{
    console.log('进入服务')
})