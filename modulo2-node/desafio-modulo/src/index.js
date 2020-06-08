const express = require('express');
const fs = require('fs').promises;
const gradesRouter = require('./routes/gradesRoutes.js')

const app = express();

app.use(express.json());
app.use('/grades', gradesRouter); 

app.listen(3100, () => {
    console.log('Grandes on port 3100')
});