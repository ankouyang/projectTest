
//node节点是一个数据格式是一个递归
function render(node,renderAs ='dom',path = [] ) {
   const  {name,props,child} = node
   const Strateyer = {
       dom: function () {
           //外层创建一个的element
            let element = document.createElement(name)
           // 是否有props属性click事件
           if(props&&props.onclick){
                 element.addEventListener('click',props.onclick)
           }
           if(typeof child === 'string'){
              element.innerHTML = child
           }else if(Array.isArray(child)){
                 //遍历children,把相关的child的elemnt追加进去
                 child.forEach((item,i)=>{
                    element.appendChild(render(item,renderAs,path.concat(i))) //需要递归
                 })
           }
           return element
       },
       html: function () {
           let childStr = ''
           if(typeof child === 'string'){
               childStr = child
           }else if( Array.isArray(child)){
               childStr = child.map((item,index)=>{
                  return render(item,renderAs,path.concat(index))
               }).join("")
           }
           return `<${name}  id='node-${path.join('-')}'>${childStr}</${name}>`
       },
       rehydrate: function () {
            //第外层
            if(props&&props.onclick){
                  document.getElementById(`node-${path.join('-')}`).addEventListener('click',props.onclick)
            }
             if(Array.isArray(child)){
                 //递归一下
                  child.forEach((item,index)=>{
                      render(item,renderAs,path.concat(index))
                  })
             }

       },
   }
   if( renderAs in Strateyer){
       return Strateyer[renderAs]()
   }else {
       throw "not support renderAs Type"
   }

}

//node环境的导出 moudule方式
module.exports = render