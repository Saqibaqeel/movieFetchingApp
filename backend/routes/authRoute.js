const router = require('express').Router();
const protected=require('../middleware/protected')

const {signUp,login,logout,check}=require('../controllers/authController');
const checkConnection=require('../middleware/checkConnection');


router.post('/signUp',checkConnection, signUp);
router.post('/login',checkConnection, login);
router.get('/logout',checkConnection, logout);



router.get('/check',protected,check)



module.exports=router;