var express = require('express');
var router = express.Router();
const UserController = require('../controllers/userController');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { mode: '', navLocation: 'main', submitPath: '/login', title2: 'Login', title: 'Moja Spółdzielnia', img: 'images/somsiedzi.jpg' });
});
router.post('/login', UserController.login);
router.post('/login-edit', UserController.loginEdit);
router.get('/logout', UserController.logout);
router.get('/login-edit', UserController.viewEditLogin);

module.exports = router;
