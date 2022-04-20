const express = require('express');
const router = express.Router();

const resLocApiController = require('../../api/residentLocalAPI');

router.get('/', resLocApiController.getResidentLocal);
router.get('/:resLocId', resLocApiController.getResidentLocalById);
router.post('/', resLocApiController.createResidentLocal);
router.put('/:resLocId', resLocApiController.updateResidentLocal);
router.delete('/:resLocId', resLocApiController.deleteResidentLocal);

module.exports = router;