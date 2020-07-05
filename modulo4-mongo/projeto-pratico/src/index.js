require('dotenv').config();
const express = require('express')
const app = express()
const accountsRouter = require('./routes/accountsRouter.js')
const mongoose = require('mongoose')


const dbName = process.env.DB_NAME
const mongoUser = process.env.DB_USER
const mongoPassword = process.env.DB_PW

app.use(express.json())

app.use('/accounts', accountsRouter);

(async () => {
    try {
        console.log('Starting connection...')
        await mongoose.connect(
            `mongodb+srv://${mongoUser}:${mongoPassword}@igti-bootcamp-model-4.hpr7d.mongodb.net/${dbName}?retryWrites=true&w=majority`,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
                useCreateIndex: true
            })
        console.log('Database connected')
    } catch (error) {
        console.log(`Error to connect on Database: ${error}`)
    }
})()


app.listen(3001, () => console.log('Server started on port 3001'));