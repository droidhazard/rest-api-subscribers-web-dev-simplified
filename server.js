require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
// require('dotenv').config('./.env')

const app = express()
mongoose.connect(process.env.DATABASE_URL)

const db = mongoose.connection
db.on('error', (err) => {
    console.error(err)
})

db.once('open', () => {
    console.log('Connected to Database!');
})

app.use(express.json())

const subscribersRouter = require('./routes/subscribers')

app.use('/subscribers', subscribersRouter)

app.listen(3000, () => {
    console.log('Server Started!')
})