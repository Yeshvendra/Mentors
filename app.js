//Importing module
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const flash = require('connect-flash');
const cors = require('cors')
const bodyparser = require('body-parser')
const methodOverride = require('method-override');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');

//Init process environment if not initialized by npm run
if(!process.env.NODE_ENV)
{
    process.env.NODE_ENV = "dev";
}

const professorRoute = require('./routes/professor_route');
const instituteRoute = require('./routes/institute_route');
const projectRoute = require('./routes/project_route');
const uiRoute = require('./routes/ui_routes');
var userRoutes = require("./routes/user_routes");

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

const app = express();

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

//Adding middleware
app.use(cors());
app.use(bodyparser.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

const sessionConfig = {
    secret: 'thisshouldbeabettersecret!',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}

app.use(session(sessionConfig))
app.use(flash());

app.use(passport.initialize())
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    //console.log(req.session)
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

//================================================================================
//Adding routes
app.use('/api', professorRoute);
app.use('/api', instituteRoute);
app.use('/api', projectRoute);
app.use(uiRoute);
app.use(userRoutes);

//Static content hosting
app.use(express.static(path.join(__dirname, 'public')));

//Health Check end-point
app.get('/healthCheck', (req, res) => {
    res.send("Healthy");
});


//Init port number
const port = 3000;
app.listen(process.env.PORT || port, () => {
    console.log("Server started at port: " + port);
});
