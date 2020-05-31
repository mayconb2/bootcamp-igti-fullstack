const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello, world in EXPRESS!');
});

app.listen(3100, () => console.log('Express started in port 3100...'));