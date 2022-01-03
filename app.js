//Importing module
let express = require("express");
let mongoose = require("mongoose");
let bodyparser = require("body-parser");
const passport = require('passport');
const LocalStrategy = require('passport-local');
let cors = require("cors");
let path = require("path");
const route = require("./routes/route");
var userRoutes = require("./routes/user_routes");

// Connect to database
var url = "mongodb://localhost:27017/mentors";
mongoose.connect(url, {

    useNewUrlParser: true,

    useUnifiedTopology: true

}, err => {
    if (err) throw err;
    console.log('Connected to MongoDB!!!')
});

let app = express();

//Static file server
app.use(express.static(path.join(__dirname, 'public')));
//Adding middleware
app.use(cors());
app.use(bodyparser.json());

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

//Adding routes
app.use('/api', route);
app.use(userRoutes);

//Health Check end-point
app.get('/healthCheck', (req, res) => {
    res.send("Healthy");
});


//Init port number
const port = 3000;
app.listen(process.env.PORT || port, () => {
    console.log("Server started at port: " + port);
});
