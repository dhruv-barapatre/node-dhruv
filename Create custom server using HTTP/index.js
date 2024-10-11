const http=require("http")
const fs=require("fs")

const server=http.createServer((req,res)=>{
    if(req.url=="/"){
        console.log("Welcome To Home Page")
        res.end("Welcome To Home Page")
    }else if(req.url=="/about"){
        console.log("Welcome To About Page")
        res.end("Welcome To About Page")
    }else if(req.url=="/getproductdata"){
        fs.readFile("./db.json","utf-8",(err,data)=>{
            if(err){
                console.log(err)
                res.end("errr")
            }else{
                const productData=JSON.parse(data)
                console.log(productData.products)
                res.end("productData.products")
            }
        })
    }else if(req.url=="/user"){
        fs.readFile("./db.json","utf-8",(err,data)=>{
            if(err){
                console.log(err)
                res.end("errr")
            }else{
                const productData=JSON.parse(data)
                console.log(productData.user)
                res.end("User Data")
            }
        })
    }
})


server.listen(8000,()=>{
    console.log("Server IS Running At 8000")
})