const mongoose = require('mongoose')
const { isEmail } = require('validator')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please enter your email address'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please Enter Valid Email Address']
    },

    password: {
        type: String,
        required: [true, 'Please enter your password'],
        minlength: [6, 'minimum password length is 6 characters']
    }
})


userSchema.post('save', function(doc, next) {
    console.log('new user was saved', doc)
    next()
})

userSchema.pre('save', function(next) {
    console.log('user about to be saved ...', this)
    next()
})

const User = mongoose.model('users', userSchema)

module.exports = User