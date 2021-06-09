const  exprss = require('express')
const app1 = exprss()
const app2 = exprss()

app1.set('etag',false)
app2.set('etag',false)
app1.get('/',(req,res)=>{
    //原始的设置cookie的方法
    // res.setHeader('Set-Cookie','abc=ddsaddgggggggghashgdhgsahghagdh')
    //express中的设置cookie
   // res.cookie('abc','dsddddddd',{maxAge: 60 * 1000, httpOnly: true})
    res.send('ok1')
})

app2.get('/sb',(req,res)=>{
    res.setHeader('Set-Cookie','abc=sbsbsb')
    res.set("Access-Control-Allow-Origin","http://localhost:3000")  //跨域设置

    res.send('ok2')
})



app1.listen(3000,()=>{
    console.log('进入3000服务')

})

app2.listen(3001,()=>{
    console.log('进入3001服务')

})