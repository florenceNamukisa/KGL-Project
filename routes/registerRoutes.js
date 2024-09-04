const express = require('express');
const router = express.Router();
const passport = require('passport');
const Register = require('../models/register');

// Signup Routes
router.get('/addUser', (req, res) => {
    res.render('register');
});

// Add new user
router.post('/addUser', async (req, res) => {
    try {
        const existingUser = await Register.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).send('Not registered, a user with a similar email already exists!');
        }

        const user = new Register(req.body);
        await Register.register(user, req.body.password, (err) => {
            if (err) {
                throw err;
            }
            res.redirect('/signUser');
        });
    } catch (err) {
        res.status(400).render('register', { title: 'Register' });
        console.log('register user error', err);
    }
});

// Login Routes
router.get('/signUser', (req, res) => {
    res.render('login');
});

// Route to handle login
router.post('/signUser', passport.authenticate('local', { failureRedirect: '/signUser' }), (req, res) => {
    req.session.user = req.user;

    if (req.user.role === 'manager') {
        res.redirect('/admin-dashboard');
    } else if (req.user.role === 'sales-agent') {
        res.redirect('/sale');
    } else {
        res.send('User with that role does not exist in the system');
    }
});

// Logout route
router.get('/logout', (req, res) => {
    if (req.session) {
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).send('Error logging out');
            }
            res.redirect('/');
        });
    } else {
        res.send('You do not have a session');
    }
});

module.exports = router;
