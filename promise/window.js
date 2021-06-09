const fetch = require('node-fetch')


/**
 * 这个时间窗口,在这个时间内,相同的参数的请求，只执行一次
 * 这个需要用到高阶函数(所谓高阶函数,变量可以指向函数，函数的参数能接收变量,
 * 那么一个函数就可以接收另外一个函数作为参数，返回的肯定是一个函数，这种函数称之为高阶函数)
 * @param {*} f request函数
 * @param {*} time 时间间隔
 */


//需要用一个hash函数 把形参组织成一个唯一的key
function hash(...args){
   return args.join(',')
}
function window_it(f,time=50){ 
      let w = {} //这个时间窗口存储进来的请求
      let flag = false //一个标识类而已 判断是否有时间窗口
     return (...args)=>{
         return new Promise((resolve,reject)=>{
              // 存储相关请求 
              if(!w[hash(args)]){
                 w[hash(args)] = {
                    func:f,
                    args,
                    resolvers:[]
                }
              }
              //是否有创建时间窗口
              if(!flag){
                  flag = true
                   setTimeout(()=>{
                    //主要处理就是在这时间窗口的时间内 有多个相同的请求,
                    //处理函数只执行一次,但是可以reslove多次，这是我们的目标  
                     Object.keys(w).forEach(key=>{
                         const {func,args,resolvers} = w[key]
                         console.log('run once')
                        func(...args)
                           .then(res=>res.text())
                           .then(text=>{
                            //请求一次  resolve 多次
                            resolvers.forEach(r=>{
                                console.log('result respone')
                                  r(text)
                            }) 
                            //全部都成功后，初始化
                              flag =false
                              w = {}
                           })
                     })

                   },time) 
              }
              w[hash(args)].resolvers.push(resolve)
         })
     }    
}


const  request  = window_it(fetch,20) //返回的是一个新的函数 (...args)=>{}   
request('https://www.baidu.com')
request('https://www.baidu.com')
request('https://www.baidu.com')
request('https://www.baidu.com')

