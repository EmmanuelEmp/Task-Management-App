const jwt = require('jsonwebtoken')
const User = require('../models/userModel');

const authUser = (req, res, next) => {
    let token;
    //get the token from the cookies
    token = req.cookies.jwt;

    //check if jwt exists and is verified
    if(token) {
        jwt.verify(token, process.env.SECRET_TOKEN, (err, decodedToken) => {
           
            if (err) {
                //console.log(err.message);
                res.redirect('/login');
            } else {
                //console.log(decodedToken);
                req.user = { _id: decodedToken.id }
                next();
            }
           
        }); 

        
    } else {
        res.redirect('/login')
        //res.status(401).json('Not authorized, no token')
        next()
    }
}

// check current user
const checkUser = (req, res, next) => {
    let token;
    token = req.cookies.jwt;

    //check if jwt exists and is verified
    if(token) {
        jwt.verify(token, process.env.SECRET_TOKEN, async (err, decodedToken) => {
            if(err) {
                console.log(err.message);
                res.locals.user = null;
                next();
            } else {
                //console.log(decodedToken);
                let user = await User.findById(decodedToken.id )
                res.locals.user = user;
                next();
            }
        }); 
     } 
     else {  
        res.locals.user = null;
        next();
        }
}

module.exports = { authUser, checkUser}