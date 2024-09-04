
const express = require('express');
const router = express.Router();

// Route for the agent dashboard
router.get('/agent-dashboard', (req, res) => {
res.render('agent-dashboard');
});
// Route for the produce page
// router.get('/produce', (req, res) => {
//   res.render('produce'); // Renders the produce.pug
// });

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
    const sale = await Sale.find(); // Fetch all sales from the database

    // Ensure `sales` is always an array, even if no sales are found
    res.render('sales-list', { sale: sale || {} });
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to fetch sales');
  }
});


module.exports = router;
