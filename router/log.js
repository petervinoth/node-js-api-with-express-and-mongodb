const express=require('express');


const {getUser,updateUser,deleteUser,getall}=require('../controller/usercontroller');

const {protect,authorize}=require('../middle/auth');
const router = express.Router({ mergeParams: true });




router.route('/all')
.get(protect,authorize('admin'),getall);


router.route('/user/:id')
.get(protect,authorize('user','admin'),getUser)

.put(protect,authorize('user','admin'),updateUser)
.delete(protect,authorize('admin'),deleteUser);


module.exports=router;