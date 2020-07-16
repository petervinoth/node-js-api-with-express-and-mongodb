const mongoose=require('mongoose');
const express=require('express');

const User=require('../Model/User');

//user register
exports.register=async (req,res,next)=>{
    const {name,email,password,role}=req.body;
        const user=await User.create({
            name,
            email,
            password,
            role
        });
        console.log(req.body);
        //get token
        sendtokenresponse(user, 200, res);
    
}

//user login
exports.login=async (req,res,next)=>{
    const {email,password}=req.body;
    
    if(!email || !password){
        res.status(400).json({success:'pls email and password provide'});
    }
 
    const user=await User.findOne({email}).select('+password');

    if(!user){
        res.status(401).json({success:'invalid centails'});
    }
     
    //password mathch
    const ismatch=await user.matchpass(password);
    if(!ismatch){
        res.status(401).json({success:'invalid centails'});
    }
       
    sendtokenresponse(user, 200, res);
    
}

//cookie parser
const sendtokenresponse=(User,statusCode,res)=>{
    const  token =User.generateJwt();
    const options = {
        expires: new Date(
          Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httponly:true
};

    res
    .status(statusCode)
    .cookie('token', token, options)
    .json({
      success: true,
      token
    });

}

//get user details
exports.me=async (req,res,next)=>{
    const user=await User.findById(req.user.id);

    res.status(200).json({success:true,data:user});
}