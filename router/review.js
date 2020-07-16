const express=require('express');
const router=express.Router();


const {getReview,getReviews,updateReview,addReview,deleteReview}=require('../controller/review');

const {protect,authorize}=require('../middle/auth');


router.route('/allreview')
.get(getReview,protect,authorize('admin','user','publisher'));

router.route('/:id/add')
.post(protect,authorize('user'),addReview);

//router.post('/:id/add',protect,authorize('user','admin'),addreview);

router.route('/review/:id')
.get(protect,authorize('user','admin'),getReviews)
.put(protect,authorize('user','admin'),updateReview)
.delete(protect,authorize('user','admin'),deleteReview);



module.exports=router;