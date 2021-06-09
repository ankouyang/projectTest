/**
 vue3.0中的  reactive函数是通过es6中的proxy，
 vue2.0是用的Object.definedProperty()
 proxy在目标对象的外层搭建了一层拦截，外界对目标对象的某些操作，
 必须通过这层拦截，new Proxy()表示一个Proxy实例,target参数表示所要拦截的目标对象
 handler为一个对象，其属性是当执行一个操作时定义代理的行为的函数(可以理解为某种触发器)。
 Reflect 是一个内置的对象，它提供拦截 JavaScript 操作的方法。Reflect不是一个函数对象，因此它是不可构造的。
*/
(function (root) {
    //vue响应式源码核心代码实现,封装deps依赖收集的类
    let activeCallback;//定义当前的回调函数
    let  queen = []  //存储异步队列
    const  queenAdd =  add =>{ //添加到异步队列当中
        if(!queen.includes(add)){
            queen.push(add)
            nexTick(executeQueen)
        }else {
            nexTick(executeQueen)
        }
    }
    const executeQueen = ()=>{ //执行异步任务列的所有任务
        if(queen.length>0&&queen[0]){
            queen.forEach(fn=>{
                fn()
            })
        }
    }
   //这里我们需要按照Event Loop那样  执行宏任务后，清空所有的微任务队列，
   // 所有我们把添加任务队列函数,添加到微任务队列中
    const nexTick = callback => Promise.resolve().then(callback)
    //依赖收集的类
    class Dep {
        constructor() {
            this.deps = new Set() //Set存在add方法
        }
        //收集依赖
        depend(){
            if(activeCallback){
                this.deps.add(activeCallback)
            }
        }
        //通知依赖更新
        notify(){
            this.deps.forEach(dep=>queenAdd(dep)) //这里的依赖更新，先把依赖的添加微任务队列当中去。
        }


    }
    const  dep = new Dep() //实例化dep类
    //监听函数
    const  watch = function(callback){
        activeCallback = callback
        activeCallback() //初始的调用调用
        activeCallback = null // 销毁当前的activeCallback
    }
    // Object.defineProperty() 创建对象
    // 创建响应式
    const reactive =(target = {})=>{
        if (typeof target !== 'object' || target == null) {
            return target
        }
        const handler= {
            get(target, key, receiver) {
                // 只处理本身（非原型的）属性
                // target是对象，ownKeys是属性的数组
                // target是数组，ownKeys是索引数组，返回一个包含所有自身属性（不包含继承属性）的数组。
                // ownKeys(类似于 Object.keys(), 但不会受enumerable影响).
                const ownKeys = Reflect.ownKeys(target)
                if (ownKeys.includes(key)) {
                     dep.depend() // 添加监听
                }
                const result = Reflect.get(target, key, receiver) //获取对象身上某个属性的值，类似于 target[name]。
                // 深度监听
                return reactive(result) // 这里利用递归，进行深拷贝监听(这个是关键)
            },
            set(target, key, val, receiver) {
                // 重复的数据，不处理
                if (val === target[key]) {
                    return
                }
                const result = Reflect.set(target, key, val, receiver) // 将值分配给属性的函数。返回一个Boolean，如果更新成功，则返回true。
                dep.notify() // 通知监听队列进行更新
                // 是否设置成功
                return result
            },
            deleteProperty(target, key) {
                const result = Reflect.deleteProperty(target, key)
                // 是否删除成功 暂时不扩展
                return result
            }
        }
        const observed = new Proxy(target, handler)
        return observed
    }
    window.reactive = reactive
    window.watch = watch
})(window)

