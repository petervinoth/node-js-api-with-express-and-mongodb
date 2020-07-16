const jwt=require('jsonwebtoken');
const User=require('../Model/User');

//protect routes

exports.protect=async (req,res,next)=>{
    let token;

    if (req.headers.authorization && 
        req.headers.authorization.startsWith('Bearer'))
        {
      token=req.headers.authorization.split(' ')[1];


      if(!token){
          res.status(401).json({message:'not authors to access this route '});

      }
      try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
        req.user = await User.findById(decoded.id);
    
        next();
      } catch (err) {
       res.status(401).json({success:false,message:'Not authorized to access this route'});  
      }
    }

}


// Grant access to specific roles
exports.authorize = (...roles) => {
  return async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      res.status(403).json({message:`User role ${req.user.role} is not authorized to access this route`});
    }
   await next();
    //setTimeout(next, 1000);
  };
};
