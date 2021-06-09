//定义函数
let modules = {}
//浏览器没有define函数，得手动定义
function define(name,func){
    console.log(12211)
    modules[name] = func
}
//定义路径
function lookup(name) {
    return require.path +name +".js"
}
//简单版本的require  AMD模式
function require(deps,callback){ //依赖  回调
    function loadModule(name) {
         return new Promise((resolve)=>{
             const  script = document.createElement('script')
             script.src = lookup(name) //这里其实就是deps的加载[add,mult]的加载
             script.addEventListener('load',()=>{
                    //script加载完毕后,会调用define函数，把依赖存期起来，并返回相关得依赖
                 console.log(modules[name]);
                 resolve(modules[name])
             })
             document.body.appendChild(script)
         })
    }
    const  promises = deps.map(loadModule)//执行所有得依赖
    Promise.all(promises).then(res=>{
           //执行完所有依赖后，在回调中用相关参数去接收依赖
            callback(...res)
        })

}



