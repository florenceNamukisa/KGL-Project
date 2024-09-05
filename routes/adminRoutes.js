// adminRoutes.js
const express = require('express');
const router = express.Router();

// Route for the admin dashboard
router.get('/admin-dashboard', (req, res) => {
  const data = {
    totalSales: 0,
    totalReceipts: 0,
    totalStock: '0 kg',
    totalCredits: 0
  };

  res.render('admin-dashboard', data); // Renders the admin-dashboard.pug
});

// Route for the produce page
router.get('/produce', (req, res) => {
  res.render('produce-list'); 
});

// Route for the credit-sales page
router.get('/credit', (req, res) => {
  res.render('credit-list'); // Renders the credit-sales.pug
});

router.get('/logout', (req, res) => {
  res.render('logout'); // Renders the logout
});

// Route for the sales page
router.get('/sales', async (req, res) => {
  try {
    const sale = await sale.find(); // Fetch all sales from the database

    // Ensure `sales` is always an array, even if no sales are found
    res.render('sales-list', { sale: sale || [] });
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to fetch sales');
  }
});


module.exports = router;
