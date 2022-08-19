const Joi = require('joi');
const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
dotenv.config();


const Authroutes = require("./routes/Auth")
mongoose.connect(process.env.DB_DATA)

const db = mongoose.connection

db.on("error", (err) => {
    console.log(err);
})

db.once('open', () => {
    console.log('database is connected successfully');
})
const app = express();
app.use(morgan("dev"))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`server running on port ${PORT}`))

app.use('/api', Authroutes)

