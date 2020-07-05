// const express = require('express')
const accountModel = require('./../models/account.js')

const getAllAccounts = async (req, res) => {

    try {

        const accounts = await accountModel.find()
        res.send(accounts)

    } catch (error) {
        res.status(500).send(Error)
        console.log(`Error to find accounts: ${error}`)
    }

}

const deposit = async (req,res) => {
    
    try {
        const {agencia, conta, value} = req.body

        if(value < 0) {
            res.status(400).send('Não é permitdo depósito de valores negativos')
            return;
        }

        const accountWithDeposit = await accountModel.findOneAndUpdate(
            {agencia, conta}, 
            {$inc: {balance: value}},
            {new: true}
        )

        if(!accountWithDeposit) {
            throw new Error('Agencia ou Conta errados')
        }
        
        res.status(200).send(accountWithDeposit)

    } catch (error) {
        res.status(500).send('Erro ao localizar conta ou agência')
        console.log(`Error to find account or banck branch: ${error}`)
    }

}

const draw = async (req, res) => {

    try {
        const {agencia, conta, value} = req.body

        if(value < 0) {
            res.status(400).send('Não é permitdo saque de valores negativos')
            return;
        }

        const account = await accountModel.findOne({conta, agencia})
        
        if(!account) {
            throw new Error('Agencia ou Conta errados')
        }

        const newBalance = account.balance - value - 1

        if (newBalance < 0) {
            res.status(400).send(`Saque não permitido: saldo insuficiente`)
            return
        }

        const accountWithDraw = await accountModel.findOneAndUpdate(
            {agencia, conta}, 
            {$set: {balance: newBalance}},
            {new: true}
        )

        res.status(200).send(accountWithDraw)


    } catch (error) {
        res.status(500).send('Erro ao localizar conta ou agência')
        console.log(`Error to find account or banck branch: ${error}`)
    }
}

const getBalanceFromAccount = async (req, res) => {
    try {
        const {agencia, conta} = req.body

        const account = await accountModel.findOne({conta, agencia})
        
        if(!account) {
            throw new Error('Agencia ou Conta errados')
        }

        res.status(200).send(account)

    } catch (error) {
        res.status(500).send('Erro ao localizar conta ou agência')
        console.log(`Error to find account or banck branch: ${error}`)
    }
}

const deleteAccount = async (req, res) => {

    try {

        const {agencia, conta} = req.body

        const accountDeleted = await accountModel.deleteOne({agencia,conta})

        if (accountDeleted.deletedCount === 0) {
            throw new Error('Agencia ou Conta errados')
        }

        const accountsInBrabch = await accountModel.countDocuments({agencia})

        res.status(200).send({contasNaAgencia: accountsInBrabch})

    } catch (error) {

        res.status(500).send('Erro ao localizar conta ou agência')
        console.log(`Error to find account or banck branch: ${error}`)

    }
}

const transfer = async (req, res) => {



}

module.exports = {
    getAllAccounts,
    deposit,
    draw,
    getBalanceFromAccount,
    deleteAccount
}