const  exprss = require('express')
const app = exprss()
app.get('/',(req,res)=>{
    res.send('ok1')
})


app.listen(3000,()=>{
    console.log('进入3000服务')

})