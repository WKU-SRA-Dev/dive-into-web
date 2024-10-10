const express = require('express');
const path = require('path');
const fs = require('fs');
// DANGER: This is a security risk, do not mimic this in your production
// we do this because we are running a local server for demo purposes

const router = express.Router();

router.use(express.static(path.join(__dirname, '../../../')));

router.get('*', (req, res) => {
    const filePath = decodeURI(req.path);
    if (!fs.existsSync(filePath)) {
        res.status(404).sendFile(path.join(__dirname, '../../../', 'pages', '404', 'index.html'));
        return;
    }
    res.sendFile(filePath);
});

module.exports = router;