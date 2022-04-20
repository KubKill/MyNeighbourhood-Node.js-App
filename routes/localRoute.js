const express = require('express');
const router = express.Router();
const localController = require('../controllers/localController');

router.get('/', localController.showLocalList);
router.get('/add', localController.showAddLocalList);
router.get('/details/:locId', localController.showLocalDetails);
router.get('/update/:locId', localController.showLocalUpdate);
router.get('/delete/:locId', localController.deleteLocal);

router.post('/add', localController.addLocal);
router.post('/update', localController.updateLocal);
module.exports = router;