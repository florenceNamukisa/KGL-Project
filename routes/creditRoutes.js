const express = require('express');
const router = express.Router();
const Credit = require('../models/credit');

// Render the credit registration form
router.get('/registerCredit', (req, res) => {
  res.render('credit', { credit: {} });
});

// Handle credit registration
router.post('/registerCredit', async (req, res) => {
  try {
    const newCredit = new Credit(req.body); 
    await newCredit.save();
    res.redirect('/credit');
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to register credit');
  }
});

// Render the list of credits
router.get('/credit', async (req, res) => {
  try {
    const credits = await Credit.find(); // Changed variable name to 'credits' to avoid confusion
    res.render('credit-list', { credit: credits});
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to fetch credit');
  }
});

// Render the edit form for a specific credit
router.get('/edit-credit/:id', async (req, res) => {
  try {
    const credit = await Credit.findById(req.params.id);
    res.render('credit', { credit: credit || {} });
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to fetch credit for editing');
  }
});

//updating the credit
router.post('/update-credit/:id', async (req, res) => {
  try {
    await Credit.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/credit');
    } catch (err) {
    console.error(err);
    res.status(404).send('Unable to update credit in the database');
    }
  });

// Handle credit deletion
router.post('/delete-credit', async (req, res) => { // Fixed endpoint name to '/delete-credit'
  try {
    await Credit.deleteOne({ _id: req.body.id });
    res.redirect('/credit');
  } catch (err) {
    console.error(err);
    res.status(400).send('Unable to delete credit in the database');
  }
});

module.exports = router;
