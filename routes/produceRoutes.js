const express = require('express');
const router = express.Router();
const Produce = require('../models/produce');

// Render the produce registration form
router.get('/addProduce', (req, res) => {
  res.render('produce', { produce: {} });
});

// Handle produce registration
router.post('/addProduce', async (req, res) => {
  try {
    const newProduce = new Produce(req.body); 
    console.log(newProduce);

    await newProduce.save();
    res.redirect('/produce');
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to register produce');
  }
});

// Render the list of procuments
router.get('/produce', async (req, res) => {
  try {
    const produce = await Produce.find(); 
    res.render('produce-list', { produce: produce});
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to fetch procuments');
  }
});

// Render the edit form for a specific procuments
router.get('/edit-produce/:id', async (req, res) => {
  try {
    const produce = await Produce.findById(req.params.id);
    res.render('produce', { produce: produce || {} });
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to fetch procuments for editing');
  }
});

//updating the credit
router.post('/update-produce/:id', async (req, res) => {
  try {
    await Produce.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/produce');
    } catch (err) {
    console.error(err);
    res.status(404).send('Unable to update procuments in the database');
    }
  });

// Handle credit deletion
router.post('/delete-produce', async (req, res) => { //delete-credit'
  try {
    await Produce.deleteOne({ _id: req.body.id });
    res.redirect('/produce');
  } catch (err) {
    console.error(err);
    res.status(400).send('Unable to delete produce in the database');
  }
});

module.exports = router;
