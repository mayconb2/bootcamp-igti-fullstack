const express = require('express');
const router = express.Router();
const fs = require('fs');

const accountsJson = './accounts/accounts.json';


router.get('/', (req, res) => {

    fs.readFile(accountsJson,'utf8',(err,data) => {
        if (err) {
            res.status(500).send({error: err.message});
            return;
        }

        let existentsAccounts = JSON.parse(data);

        delete existentsAccounts.nextID;

        res.send(existentsAccounts);

    });

});

router.get('/:id', (req,res) => {

    const id = req.params.id;
    console.log(id);

});

router.post('/' , (req,res) => {
    
    let reqAccount = req.body;

    fs.readFile(accountsJson, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send({error: err.message});
            return;
        }
        
        let existentsAccounts = JSON.parse(data);

        let newAccount = {id: existentsAccounts.nextID, ...reqAccount}
        existentsAccounts.nextID += 1;
        existentsAccounts.accounts.push(newAccount);

        fs.writeFile(accountsJson, JSON.stringify(existentsAccounts),err => {
            
            if (err) {
                res.status(500).send({error: err.message});
                return;
            }

            res.send('Conta cadastrada com sucesso!');
        });
        
        
    });
    
});

module.exports = router;