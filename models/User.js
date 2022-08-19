const Joi = require ('joi');
const mongoose = require('mongoose')
const Schema = mongoose.Schema


const userSchema = new Schema({
    name:
    {
        type: String
    },
    email:
    {
        type: String,
        unique: true
    },
    phone:
    {
        type: String,
        unique: true
    },
    password:
    {
        type: String
    }
}, { timestamp: true })




const User = mongoose.model('User', userSchema )

module.exports = User;