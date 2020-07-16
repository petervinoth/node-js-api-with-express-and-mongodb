const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

const UserSchema=mongoose.Schema({
    name:{
        type:String,
        required: [true, 'Please add a name']

	},
	email:{
        type:String,
        required: [true, 'Please add an email'],
        unique: true,
        match: [
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          'Please add a valid email'
        ]
	},
	password:{
        
        type: String,
        required: [true, 'Please add a password'],
        minlength: 6,
        select: false
	},
	role:{
        type: String,
        enum: ['user', 'publisher'],
        default: 'user'
      },
      resetPasswordToken: String,
      resetPasswordExpire: Date,
      createdAt: {
        type: Date,
        default: Date.now
      }

});


// encrypt password
UserSchema.pre('save', function (next) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) => {
            this.password = hash;
            this.saltSecret = salt;
            next();
        });
    });
});

//create jwt token
UserSchema.methods.generateJwt=function(){
  return jwt.sign({id:this._id},
    process.env.JWT_SECRET,
    {
        expiresIn: process.env.JWT_EXP
    });
}

//mathch password
UserSchema.methods.matchpass= async function(enteredpassword){
  return await bcrypt.compare(enteredpassword,this.password);
}



module.exports =mongoose.model('User',UserSchema);
