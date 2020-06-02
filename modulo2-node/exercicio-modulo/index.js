const express = require('express');
const fs = require('fs');
const accountRouter = require('./routes/accountRoutes')


const accountsJson = './accounts/accounts.json';

const app = express();

app.use(express.json());
app.use('/account', accountRouter); 

app.get('/', (req, res) => {
    res.send('Hello, world in EXPRESS!');
});

app.listen(3100, () => {
       
    fs.readFile(accountsJson, 'utf8', (err,_) => {

        
        if(err) {
        
            let accountZero = `{"nextID" : 1, "accounts" : []}`;
    
            fs.writeFile(accountsJson, accountZero, err => {
                console.error('Criado arquivo accounts.json e iniciado Express na porta 3100...')
            });
            
        } else {
            console.log('Arquivo accounts.json já criado. Express iniciado na porta 3100...')
        }
        
    });

});