const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const { trusted } = require('mongoose')


const registerUser = asyncHandler( async (req, res) => {

    const { name, email, password} = req.body

    if(!name || !email || !password) {
        res.status(400)
        throw new Error('Please add text to all fields.')

    }

    //check if user exists

    const userExists = await User.findOne({email})

    if(userExists){
        res.status(400)
        throw new Error('This User Already Exists.')
    }
    //hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if(user){
        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email
        })
    } else {
        res.status(400)
        throw new Error('Invalid User Data')
    }

})








const loginUser = asyncHandler(async (req, res) => {
    res.json({message: 'Login a User'})
})





const getMe = asyncHandler(async (req, res) => {
    res.json({message: 'Current User displayed'})
})




module.exports = {
    registerUser,
    loginUser, 
    getMe
}