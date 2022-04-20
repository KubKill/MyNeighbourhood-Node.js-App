const express = require('express');
const router = express.Router();

const resApiController = require('../../api/residentAPI');

router.get('/', resApiController.getResident);
router.get('/:resId', resApiController.getResidenById);
router.post('/', resApiController.createResident);
router.put('/:resId', resApiController.updateResident);
router.delete('/:resId', resApiController.deleteResident);

module.exports = router;