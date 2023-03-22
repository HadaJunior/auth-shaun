const jwt = require('jsonwebtoken');
const User = require('../models/User');

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    //verify if the token exists and verified
    if(token){
        jwt.verify(token, process.env.SECRET, (err, decodedToken) =>{
            if(err){
                console.log(err.message);
                res.redirect('/smoothies/login');
            }else{
                next();
            }
        });
    }
    else{
        res.redirect('/smoothies/login');
    }
}

const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;

    if(token){
        jwt.verify(token, process.env.SECRET, async (err, decodedToken) => {
            if(err){
                res.locals.user = null;
                next();
            }else{
                try {
                    let user = await User.findById(decodedToken.id);
                    res.locals.user = user; 
                    next();  
                } catch (error) {
                    console.log(error);
                    next();
                }             
            }
        });
    }
    else{
        res.locals.user = null;
        next();
    }
}

module.exports = { requireAuth, checkUser };