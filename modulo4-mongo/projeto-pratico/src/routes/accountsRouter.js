const express = require('express')
const router = express.Router()
const accountController = require('./../controller/accountController.js')

const {getAllAccounts, deposit, draw, getBalanceFromAccount, deleteAccount} = accountController

router.get('/', getAllAccounts)

router.put('/deposit', deposit)

router.put('/draw', draw)

router.get('/getBalanceFromAccount', getBalanceFromAccount)

router.delete('/deleteAccount', deleteAccount)


module.exports = router