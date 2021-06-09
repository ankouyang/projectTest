const  exprss = require('express')
const app = exprss()
//get

app.get('/list',(req,res)=>{
    console.log(4544)
    res.setHeader('etag',false)
    let arr = [
        {name:'ankou',id :1},
        {name:'ping',id :2},
        {name:'pang',id :3},
        {name:'qiu',id :4},
        {name:'anhao',id :5},

    ]
    res.json({status:200,data:arr,message:' 请求成功红'})
})

//post
app.post('/product',(req,res)=>{
    //使用application/json
    const contentType = req.headers['content-type']
    let requestText = ""
    let body =null
    req.on('data',(buffer)=>{
        //8bit -byte   把流转化为utf-8数据格式
        requestText +=buffer.toString('utf-8')
    })
    //数据传输完毕后
    req.on('end',()=>{
        switch (contentType) {
            case 'application/json':
                body = JSON.parse(requestText)
                console.log(body);
                res.set('Content-Type','application/json')
                res.status(201).send(JSON.stringify({data:body}))
                break
        }
    })

})

//put
app.put('/product/:id',(req,res)=>{
    res.status(204).send() //204成功了 但是无内容返回给你
})

//delete
app.delete('/product/:id',(req,res)=>{
    res.status(204).send() //204成功了 但是无内容返回给你
})



app.listen(3000,(req,res)=>{
   console.log(23232)
})