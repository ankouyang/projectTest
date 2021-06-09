const  express = require('express')
const app1  = express()
const app2  = express()

app1.get('/app1',(req,res)=>{
    res.send('进入app1服务')
})

app1.listen(3000,()=>{
    console.log('进入3000服务')
})



app2.get('/app2',(req,res)=> {
    res.set("Access-Control-Allow-Origin","*")
    res.send('进入app2服务2')
})

app2.post('/app2',(req,res)=> {
    res.set("Access-Control-Allow-Origin","http://localhost:3000")
    // res.set("Access-Control-Allow-Headers","content-type")
    res.send('进入app2服务')
})

app2.options('/app2',(req,res)=> {
    res.set("Access-Control-Allow-Origin","http://localhost:3000")
    res.set("Access-Control-Allow-Headers","content-type,token")
    res.set("Access-Control-Allow-Methods","DELETE,PUT")//不能限制get和post还有head请求，所以get post head无需设置此项
    res.sendStatus(200)
})

app2.put('/app2',(req,res)=> {
    res.set("Access-Control-Allow-Origin","http://localhost:3000")
    res.send('进入app2服务')
})

app2.delete('/app2',(req,res)=> {
    res.set("Access-Control-Allow-Origin","http://localhost:3000")
    res.send('进入app2服务')
})


app2.listen(3001,()=>{
    console.log('进入3001服务')
})

