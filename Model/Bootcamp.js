const mongoose=require('mongoose');

const BootSchema=  mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: [true, 'Please add a course title']
      },
      description: {
        type: String,
        required: [true, 'Please add a description']
      },
      weeks: {
        type: String,
        required: [true, 'Please add number of weeks']
      },
      tuition: {
        type: Number,
        required: [true, 'Please add a tuition cost']
      },
      minimumSkill: {
        type: String,
        required: [true, 'Please add a minimum skill'],
        enum: ['beginner', 'intermediate', 'advanced']
      },
      photo: {
        type: String,
        default: 'no-photo.jpg'
      },
      phone: {
        type: String,
        maxlength: [20, 'Phone number can not be longer than 20 characters']
      },
      email: {
        type: String,
        match: [
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          'Please add a valid email'
        ]
      },
      createdAt: {
        type: Date,
        default: Date.now
      },
      

});
module.exports=mongoose.model('bootcamp',BootSchema);
