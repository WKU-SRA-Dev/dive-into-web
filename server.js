const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));


app.get('*', (req, res) => {
    console.log(req.path);
    const filePath = path.join(__dirname,'public', 'pages', `${req.path}`, 'index.html');
    res.status(200).sendFile(filePath, (err) => {
        if (err) {
            res.status(404).sendFile(path.join(__dirname,'public', 'pages', '404','index.html'));
        }
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
    }
);