//Importing module
let express = require("express");
let mongoose = require("mongoose");
let bodyparser = require("body-parser");
let cors = require("cors");
let path = require("path");

let app = express();

const route = require("./routes/route");

//Init port number
const port = 3000;

//Adding middleware
app.use(cors());
app.use(bodyparser.json());

//Static file server
app.use(express.static(path.join(__dirname, 'public')));

//Adding routes
app.use('/api', route);

//Health Check end-point
app.get('/healthCheck', (req, res) => {
    res.send("Healthy");
});

app.listen(process.env.PORT || port, () => {
    console.log("Server started at port: " + port);
});
