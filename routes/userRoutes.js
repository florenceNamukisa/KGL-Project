// // const express = require('express');
// // const router = express.Router();
// // const connectEnsureLogin = require('connect-ensure-login');
// // const Register = require('../models/register');

// // // All users
// // router.get('/all-users', connectEnsureLogin.ensureLoggedIn(), async (req, res) => {
// //     try {
// //         if (req.session.user.role === 'manager') {
// //             const allUsers = await Register.find().sort({ $natural: -1 });
// //             res.render('all-users', {
// //                 users: allUsers,
// //             });
// //         } else {
// //             res.send('Only Managers are allowed to access this page');
// //         }
// //     } catch (error) {
// //         res.status(400).send('Unable to find users in your database', error);
// //     }
// // });

// // // Update user
// // router.get('/update-user-page/:id', async (req, res) => {
// //     try {
// //         const dbUser = await Register.findOne({ _id: req.params.id });
// //         res.render('update-user', {
// //             user: dbUser,
// //         });
// //     } catch (err) {
// //         res.status(400).send('Unable to find user in the database');
// //     }
// // });

// // router.post('/update-user-page', async (req, res) => {
// //     try {
// //         await Register.findOneAndUpdate({ _id: req.query.id }, req.body);
// //         res.redirect('/all-users-page');
// //     } catch (err) {
// //         res.status(404).send('Unable to update user in the database');
// //     }
// // });

// // // Delete User
// // router.post('/delete-user', async (req, res) => {
// //     try {
// //         await Register.deleteOne({ _id: req.body.id });
// //         res.redirect('back');
// //     } catch (err) {
// //         res.status(400).send('Unable to delete user in the database');
// //     }
// // });

// // module.exports = router;
// // const express = require("express");
// // const router = express.Router();
// const connectEnsureLogin = require("connect-ensure-login");

// const Register = require("../models/register");

// router.get('/addUser', (req, res) => {
//   res.render('register', { title: "Register" });
// })

// router.post('/user', async (req, res) => {
//   try {
//     const newUser = new User(req.body);
//     await newUser.save();
//     res.redirect('/all-users');
//   } catch (error) {
//     res.status(404).send("unable to save user to db");
//     console.log("Error saving user", error);
//   }
  
// })

// // // home route
// router.get("/", (req, res) => {
//   res.render("index");
// });

// // manager route
// connectEnsureLogin.ensureLoggedIn(),
// router.get("/admin", (req, res) => {
//   // res.send("Welcome to KGL Management System");
//   res.render("admin-dashboard");
// });

// // // sales agent route
// router.get("/agent-dashboard", connectEnsureLogin.ensureLoggedIn(), (req, res) => {
//   // res.send("Welcome to KGL Management System");
//   res.render("agent-dashboard");
// });

// // get all users
// router.get("/all-users", connectEnsureLogin.ensureLoggedIn(), async (req, res) => {
//   try {
//     if (req.session.user.role === "manager") { // ensure that only managers access all-users page
//       const allUsers = await signup.find().sort({ $natural: -1 });
//       res.render("all-users", {
//         users: allUsers,
//       });
//     }else {
//       res.send("Only Managers can access this page")
//     }
//   } catch (error) {
//     res.status(400).send("Unable to find users in your db", error);
//   }
// });

// // edit user
// // get user update form
// router.get("/update-user/:id", async (req, res) => {
//   try {
//     const dbUser = await signup.findOne({ _id: req.params.id });
//     res.render("update-user", {
//       user: dbUser,
//     });
//   } catch (err) {
//     res.status(400).send("Unable to find user in the db");
//   }
// });

// // post updated user
// router.post("/update-user", async (req, res) => {
//   try {
//     await signup.findOneAndUpdate({ _id: req.query.id }, req.body);
//     res.redirect("/all-users");
//   } catch (err) {
//     res.status(404).send("Unable to update user in the db");
//   }
// });

// // delete User
// router.post("/delete-user", async (req, res) => {
//   try {
//     await signup.deleteOne({ _id: req.body.id });
//     res.redirect("back");
//   } catch (err) {
//     res.status(400).send("Unable to delete user in the db");
//   }
// });


// module.exports = router;