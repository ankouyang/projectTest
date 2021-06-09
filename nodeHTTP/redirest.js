const  exprss = require('express')
const app = exprss()
//get post
//302/303/307
app.get('/301',(req,res)=>{
    res.redirect(301,'/def')
})
app.post('/301',(req,res)=>{
    res.redirect(301,'/def')
})
//302
app.get('/302',(req,res)=>{
    res.redirect(302,'/def')
})
app.post('/302',(req,res)=>{
    res.redirect(302,'/def')
})
//303
app.get('/303',(req,res)=>{
    res.redirect(303,'/def')
})

app.post('/303',(req,res)=>{
    res.redirect(303,'/def')
})

//post 307
app.get('/303',(req,res)=>{
    res.redirect(303,'/def')
})

//post 307
app.post('/307',(req,res)=>{
    res.redirect(307,'/def')
})

//重定向接口
app.get('/def',(req,res)=>{
    res.send('This is Def(get)')
})

app.post('/def',(req,res)=>{
    res.send('This is Def(post)')
})

app.listen(3000,(req,res)=>{
    console.log(23232)
})