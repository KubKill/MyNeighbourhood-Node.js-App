const express = require('express');
const router = express.Router();
const residentController = require('../controllers/residentController');

router.get('/', residentController.showResidentList);
router.get('/add', residentController.showAddResidentForm);
router.get('/details/:resId', residentController.showResidentDetails);
router.get('/update/:resId', residentController.showResidentUpdate);
router.get('/delete/:resId', residentController.deleteResident);
// router.get('/delete/:resId', residentController.showResidentDelete);

router.post('/add', residentController.addResident);
router.post('/update', residentController.updateResident);


module.exports = router;