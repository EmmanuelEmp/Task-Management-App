const express = require('express');
const { authUser, checkUser }= require('../middleware/validateToken')

const router = express.Router();
const userController = require('../controllers/userController')

router.get('*', checkUser);
router.get('/', userController.homePage_get)
router.get('/signup', userController.signupUser_get)
router.post('/signup', userController.signupUser_post)
router.get('/login', userController.loginUser_get)
router.post('/login', userController.loginUser)
router.get('/logout', userController.logOut);


 
module.exports = router;