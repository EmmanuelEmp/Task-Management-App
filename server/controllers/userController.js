const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// handle errors
const handleErrors =  (err) => {
    console.log(err.message, err.code)
    let errors = { username: '', email: '', password: ''  }

    // duplicate error code
    if (err.code === 11000) {
        errors.email = 'The email is already registered';
        return errors;
    }

    // // incorrect email or username
    if(err.message === 'incorrect email' ){
        errors.email = 'email is not valid';
    }
    //incorrect password
    if(err.message === 'incorrect password' ){
        errors.password = 'password is incorrect';
    }

    // validation errors
   
   if (err.message.includes('User validation failed')){
       console.log(Object.values(err.errors))
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        });
    }
   return errors;
}
 // generate access token
const generateAccessToken = (id) => {
 return jwt.sign({ id }, process.env.SECRET_TOKEN, { expiresIn: "30d" });
};


//@homepage
//@route GET /
//@access public

exports.homePage_get = (req, res) => {
    res.render('homepage', { layout: 'layouts/userLayout' })
}

//@signup
//@route GET /signup
//@access public

exports.signupUser_get = (req, res) => {
    res.render('signup', { layout: 'layouts/userLayout' })
}

//@register
//@route POST /signup
//@access public
exports.signupUser_post = async (req, res) => {
    const { username, email, password } = req.body;
   

    try {

        // Create a new user
        const user = await User.create({
            username,
            email,
            password,
        })
        const token = generateAccessToken(user._id);

         res.cookie('jwt', token, {
             httpOnly: true, //not to be accessed via frontend javascript eg console
             secure: process.env.NODE_ENV !== 'development',
             sameSite: 'strict',
             maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in seconds
         });
        console.log('User created successfully');
        user.password = undefined;

        // Send a JSON response
        //console.log(user);
        res.status(200).json({ user: user._id});
 
    } catch (err) {
        console.error(err); // Log the error for debugging purposes

        const errors = handleErrors(err)
        res.status(400).json({ errors });
       // .redirect("/");
    }
}


//@login
//@route GET /login
//@access public

exports.loginUser_get = (req, res) => {
        res.render('login', { layout: 'layouts/userLayout' })
}

//@ login  user
//@route POST /login
//@access public

exports.loginUser = async (req, res) => {
 const { password, email }  = req.body;
 
 try {
    const user = await User.login(email, password);
   
        const token = generateAccessToken(user._id);
         // set the token in the response cookie
         res.cookie('jwt', token, {
            httpOnly: true, // not be accessed via frontend javascript eg console
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict',
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in seconds
        });
        res.status(200).json({ user: user._id });
         //console.log(user)
 } catch (err) {
    const errors = handleErrors(err)
    res.status(400).json({ errors });
 }
}

//@ logout  user
//@route GET /logout
//@access public
exports.logOut = async (req, res ) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/login')
}