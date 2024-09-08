const express = require('express');
const router = express.Router();
const Sales = require('../models/sales');
const Produce = require('../models/produce');

// Route to display all sales
router.get('/sales', async (req, res) => {
  try {
    const sales = await Sales.find();
    res.render('sales-list', { sales });
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to fetch sales');
  }
});

// Route to render the Add Sale page
router.get('/addSale', (req, res) => {
  res.render('sale', { sale: {} });
});

// Route to handle adding a new sale and generating a receipt
router.post('/addSale', async (req, res) => {
  try {
    const { produceName, tonnage } = req.body;
    const produce = await Produce.findOne({ produceName });

    if (!produce || produce.tonnage < tonnage) {
      return res.status(400).send('Insufficient stock');
    }

    // Deduct from stock
    produce.tonnage -= tonnage;
    await produce.save();

    // Add sale
    const newSale = new Sales({
      produceName: req.body.produceName,
      tonnage: req.body.tonnage,
      amountPaid: req.body.amountPaid,
      buyerName: req.body.buyerName,
      salesAgentName: req.body.salesAgentName,
      branch: req.body.branch,
      dateTime: new Date() // Assign current date/time
    });

    await newSale.save();

    // Redirect to the receipt page for the newly created sale
    res.redirect(`/receipt/${newSale._id}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error processing sale');
  }
});

// Route to render the receipt for a specific sale
router.get('/receipt/:id', async (req, res) => {
  try {
    const sale = await Sales.findById(req.params.id);
    if (!sale) {
      return res.status(404).send('Sale not found');
    }

    // Render the receipt page with the sale details
    res.render('receipt', { sale });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching receipt');
  }
});

// Route to render the Edit Sale form
router.get('/edit-sale/:id', async (req, res) => {
  try {
    const sale = await Sales.findById(req.params.id);
    res.render('sale', { sale: sale || {} });
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
    res.redirect('/sales');
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to update sale');
  }
});

// Route to handle deleting a sale
router.post('/delete-sale', async (req, res) => {
  try {
    await Sales.findByIdAndDelete(req.body.id);
    res.redirect('/sales');
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to delete sale');
  }
});

module.exports = router;
