const User = require('../models/User');

const handleError = (err) => {
    let errors = { email: '', password: '' }

    //duplicate key errors
    if(err.code === 11000){
        errors.email = 'That email is already registered';
        return errors;
    }
    //validation errors
    if(err.message.includes('User validation failed')){ 
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }

    return errors;
}

module.exports.signup_get = (req, res) => {
    res.render('signup');
}

module.exports.signup_post = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const user = await User.create({ email, password });
        res.status(201).json(user);
    } catch (error) {
        const errors = handleError(error);
        res.status(400).json({ errors });
    }
}

module.exports.login_get = (req, res) => {
    res.render('login');
}

module.exports.login_post = (req, res) => {
    const { email, password } = req.body;
    
    console.log(email, password);
    res.send('new login');
}