const express = require('express');
const router = express.Router();
const residentLocalController = require('../controllers/residentLocalController');

router.get('/', residentLocalController.showResidentLocalList);
router.get('/add', residentLocalController.showAddResidentLocalList);
router.get('/details/:resLocId', residentLocalController.showResidentLocalDetails);
router.get('/update/:resLocId', residentLocalController.showResidentLocalUpdate);
router.get('/delete/:resLocId', residentLocalController.deleteResidentLocal);

router.post('/add', residentLocalController.addResidentLocal);
router.post('/update', residentLocalController.updateResidentLocal);


module.exports = router;