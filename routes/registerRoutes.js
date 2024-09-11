const express = require('express');
const router = express.Router();
const passport = require('passport');
const Register = require('../models/register');

// Initialize Passport
router.use(passport.initialize());
router.use(passport.session());

// Render the registration form
router.get("/addUser", (req, res) => {
    res.render("register");
});

// Register a new user
router.post("/addUser", async (req, res) => {
    try {
        const { userName, email, role, branch, password } = req.body;

        const existingUser = await Register.findOne({ email });
        if (existingUser) {
            return res.status(400).send("User with a similar email already exists!");
        }

        // Create a new user instance
        const newUser = new Register({ userName, email, role, branch });

        // Register the user with Passport (hashes password)
        await Register.register(newUser, password, (err) => {
            if (err) {
                console.error("Error registering user:", err);
                return res.status(500).send("Error registering user");
            }
            res.redirect("/signUser");
        });
    } catch (err) {
        console.error("Error during registration:", err);
        res.status(400).render("register", { title: "Register", errorMessage: "Registration failed. Try again." });
    }
});

// Render the login form
router.get("/signUser", (req, res) => {
    res.render("login");
});

// Handle login and role-based redirection
router.post("/signUser", passport.authenticate("local", { failureRedirect: "/signUser" }), (req, res) => {
    req.session.user = req.user;  // Store the authenticated user in session

    // Role-based redirection
    if (req.user.role === "manager") {
        res.redirect("/admin-dashboard");
    } else if (req.user.role === "sales-agent") {
        res.redirect("/agent-dashboard");
    } else {
        res.send("User role is not recognized in the system.");
    }
});

// Logout route
router.get("/logout", (req, res) => {
    if (req.session) {
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).send("Error logging out");
            }
            res.redirect("/");
        });
    } else {
        res.send("No active session found");
    }
});

module.exports = router;
