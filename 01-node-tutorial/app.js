const {readFileSync, createReadStream} = require("fs");
const http = require("http");



const server = http.createServer((req,res)=>{
    // const text = readFileSync("./content/big.txt",'utf8');
    const text = createReadStream("./content/big.txt","utf8");

    text.on("open", (data)=>{
      text.pipe(res)
    })
    text.on("error", (err)=>{
    res.end(err);
    })
})


server.listen(8000)

// const {writeFileSync} = require("fs")

// for(let i = 0; i < 10000; i++){
//     writeFileSync("./content/big.txt",`hello world ${i}\n`, {flag: "a"})
// }