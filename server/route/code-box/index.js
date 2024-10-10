const express = require('express');
const path = require('path');

const router = express.Router();

router.get('*', (req, res) => {
    const filePath = decodeURI(req.url);
    res.sendFile(path.join(__dirname, '../../../', 'demo', filePath));
});


module.exports = router;