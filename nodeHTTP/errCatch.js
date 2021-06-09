const  exprss = require('express')
const app = exprss()
//
//用户没有登录
app.get('/login',(req,res)=>{
    // res.sendStatus(401)
    // res.sendStatus(403)
    // res.sendStatus(404)
    res.sendStatus(400)

})

app.get('/error',(req,res)=>{
    // res.sendStatus(500)
    res.sendStatus(502)
    // res.sendStatus(502)
})


app.listen(3000,(req,res)=>{
    console.log(23232)
})