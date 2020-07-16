const mongoose=require('mongoose');
const asyncHandler=require('../middle/asyn');
const ErrorResponse=require('../middle/errorresponse');
const Bootcamp=require('../Model/Bootcamp');
const { param } = require('../router/boot');
const path=require('path');

//create bootcamp
exports.registerboot=asyncHandler(async (req,res,next)=>{
    const boot=await Bootcamp.create(req.body);

    res.status(200).json({success:true,data:boot});
});

//find all bootcamp
exports.selectall=asyncHandler(async (req,res,next)=>{
  //  console.log(req.query);
    try{
        const bootcamps=await Bootcamp.find();
        res.status(200).json({success:true,count:bootcamps.length,data:bootcamps});
    }
    catch(err){

        res.status(401).json({success:false});
    }
});

//find one bootcamp

exports.getBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findById(req.params.id);
  
    if (!bootcamp) {
      return next(
        new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
      );
    }
  
    res.status(200).json({ success: true, data: bootcamp });
  });


 

//update bootcamp
exports.updateBootcamp = asyncHandler(async (req, res, next) => {
    let bootcamp = await Bootcamp.findById(req.params.id);
  
    if (!bootcamp) {
      return next(
        new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
      );
    }
  
    // Make sure user is bootcamp owner
    if ( req.user.role == 'admin'&& req.user.role=='publisher') {
      return next(
        new ErrorResponse(
          `User ${req.params.id} is not authorized to update this bootcamp`,
          401
        )
      );
    }
  
    bootcamp = await Bootcamp.findOneAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
  
    res.status(200).json({ success: true, data: bootcamp });
  });

//delete bootcamp
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findById(req.params.id);
  
    if (!bootcamp) {
      return next(
        new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
      );
    }
  
    // Make sure user is bootcamp owner
    if ( req.user.role == 'admin'&&req.user.role=='publisher') {
      return next(
        new ErrorResponse(
          `User ${req.params.id} is not authorized to delete this bootcamp`,
          401
        )
      );
    }
  
    bootcamp.remove();
  
    res.status(200).json({ success: true, data: {} });
  });

    
 //delete bootcamp
exports.fileupload = asyncHandler(async (req, res, next) => {
    const bootcamps=await Bootcamp.findById(req.params.id);
        
    if(!bootcamps){
        return   next(new ErrorResponse('not found id ${trq.params.id}',400));
       }
   if(!req.files){
    return   next(new ErrorResponse('pls upload photo',400));
   
   }   
   const file =req.files.file;

   //make sure the image is a photo
   if(!file.mimetype.startsWith('image')){
    return   next(new ErrorResponse('pls upload image file',400));
   }

   //check filesize
   if(file.size>process.env.MAX_FILE_UPLOAD){
    return   next(new ErrorResponse('pls upload image file less then limited size',400));
   }

   //create custom filename
   file.name=`photo_${bootcamps._id}${path.parse(file.name).ext}`;

   file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
    if (err) {
      console.error(err);
      return next(new ErrorResponse(`Problem with file upload`, 500));
    }

    await Bootcamp.findByIdAndUpdate(req.params.id, { photo: file.name });

     res.status(200).json({
      success: true,
      data: file.name
    });
  });

});


        















