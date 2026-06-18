const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const { protect } = require('../middleware/auth.middleware');
const {
  validateRegister,
  validateLogin,
  validateChangePassword,
} = require('../validators/auth.validator');

router.post('/register', validateRegister, authController.register);
router.post('/login', validateLogin, authController.login);
router.post('/logout', protect, authController.logout);
router.get('/me', protect, authController.me);
router.put('/change-password', protect, validateChangePassword, authController.changePassword);

module.exports = router;
