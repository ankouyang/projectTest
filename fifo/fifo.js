//斐波拉契数列
function fifo(n) {
    if(n == 1||n == 2){
        return 1
    }
    return  fib(n-1)+fib(n-2) //这里相加的运算也得用缓存后的 函数调用否则达不到缓存的作用
}

//1 1 2 3 5  这种是依赖前面的计算,规模越大 后面计算的时间就越长
// 1
// 1
//1+1 =2
//1+2=3
//2+3 = 5

const  fib = memory(fifo,10)

//使用缓存的函数
function memory(fn,maxSize) { // 这里使用高阶函数
    //[{hash:hash,value:value}]
    const cache = []
    return (...args)=>{
        //这里需要看是否有缓存,有缓存直接从缓存里面直接拿,没有缓存继续调用函数
        const  hash = args.join(',')
        // if(cache[hash])
        //find返回的直接是数据中命中条件的值
        const item = cache.find(item=>item.hash === hash)
        if(item){
            return item.value
        }
        const  result = fn(...args)
          cache.push({hash,value:result})

        //缓存数量是否超出，超出则把缓存的中最先进去的移除掉  就是移除头部
        if(cache.length>maxSize){
            cache.shift()
        }
        //最终返回result
        return  result
    }
}


