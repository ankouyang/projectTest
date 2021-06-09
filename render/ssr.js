const  app = require('express')()
const render = require('./render')
const path = require('path')
//html数据模板
const html = render({
    name:'div',
    props:{
        onclick:(e)=>{
            e.preventDefault()
            window.alert('这是外层div')
        }
    },
    child:[
        {
            name:'ul',
            child:[
                {
                    name:'li',
                    props:{
                        onclick:function () {
                           console.log('我是ul的li---1')
                        },
                        style:{
                            background:'red'
                        }
                    },
                    child:'apple'
                },
                {
                    name:'li',
                    props:{
                        onclick:function () {
                            console.log('我是ul的li---2')
                        },
                        style:{
                            background:'blue'
                        }
                    },
                    child:'apple1'
                },
                {
                    name:'li',
                    props:{
                        onclick:function () {
                            console.log('我是ul的li----3')
                        },
                        style:{
                            background:'yellow'
                        }
                    },
                    child:'apple2'
                }
            ]
        }
    ]
},'html')

console.log(html);

//请求静态js page-ssr.js
app.get('/page-ssr.js',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'page-ssr.js'))
})

// 请求静态js page-ssr.js
app.get('/page.js',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'page.js'))
})


//请求html page
app.get('/page',(req,res)=>{
    const htmlStr = `<div id="root"></div>
     <script src="page.js"></script>
    `

    res.send(htmlStr)
})

// 请求html page-ssr
app.get('/page-ssr',(req,res)=>{
    const htmlStr = `<div id="root">
         ${html}
         <script src="page-ssr.js"></script>
      </div>`
    res.send(htmlStr)
})

app.listen('9001',()=>{
    console.log('进入9001服务');
})

