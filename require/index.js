const  express = require('express')
const  app = require('express')()
const  path = require('path')

app.use(express.static(path.resolve(__dirname,'libs')))


app.get('/',(req,res)=>{
   const html = `
<html lang="en">
<body>
mmp
</body>
<script src="require.js"></script>
<script >
  
  // require.path = '/'
  // require(['add','mult'],(add,mult)=>{
  //     console.log(add(3,5));
  //     console.log('======');
  //     console.log(mult(3,5));
  // })
</script>
</html>   
   `
   res.send(html)
})

//静态文件映射
app.get('/require.js',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'require.js'))
})

app.listen(8099,()=>{

})