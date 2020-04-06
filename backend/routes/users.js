const router =require('express').Router();
const UserController =require('../controllers/UserController');
const { authentication } =require('../middleware/authentication')
router.get('/info', authentication, UserController.getInfo);
router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/logout',authentication, UserController.logout);

module.exports=router