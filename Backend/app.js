
//------------------ Old code with http -----------------------------------------------//
//http connection
// const http = require("http");

//create a server
// const server = http.createServer((req,res) =>{
//     console.log("server is running");
//     console.log(req.url," req method ",req.method);
//     res.setHeader("Content-Type", "text/html");
//     res.write("hello world");
//     res.end();

// })


//after creating a server you want to list users request , 3000 is port
// server.listen(3000)


//--------------------------- New code with express ---------------------------------------------//

const express = require("express");
const cors = require('cors');
const app = express();
const port = 3000;
app.use(express.json());
app.use(cors()); // Add CORS middleware

const routes = require("./routes/mainroute");

routes.forEach(route => app.use(route));


app.use('/', (req, res) => {
    console.log("endpoint not exist", req.url);
    res.status(404).send("endpoint not exist");
})



app.listen(port,() => console.log("server is running in port : ",port));

