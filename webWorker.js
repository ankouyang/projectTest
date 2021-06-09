// function fi(n) {
//  if(n==1|| n==2){
//      return 1
//  }
//  return fi(n-2) +fi(n-2)
// }
// console.log(this)
// postMessage(fi(40))
// onmessage=function (e) {
//     console.log(e.data);
// }

var work = require('webworkify');
var w = work(require('./webWorkerFly'))