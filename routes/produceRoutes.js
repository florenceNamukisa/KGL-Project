const express = require('express');
const router = express.Router();
const Produce = require('../models/produce'); // Import the Produce model

// Route to render the Produce List page
router.get('/produce', async (req, res) => {
  try {
    const produce = await Produce.find(); // Fetch all produce from the database
    res.render('produce-list', { produce }); // Render the produce-list.pug view with the produce data
  } catch (err) {
    console.error('Error fetching produce:', err);
    res.status(500).send('Failed to fetch produce');
  }
});

// Route to render the Add Produce page
router.get('/addProduce', (req, res) => {
  res.render('produce', { produce: {} }); // Render the produce.pug view with an empty produce object for a new produce
});

// Route to handle adding a new produce
router.post('/addProduce', async (req, res) => {
  try {
    const newProduce = new Produce({
      produceName: req.body.produceName,
      produceType: req.body.produceType,
      date: new Date(req.body.date),
      time: req.body.time,
      tonnage: req.body.tonnage,
      cost: req.body.cost,
      dealerName: req.body.dealerName,
      branch: req.body.branch,
      contact: req.body.contact,
      sellingPrice: req.body.sellingPrice,
    });
    console.log(newProduce);
    await newProduce.save();
    res.redirect('/produce'); // Redirect to the produce list page after successful addition
  } catch (err) {
    console.error('Error adding produce:', err);
    res.status(500).send('Failed to add produce');
  }
});

// Route to render the Edit Produce form
router.get('/edit-produce/:id', async (req, res) => {
  try {
    const produce = await Produce.findById(req.params.id); // Fetch the specific produce by ID
    if (!produce) {
      return res.status(404).send('Produce not found');
    }
    res.render('produce', { produce }); // Render the produce.pug view with the produce data
  } catch (err) {
    console.error('Error fetching produce for editing:', err);
    res.status(500).send('Failed to fetch produce for editing');
  }
});

// Route to handle updating a produce
router.post('/update-produce/:id', async (req, res) => {
  try {
    const produce = await Produce.findByIdAndUpdate(req.params.id, {
      produceName: req.body.produceName,
      produceType: req.body.produceType,
      date: new Date(req.body.date),
      time: req.body.time,
      tonnage: req.body.tonnage,
      cost: req.body.cost,
      dealerName: req.body.dealerName,
      branch: req.body.branch,
      contact: req.body.contact,
      sellingPrice: req.body.sellingPrice,
    }, { new: true }); // Return updated document
    if (!produce) {
      return res.status(404).send('Produce not found for update');
    }
    res.redirect('/produce'); // Redirect to the produce list page after successful update
  } catch (err) {
    console.error('Error updating produce:', err);
    res.status(500).send('Failed to update produce');
  }
});

// Route to handle deleting a produce
router.post('/delete-produce', async (req, res) => {
  try {
    await Produce.findByIdAndDelete(req.body.id); // Delete the specific produce by ID
    res.redirect('/produce'); // Redirect to the produce list page after successful deletion
  } catch (err) {
    console.error('Error deleting produce:', err);
    res.status(500).send('Failed to delete produce');
  }
});
router.get('/stock-view', async (req, res) => {
  try {
    const produce = await Produce.aggregate([
      { 
        $match: { produceName: { $in: ['Beans', 'Maize', 'Soyabeans', 'Cowpeas', 'Gnuts', 'Rice'] } }  
      },
      { 
        $group: { 
          _id: '$produceName', 
          totalTonnage: { $sum: '$tonnage' }  
        } 
      }
    ]);

    
    const produceData = produce.map(item => ({
      produceName: item._id,  
      tonnage: item.totalTonnage || 0 
    }));

    res.render('stock-view', {
      produce: produceData,  
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
