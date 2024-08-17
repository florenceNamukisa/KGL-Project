const express = require('express');
const router = express.Router();

const Register = require('../models/register'); // This is your user model

router.get("/addUser", (req, res) => {
    res.render("register");
});

// Register admin
router.post("/addUser", async (req, res) => {
    try {
        // Check if the user already exists
        const existingUser = await Register.findOne({ email: req.body.email });
        if (existingUser) {
            return res
                .status(400)
                .send("Not registered, a user with a similar email already exists!");
        }

        // Create a new user using the Register model
      // Incorrect: const user = new Register.register(req.body);
const register = new Register(req.body);  // Corrected


        // Register the user (assuming you're using Passport.js for authentication)
        await Register.register(register, req.body.password, (err) => { 
            if (err) {
                throw err;
            }
            res.redirect("/login");
        });
    } catch (err) {
        res.status(400).render("register", { title: "Register" });
        console.log("register user error", err);
    }
});

module.exports = router;
