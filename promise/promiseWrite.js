/**
 * js中类的两种使用方法
 * 1 使用函数
 *  var ClassName = function() {
        this.message = 'dat.gui';
        this.speed = 0.8;
        this.displayOutline = false;
        this.explode = function() {};
        // Define render logic ...
    };
 * 2.使用类和方法
    class ClassName {
        constructor() {
            this.message = 'dat.gui';
            this.speed = 0.8;
            this.displayOutline = false;
        }
        explode() {
            // Define render logic ...
        };
    }
 */

//类可以看作构造函数的加强版本



 const PENDING = 1
 const FULLFILED = 2
 const REJECTED = 3

 //手撸Promise
class Promsie1{
 //Promise类 
 //它的构造函数需要传入 executor
 constructor(executor){
   this.state =   PENDING
   //executor 立即被执行 executor函数里面两个参数  参数是两个函数
   this.fullfills = []
   const isObect = (obj)=>{
     return  Object.prototype.toString.call(obj) === '[object Object]'
  }
  const resolver = (value)=>{ 
      if(this.state === PENDING) {
        this.value = value 
        this.state = FULLFILED
        for(let [onFullfill,resolve] of this.fullfills){
            const x = onFullfill(this.value)
            if(isObect(x)&&(x instanceof Promsie1)){
                x.then(res=>{
                    resolve(res)
                })
            }else{
                resolve(x)
            }
        
        }

      } 
    
  }
  const rejecter = (reason)=>{
    if(this.state === PENDING) {
        this.reason = reason 
        this.state = REJECTED
      } 
  }
  executor(resolver,rejecter)
 }
 //普通的then方法
 then(onFullfill){
    // 返回一个新的promise 
    return new Promsie1((resolve,reject)=>{ 
        console.log(this.state=== 1?'PENDING':'FULLFILED') 
        switch(this.state){//但是这个状态还是当前promise的实例状态
            //Pending状态
            case PENDING: 
                this.fullfills.push([onFullfill,resolve]);
                //第一个Promise的状态还在PENDING,把一些回调函数和reslove都用fullfills存在起来,promise的状态变化时候
                //也就是第一个promise的状态变成FULLFILED，然后再去遍历fullfills。执行FULLFILED状态下的功能操作。(执行回调，resolve数据,改变新的promise的状态)
                //这样一层一层 就实现了链式调用  
                break 
            //状态已经是FULLFILED的话
            case FULLFILED:
                //then中的onFullfill是一个函数，把onFullfill函数的返回值作为 then方法返回的Promise对象的value值。
                const x = onFullfill(this.value)
                resolve(x)
                break
        }
    } )
 }
}
const promise = new Promsie1((resolve)=>{
    setTimeout(()=>{
        resolve('第一个测试')
    },1000)
}).then(res=>{
    console.log(res)
})

