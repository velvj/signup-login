const Joi = require('joi')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')



const getUser = async (req, res) => {
    try {
        const getUser = await User.find().select(['-password', '-__v']);
        if (!getUser) { res.status(400).json("no data") }
        else { res.send(getUser); }
    } catch (error) {
        res.json({ error: error })
    }
}

const getid = async (req, res) => {
    try {
        const getid = await User.findById(req.params.id)
        if (!req.params.id) {
            return res.status(400).json({ error: "no id found" })
        }
        const data = { "name": getid.name, "email": getid.email, "phone": getid.phone };
        res.json(data);
    } catch (error) {
        res.json({ error: error })
    }
}

const editUser = async (req, res) => {
    try {
        const hashedPass = await bcrypt.hash(req.body.password, 10)
        const updated = await User.findOneAndUpdate({ _id: req.params.id },

            {
                $set: {

                    name: req.body.name,
                    email: req.body.email,
                    phone: req.body.phone,
                    password: hashedPass
                }
            }, { new: true });
        const data = { "name": updated.name, "email": updated.email, "phone": updated.phone };
        return res.status(200).json({ message: 'user details updated', data: data });
    } catch (err) {
        console.log('Details not found!!')
        res.json({ error: err })
    }
}

const deleteUser = async (req, res) => {
    try {
        const deleted = await User.findByIdAndDelete(req.params.id)
        if (!req.params.id) {
            return res.status(400).json({ error: "no id found" })
        } res.json(deleted)
    } catch (error) {
        res.json({ error: error })
    }
}







const register = async (req, res, next) => {
    try {
        const hashedPass = await bcrypt.hash(req.body.password, 10)
        let user = new User({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: hashedPass
        });
        const savedUser = await user.save();
        res.status(200).json({ status: 200, message: "success", data: savedUser });
    } catch (error) {
        console.log(error);
        if (error.code && error.code == 11000) {
            return res.status(400).json({ status: 400, message: "Already exists user!" });
        }
        res.status(400).json({ status: 400, message: error.message || error });
    }
}

const login = async (req, res, next) => {
    try {
        var username = req.body.username
        var password = req.body.password
        const user = await User.findOne({ $or: [{ email: username }] })

        if (user) {
            const result = await bcrypt.compare(password, user.password)
            console.log(result, user.password, password);

            if (result) {
                let token = jwt.sign({ name: user.name, _id: user._id }, "verySecretValue", { expiresIn: '1hr' })
                console.log(token);
                const data = { "name": user.name, "email": user.email, "phone": user.phone, "token": token };

                return res.status(200).json({ status: 200, message: 'login succesfully', data: data })

            }

            else {
                return res.json("incorrect password")
            }
        }
    } catch (error) {
        return res.status(400).json({ status: 400, message: error.message || error });
    }
}
module.exports = { register, login, getUser, getid, editUser, deleteUser }