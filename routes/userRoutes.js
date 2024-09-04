const express = require('express');
const router = express.Router();
const connectEnsureLogin = require('connect-ensure-login');
const Register = require('../models/register');

// All users
router.get('/all-users', connectEnsureLogin.ensureLoggedIn(), async (req, res) => {
    try {
        if (req.session.user.role === 'manager') {
            const allUsers = await Register.find().sort({ $natural: -1 });
            res.render('all-users', {
                users: allUsers,
            });
        } else {
            res.send('Only Managers are allowed to access this page');
        }
    } catch (error) {
        res.status(400).send('Unable to find users in your database', error);
    }
});

// Update user
router.get('/update-user-page/:id', async (req, res) => {
    try {
        const dbUser = await Register.findOne({ _id: req.params.id });
        res.render('update-user', {
            user: dbUser,
        });
    } catch (err) {
        res.status(400).send('Unable to find user in the database');
    }
});

router.post('/update-user-page', async (req, res) => {
    try {
        await Register.findOneAndUpdate({ _id: req.query.id }, req.body);
        res.redirect('/all-users-page');
    } catch (err) {
        res.status(404).send('Unable to update user in the database');
    }
});

// Delete User
router.post('/delete-user', async (req, res) => {
    try {
        await Register.deleteOne({ _id: req.body.id });
        res.redirect('back');
    } catch (err) {
        res.status(400).send('Unable to delete user in the database');
    }
});

module.exports = router;
