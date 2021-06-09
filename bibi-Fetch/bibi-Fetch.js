const  fetch  = require('node-fetch')
const  app  = require('express')()

function fetchData(){
    return new Promise((resolve,reject)=>{
        fetch('https://api.bilibili.com/x/member/web/account',{
            headers:{'cookie':'_uuid=00B3D359-2310-1DA1-5D34-E2161E2D27B670006infoc; buvid3=987581A0-8085-4350-9271-FCF22039A337185014infoc; bsource=search_baidu; buvid_fp=987581A0-8085-4350-9271-FCF22039A337185014infoc; SESSDATA=c365f90b%2C1635237967%2Ce5e94%2A41; bili_jct=bcf74cb7f953cbdcbd80b25eb5d6a6f9; DedeUserID=17868069; DedeUserID__ckMd5=cb00c0c926e3d66e; sid=a9g9b6qs; bfe_id=6f2695e1895fb89897286b11ddc486b0; bp_video_offset_17868069=517818518683541265; fingerprint3=a318682c183fc382c274fb22e5789b9f; fingerprint=336eb44fea45f179a053172b33f62e24; fingerprint_s=590ece7250adf7287ffc8227dda15e48; buvid_fp_plain=987581A0-8085-4350-9271-FCF22039A337185014infoc; PVID=2'}
            })
            .then(res=>{
                return res.json()
            }).then(res=>{
            resolve(res)
        })
    })
}
app.get('/',(req,res)=>{
    async function BiData(){
         let data = await  fetchData()
        res.json({stats:200,data,message:'成功'})
    }
    BiData()
})


app.listen(9999,()=>{
    console.log('9999服务');
})
