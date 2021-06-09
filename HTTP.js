const net =require('net')
const response =
     `
 
     Hello world 
     `


const server = net.createServer((socket)=>{
    socket.end(response)
})
server.listen(80,()=>{
   console.log(1212)
})