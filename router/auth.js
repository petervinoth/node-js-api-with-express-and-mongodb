const express=require('express');


const {register,login,me}=require('../controller/auths');

const {protect,authorize}=require('../middle/auth');
const router = express.Router();




router.post('/register',register);

router.post('/login',login);



router.get('/details', protect, me);

module.exports=router;