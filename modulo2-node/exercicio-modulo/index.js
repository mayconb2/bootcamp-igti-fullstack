const express = require('express');
const fs = require('fs');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello, world in EXPRESS!');
});

app.post('/account' , (req,res) => {
    
    let reqAccount = req.body;

    fs.readFile('./accounts/accounts.json', 'utf8', (err, data) => {
        if (err) {
            throw err;
        }
        
        existentsAccounts = JSON.parse(data);

        let newAccount = {id: existentsAccounts.nextID, ...reqAccount}
        existentsAccounts.nextID += 1;
        existentsAccounts.accounts.push(newAccount);

        fs.writeFile('./accounts/accounts.json', JSON.stringify(existentsAccounts),err => {
            
            if (err) {
                console.error('Erro ao cadastrar: ' + err);
                res.send('Erro ao cadastrar conta');
            }

            res.send('Conta cadastrada com sucesso!');
        });
        
        
    });
    
});

app.listen(3100, () => {
       
    fs.readFile('./accounts/accounts.json', 'utf8', (err,_) => {

        
        if(err) {
        
            let accountZero = `{"nextID" : 1, "accounts" : []}`;
    
            fs.writeFile('./accounts/accounts.json', accountZero, err => {
                console.error('Criado arquivo accounts.json e iniciado Express na porta 3100...')
            });
            
        } else {
            console.log('Arquivo accounts.json já criado. Express iniciado na porta 3100...')
        }
        
    });

});