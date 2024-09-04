const express = require('express');
const router = express.Router();

// Route to render the homepage
router.get('/', (req, res) => {
    res.render('index');  // Renders the 'index.pug' template
});

module.exports = router;
