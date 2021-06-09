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
console.log(fib(1000));

//使用缓存的函数
function memory(fn,maxSize) { // 这里使用高阶函数
    //[{hash:hash,value:value}]
    let cache = []
    return (...args)=>{
        //这里需要看是否有缓存,有缓存直接从缓存里面直接拿,没有缓存继续调用函数
        const  hash = args.join(',')
        // if(cache[hash])
        //find返回的直接是数据中命中条件的值
        const item = cache.find(item=>item.hash === hash)
        if(item){
            //命中缓存了,记录一个当前的时间
            item.time = new Date().getTime()
            return item.value
        }
        const  result = fn(...args)
        //没有命中缓存把当前的记录当前的time
        cache.push({hash,value:result,time:new Date().getTime()})

        //缓存数量是否超出，超出则把缓存时间最长的清除掉，
        if(cache.length>maxSize){
            //这里进行一个最小值的计算
            let min = Infinity
            let minItem = null
            for(let item of cache){
                if(item.time<min){
                    min = item.time
                    minItem = item
                }
            }
            //求出时间最小值就是的缓存时间最长的.过滤点
            cache = cache.filter(x=>x!==minItem)
        }

        //最终返回result
        return  result
    }
}


