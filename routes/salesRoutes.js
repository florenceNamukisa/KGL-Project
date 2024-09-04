const express = require('express');
const router = express.Router();
const Sales = require('../models/sales');

// Route to display all sales
router.get('/sales', async (req, res) => {
  try {
    const sales = await Sales.find(); // Fetch all sales from the database
    res.render('sales-list', { sales }); // Render the sales-list.pug view with the sales data
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to fetch sales');
  }
});

// Route to render the Add Sale page
router.get('/addSale', (req, res) => {
  res.render('sale', { sale: {} }); // Render the sale.pug view with an empty sale object for a new sale
});

// Route to handle adding a new sale
router.post('/addSale', async (req, res) => {
  try {
    const newSale = new Sales({
      produceName: req.body.produceName,
      tonnage: req.body.tonnage,
      amountPaid: req.body.amountPaid,
      buyerName: req.body.buyerName,
      salesAgentName: req.body.salesAgentName,
      branch: req.body.branch,
      dateTime: new Date(req.body.dateTime),
    });

    await newSale.save();
    res.redirect('/sales'); // Redirect to the sales list page after successful addition
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to add sale');
  }
});

// Route to render the Edit Sale form
router.get('/edit-sale/:id', async (req, res) => {
  try {
    const sale = await Sales.findById(req.params.id); // Fetch the specific sale by ID
    res.render('sale', { sale: sale || {} }); // Render the sale.pug view with the sale data or an empty object
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to fetch sale for editing');
  }
});

// Route to handle updating a sale
router.post('/update-sale/:id', async (req, res) => {
  try {
    await Sales.findByIdAndUpdate(req.params.id, {
      produceName: req.body.produceName,
      tonnage: req.body.tonnage,
      amountPaid: req.body.amountPaid,
      buyerName: req.body.buyerName,
      salesAgentName: req.body.salesAgentName,
      branch: req.body.branch,
      dateTime: new Date(req.body.dateTime),
    });
    res.redirect('/sales'); // Redirect to the sales list page after successful update
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to update sale');
  }
});

// Route to handle deleting a sale
router.post('/delete-sale', async (req, res) => {
  try {
    await Sales.findByIdAndDelete(req.body.id); // Delete the specific sale by ID
    res.redirect('/sales'); // Redirect to the sales list page after successful deletion
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to delete sale');
  }
});

module.exports = router;
