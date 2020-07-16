

const mongoose=require('mongoose');
const express=require('express');
const asyncHandler=require('../middle/asyn');
const User=require('../Model/User');
const ErrorResponse=require('../middle/errorresponse');


exports.getUser = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id);
  
    if (!user) {
        return next(
          new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
        );
      }
    
      res.status(200).json({ success: true, data: user });
    });
  
  
  // @desc      Create user
  // @route     POST /api/v1/auth/users
  // @access    Private/Admin
  exports.createUser = asyncHandler(async (req, res, next) => {
    const user = await User.create(req.body);
  
    res.status(201).json({
      success: true,
      data: user
    });
  });
  
  // @desc      Update user
  // @route     PUT /api/v1/auth/users/:id
  // @access    Private/Admin
  exports.updateUser = asyncHandler(async (req, res, next) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
  
    res.status(200).json({
      success: true,
      data: user
    });
  });
  
  // @desc      Delete user
  // @route     DELETE /api/v1/auth/users/:id
  // @access    Private/Admin
  exports.getall = asyncHandler(async (req, res, next) => {
    try{
        const user=await User.find();
        res.status(200).json({success:true,count:user.length,data:user});
    }
    catch(err){

        res.status(401).json({success:false});
    }
  });
  
  // @desc      Delete user
  // @route     DELETE /api/v1/auth/users/:id
  // @access    Private/Admin
  exports.deleteUser = asyncHandler(async (req, res, next) => {
    await User.findByIdAndDelete(req.params.id);
  
    res.status(200).json({
      success: true,
      data: {}
    });
  });
  