const express = require('express')
const router = express.Router()
const accountModel = require('./../models/account.js')


router.get('/', async (req, res) => {
    // res.send('Hit the account route')

    try {

        const accounts = await accountModel.find()
        res.send(accounts)

    } catch (error) {
        res.status(500).send(Error)
        console.log(`Error to find accounts: ${error}`)
    }

})

module.exports = router