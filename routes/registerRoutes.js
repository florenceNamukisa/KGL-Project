const express = require('express')
const router = express.Router();
const passport = require('passport'); 
const register = require('../models/register')

router.get("/addUser" ,(req, res) => {
    res.render("register");
});
// Register admin
router.post("/addUser", async (req, res) => {
    try {
    // added
    const existingUser = await register.findOne({ email: req.body.email });// check if the user already exist
    if (existingUser) {
    return res
    .status(400)
    .send("Not registered, a user with a similar email already exists!");
    }
    const user = new register(req.body);
    // added
    await register.register(user, req.body.password, (err) => { // used to register a user who will later login
    if (err) {
    throw err;
    }
    res.redirect("/signUser");
    });
    } catch (err) {
    res.status(400).render("register", { tittle: "Register" });
    console.log("Register user error", err);
    }
    });
    router.get("/signUser", (req, res) => {
        res.render("login");
    });
    
    // Route to handle login
    router.post("/signUser", 
        passport.authenticate("local", { failureRedirect: "/signUser" }), // Use /signUser as failureRedirect
        (req, res) => {
            if (!req.user) {
                console.log("User authentication failed");
                return res.redirect("/signUser");
            }
    
            console.log("Authenticated User:", req.user); // Log user object for debugging
            req.session.user = req.user; // Assign session to the logged-in user
    
            // Redirect based on the user's role
            if (req.user.role === "manager") {
                console.log("Redirecting manager to /addSale");
                res.redirect("/admin-dashboard");  // Ensure this route exists
            } 
            else if (req.user.role === "sales-agent") {
                console.log("Redirecting sales-agent to /agent-dashboard");
                res.redirect("/agent-dashboard");  // Ensure this route exists
            } 
            else {
                console.log("Unknown role:", req.user.role);
                res.send("User with that role does not exist in the system");
            }
        }
    );
    
    // Logout route
    router.get("/logout", (req, res) => {
        if (req.session) {
        req.session.destroy((err) => {
        if (err) {
        return res.status(500).send("Error logging out");
        }
        res.redirect("/");
        });
        }else{
            res.send('you donot have a session')
        }
        });

module.exports = router;