//Importing module
let express = require("express");
let mongoose = require("mongoose");
let bodyparser = require("body-parser");
let cors = require("cors");
let path = require("path");

//Init process environment if not initialized by npm run
if(!process.env.NODE_ENV)
{
    process.env.NODE_ENV = "dev";
}

let app = express();

const route = require("./routes/route");

//Init port number
const port = 3000;

//Adding middleware
app.use(cors());
app.use(bodyparser.json());

//Adding mongodb code
if(!(process.env.NODE_ENV.includes('prod') && process.env.MONGO_URL == undefined))
{
    let mongodbURL;
    if(process.env.MONGO_URL)
    {
        mongodbURL = process.env.MONGO_URL;
    }
    else
    {
        const mongoIP = 'localhost';
        const mongoPort = '27017';
        mongodbURL = 'mongodb://' + mongoIP + ':' + mongoPort + '/mentorsdb';
    }
    mongoose.connect(mongodbURL);

    mongoose.connection.on('connected', () => {
        console.log('Connected to mongodb...');
    });

    mongoose.connection.on('error', (err) => {
        if(err)
        {
            console.log('Error: ' + err);
        }
        console.log('Error while connecting to database...');
    });
}
else
{
    console.log('Production mode require MONGO_URL being set. Please initialize it first before running.')
}

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
