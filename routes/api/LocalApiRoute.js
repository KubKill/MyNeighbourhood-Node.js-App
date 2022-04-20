const express = require('express');
const router = express.Router();

const locApiController = require('../../api/localAPI');

router.get('/', locApiController.getLocal);
router.get('/:locId', locApiController.getLocalById);
router.post('/', locApiController.createLocal);
router.put('/:locId', locApiController.updateLocal);
router.delete('/:locId', locApiController.deleteLocal);

module.exports = router;