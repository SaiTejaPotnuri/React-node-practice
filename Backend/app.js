//http connection
const http = require("http");

//create a server

const server = http.createServer((req,res) =>{
    console.log("server is running");
    console.log(req.url," req method ",req.method);
    res.setHeader("Content-Type", "text/html");
    res.write("hello world");
    res.end();

})


//after creating a server you want to list users request , 3000 is port

server.listen(3000)