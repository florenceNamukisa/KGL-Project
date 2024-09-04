const express = require('express');
const router = express.Router();

// Route to render the stock page
router.get('/stock-view', (req, res) => {
    res.render('stock-view');  // Renders the 'viewStock.pug' template
});

module.exports = router;
