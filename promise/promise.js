// demo1
// const   data  = new Promise((resolve,reject)=>{
//        resolve(222)
// }).then(data=>{
//     console.log(data)
// })


// demo2

// const   data  = new Promise((resolve,reject)=>{
//        resolve(222)
// }).then(data=>{
//     console.log(data)
//     // return '1212'
// }).then(data=>{
//     console.log(data)
// })


// demo3

// const   data  = new Promise((resolve,reject)=>{
//     reject(222)
// }).then(data=>{
//  //console.log(data)
//  return '1212'
// }).then(data=>{
//  console.log(data)
// }).catch(err=>{
//     console.log(err)
//     return '4545'
// }).then(data=>{
//     console.log(data)
// })

//demo4

// const   await  =  function(ms = 2000,data){
//         return new Promise((resolve,reject)=>{
//             setTimeout(()=>{
//                 resolve(data)
//             },ms)
//         })
//     }

//    new Promise((resolve,reject)=>{
//          resolve('mmp')
//    }).then(data=>{
//        console.log(data)
//        return await(5000,'食屎啦你')
//    }).then(res=>{
//        console.log(res)
//    }) 


//demo5

   const   wait  =  function(ms = 2000,data){
        return new Promise((resolve,reject)=>{
            setTimeout(()=>{
                resolve(data)
             },ms)
        })
    }

//  async function foo(){
//      const a = await wait(1000,1)
//      console.log(a)
//      const b = await wait(5000,2)
//      console.log(b)
//  }
// foo()

// Promise.all([wait(5000,1),wait(1000,2)]).then(res=>{

//     console.log(res)
// })

Promise.race([wait(5000,1),wait(1000,2)]).then(res=>{
    console.log(res)
})


