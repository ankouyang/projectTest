/**
 * fetch的基本用法
 */
 
const fetch = require('node-fetch')

async function foo(){
    const resp = await fetch('http://xwww.baidu.com',{
        method:'POST',
        headers:{
            'user-agent':'Mozilla'
        }
    })
    const text = await resp.text()
    console.log(text)
}
foo() 