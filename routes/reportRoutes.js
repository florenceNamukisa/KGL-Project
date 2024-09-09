const express = require('express');
const router = express.Router();
const Produce = require('../models/produce');
const Sales = require('../models/sales');

// Route to render the report page
router.get('/report', (req, res) => {
  res.render('report'); // Render the Pug template
});

// Route to fetch data for the report
router.get('/report-data', async (req, res) => {
  try {
    const produceData = await Produce.find();
    const salesData = await Sales.find();

    // Calculate total produce, total sales, stock levels, and total revenue
    const totalProduce = produceData.reduce((sum, p) => sum + p.tonnage, 0);
    const totalSales = salesData.reduce((sum, s) => sum + s.tonnage, 0);
    const availableStock = produceData.reduce((sum, p) => sum + p.stockLevel, 0);

    res.json({
      totalProduce,
      totalSales,
      availableStock,
      salesData,
      stockData: produceData.map(p => ({ name: p.produceName, stock: p.stockLevel }))
    });
  } catch (err) {
    console.error('Error fetching report data:', err);
    res.status(500).send('Failed to fetch report data');
  }
});

module.exports = router;
