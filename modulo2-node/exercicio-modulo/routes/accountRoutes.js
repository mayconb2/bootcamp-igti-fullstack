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
    
    fs.readFile(accountsJson, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send({error: err.message});
            return;
        }

        let existentsAccounts = JSON.parse(data);

        accountByID = existentsAccounts.accounts.filter(account => {
            return account.id == id;
        });

        if (accountByID.length == 0) {
            res.status(400).send("Não foi possível encontrar nenhuma conta com este ID!");
            return;
        }

        res.status(200).send(accountByID);
    });

});

router.post('/' , (req,res) => {
    
    let accountFromReq = req.body;

    fs.readFile(accountsJson, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send({error: err.message});
            return;
        }
        
        let existentsAccounts = JSON.parse(data);

        let newAccount = {id: existentsAccounts.nextID, ...accountFromReq}
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


router.put('/', (req,res) => {

    let accountFromReq = req.body;
    // console.log(accountFromReq)
    
    fs.readFile(accountsJson, 'utf8', (err,data) =>{
        
        if (err) {
            res.status(500).send({error: err.message});
            return;
        }
        
        let existentsAccounts = JSON.parse(data);

        let acccountIndex = existentsAccounts.accounts.findIndex((account,index) => {
            return accountFromReq.id == account.id;
       });

       existentsAccounts.accounts[acccountIndex] = accountFromReq;

       fs.writeFile(accountsJson, JSON.stringify(existentsAccounts), err => {
        if (err) {
            res.status(500).send({error: err.message});
            return;
        }

        res.send('Conta alterada com sucesso!');
        
       })

    });

});

module.exports = router;