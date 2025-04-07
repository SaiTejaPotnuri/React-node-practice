
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
const routes = require("./routes/mainroute");
const db = require("./utils/db.connection");
const dbMongoose = require("./utils/mongoose.db.connection")
const dbSequelize = require("./models/sequelizeModelIndex");


app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 



app.use(cors({
    origin: 'http://localhost:5173', // Or your frontend origin or '*'
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: ['Content-Type', 'authorization'],
    credentials: true, // If you need cookies
}));

routes.forEach(route => app.use(route));


app.use('/', (req, res) => {
    console.log("endpoint not exist", req.url);
    res.status(404).send("endpoint not exist");
})




app.listen(port, () => console.log("server is running in port : ", port));

