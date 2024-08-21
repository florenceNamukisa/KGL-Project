const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const passport = require("passport");
const expressSession = require("express-session")({
    secret: "secret",
    resave: false,
    saveUninitialized: false
});

require('dotenv').config();

//import models
const Register = require('./models/register');
const Credit = require('./models/credit');

//importing routes

const registerRoutes = require('./routes/registerRoutes');
const loginRoutes = require('./routes/loginRoutes');
const creditRoutes = require('./routes/creditRoutes');

//instantiations
const app = express();
const port = 3050;

//configurations
// set db connection to mongoose
mongoose.connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection
    .once("open", () => {
        console.log("Mongoose connection open");
    })
    .on("error", err => {
        console.error(`Connection error: ${err.message}`);
    });

//set view engine to pug

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

//middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// express session configs
app.use(expressSession);
app.use(passport.initialize());
app.use(passport.session());

passport.use(Register.createStrategy());
passport.serializeUser(Register.serializeUser());
passport.deserializeUser(Register.deserializeUser());

//Routes

app.use('/', registerRoutes)
app.use('/', loginRoutes)
app.use('/', creditRoutes)
app.get("*", (req, res) => {
    res.send("error! page does not exist");
});

//bootstraping a server
app.listen(port, () => console.log(`listening on port ${port}`));