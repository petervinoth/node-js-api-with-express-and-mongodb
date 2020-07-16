const express=require('express');
const router=express.Router();
const {protect,authorize}=require('../middle/auth');
const{registerboot,fileupload,selectall,deleteBootcamp,getBootcamp,updateBootcamp}=require('../controller/bootcampcontroller');
const { route } = require('./review');



router.route('/viewall')
.get(protect,authorize('publisher','user','admin'),selectall);

router.route('/')
.post(protect,authorize('publisher'),registerboot);



router
  .route('/img/:id/photo')
  .put(protect, authorize('publisher', 'admin'), fileupload);


router.route('/boots/:id')
.get(getBootcamp);

router.route('/boot/:id')


.put(protect,authorize('publisher','admin'),updateBootcamp)
.delete(protect,authorize('publisher','admin'),deleteBootcamp);

module.exports=router;