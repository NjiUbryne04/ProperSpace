const router = require('express').Router();
const userController = require('../controllers/user.controller');
const { protect } = require('../middleware/auth.middleware');
const { validateProfile } = require('../validators/property.validator');

router.get('/profile', protect, userController.getProfile);
router.put('/profile', protect, validateProfile, userController.updateProfile);

module.exports = router;
