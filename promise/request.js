//应对网络不稳定环境，进行网络补偿你 
const fetch = require('node-fetch')
function request(url){
    let resolved = false
    let  t = 1
    return new Promise((resolve,reject)=>{
           function doFetch(){
               if(resolved||t>16){ //当网络请求回来后，或者请求指数大于16的时候，终止
                 console.log('请求终止')
                  return 
               }else{
                   //请求
                   fetch(url).then(res=>{
                       return res.text()
                   }).then(res=>{
                       if(!resolved){
                           console.log('t的指数',t)
                           resolve(res)
                           resolved = true
                       }
                   }).catch(err=>{
                    reject(err)
                   })
                   //网络补偿，需要用到递归
                   console.log(t)
                   setTimeout(()=>{
                    doFetch()
                     t*=2
                   },t*100)
               }
           }
           //为0ms时候的请求
           doFetch()
    })
}

 const promise = request('https://github.com/')
 promise.then(res=>{
     console.log(res)
 })