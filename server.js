const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');

//sessions
const expressSession = require('express-session')({
    secret: "secret",
    resave: false,
    saveUninitialized: false
});

require('dotenv').config();

// Import models
const Register = require('./models/register');
const Sales = require('./models/sales');
const Produce = require('./models/produce');
const Credit = require('./models/credit');
// const Admin = require('./models/admin');

// Import routes
const registerRoutes = require('./routes/registerRoutes');
// const loginRoutes = require('./routes/loginRoutes');
const produceRoutes = require('./routes/produceRoutes');
const salesRoutes = require('./routes/salesRoutes');
const indexRoutes = require('./routes/indexRoutes');
const stockRoutes = require('./routes/stockRoutes');
const creditRoutes = require('./routes/creditRoutes');
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');
const agentRoutes = require('./routes/agentRoutes.js');


// Instantiate app
const app = express();
const port = 3050;

// Configure MongoDB connection
mongoose.connect(process.env.DATABASE_LOCAL,
);

mongoose.connection
    .once("open", () => {
        console.log("Mongoose connection open");
    })
    .on("error", err => {
        console.error(`Connection error: ${err.message}`);
    });

// Set view engine to Pug
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Express session configs
app.use(expressSession);
app.use(passport.initialize());
app.use(passport.session());

passport.use(Register.createStrategy());
passport.serializeUser(Register.serializeUser());
passport.deserializeUser(Register.deserializeUser());

// Routes
app.use('/', registerRoutes);
// app.use('/', loginRoutes);
app.use('/', produceRoutes);
app.use('/', salesRoutes);
app.use('/', indexRoutes);
app.use('/', stockRoutes);
app.use('/', creditRoutes);
app.use('/', adminRoutes);
app.use('/', userRoutes);
app.use('/', agentRoutes);

app.get("*", (req, res) => {
    res.send("page does not exist");
});

// Start server
app.listen(port, () => console.log(`Listening on port ${port}`));
