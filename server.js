const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const expressSession = require('express-session');
require('dotenv').config();

// Sessions configuration
const sessionConfig = expressSession({
    secret: "secret",  // Replace with a stronger secret for production use
    resave: false,  // Avoid resaving sessions if nothing changed
    saveUninitialized: false  // Only save sessions when something is stored
});

// Import models
const Register = require('./models/register');

// Import routes
const registerRoutes = require('./routes/registerRoutes');
const produceRoutes = require('./routes/produceRoutes');
const salesRoutes = require('./routes/salesRoutes');
const indexRoutes = require('./routes/indexRoutes');
const stockRoutes = require('./routes/stockRoutes');
const creditRoutes = require('./routes/creditRoutes');
const adminRoutes = require('./routes/adminRoutes');
const agentRoutes = require('./routes/agentRoutes');
const reportRoutes = require('./routes/reportRoutes');

// Instantiate app
const app = express();
const port = process.env.PORT || 3050;

// MongoDB connection
mongoose.connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Mongoose connection open"))
.catch(err => console.error(`Connection error: ${err.message}`));

// Set view engine to Pug
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// Middleware for serving static files and parsing request body
app.use(express.static(path.join(__dirname, "public")));  // Serve static assets (CSS, JS, images)
app.use(express.urlencoded({ extended: true }));  // Parse form data
app.use(express.json());  // Parse JSON data

// Use sessions for user authentication
app.use(sessionConfig);
app.use(passport.initialize());  // Initialize Passport.js
app.use(passport.session());  // Use sessions for storing user data

// Passport local strategy configuration
passport.use(Register.createStrategy());  // Use the strategy from register model (passport-local-mongoose)
passport.serializeUser(Register.serializeUser());  // Serialize user data
passport.deserializeUser(Register.deserializeUser());  // Deserialize user data

// Routes
app.use('/', registerRoutes);  // User authentication (register, login)
app.use('/', produceRoutes);  // Produce-related routes
app.use('/', salesRoutes);  // Sales-related routes
app.use('/', indexRoutes);  // Index/homepage routes
app.use('/', stockRoutes);  // Stock management routes
app.use('/', creditRoutes);  // Credit-related routes
app.use('/', adminRoutes);  // Admin dashboard routes
app.use('/', agentRoutes);  // Agent dashboard routes
app.use('/', reportRoutes);  // Reports for sales, produce, etc.

// Catch-all for invalid routes
app.get("*", (req, res) => {
    res.status(404).send("Page does not exist");  // 404 for unknown routes
});

// Start the server
app.listen(port, () => console.log(`Listening on port ${port}`));
