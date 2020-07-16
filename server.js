const express=require('express');
const mongoose=require('mongoose');
//const dotenv=require('dotenv');
//const connectdb=require('./configuration/db');
//dotenv.config({path:'./config/configuration'});
const cookieparser=require('cookie-parser');
const fileupload=require('express-fileupload');
const path=require('path');
const app=express();
require('./Model/db');
require('./config/configu')


const auth=require('./router/log');
const boots=require('./router/boot');
const revi=require('./router/review');
const reentry=require('./router/auth');

app.use(express.json());
app.use(cookieparser());

//file upload
app.use(fileupload());

//set satic fol
app.use(express.static(path.join(__dirname,'public')));


//port 
const PORT=process.env.PORT || 5000;
app.listen(PORT,
    console.log('server on port 5000 ')
    );

//routes
app.use('/api/user',auth);
app.use('/api/boot',boots);
app.use('/api/review',revi);
app.use('/api/auth',reentry);
//app.use('/api/course/',auth);

//mongodb connection





