const jwt = require('jsonwebtoken');

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

module.exports = { requireAuth };