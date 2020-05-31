const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello, world with express!')
});

app.listen(3100, () => {
    console.log('Application started in port 3000')
});