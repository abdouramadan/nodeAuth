const User = require('../models/User')


const handleErrors = (err) =>
{

    // console.log(err.message, err.code)
    let errors = {email: '', password: ''}

    if(err.code === 11000)
    {
        errors.email = 'That email is already registered'
        return errors
    }

    if(err.message.includes('users validation failed'))
    {
        /* 
        *    Object.values(err.errors).forEach(error => {
        *       console.log(error.properties)
        *   }) 
        */

        // @or
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message
        })
    }

    return errors
}


module.exports.signup_get = (req, res) => {
    res.render('signup')
}

module.exports.login_get = (req, res) => {
    res.render('login')
}

module.exports.signup_post = async (req, res) => {
    
    const { email, password } = req.body

    try
    {
        const user = await User.create({email, password})
        res.status(201).json(user)
    } catch(err) {
        const errors = handleErrors(err)
        res.status(400).send(errors)
    }
}

module.exports.login_post = (req, res) => {
    res.send('login post')
}