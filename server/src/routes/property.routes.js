const router = require('express').Router();
const propertyController = require('../controllers/property.controller');
const { protect } = require('../middleware/auth.middleware');
const { requireOwnership } = require('../middleware/ownership.middleware');
const {
  validateProperty,
  validateUpdateProperty,
} = require('../validators/property.validator');

router.get('/', propertyController.getAll);
router.get('/mine', protect, propertyController.getMine);
router.get('/:id', propertyController.getOne);
router.post('/', protect, validateProperty, propertyController.create);
router.put('/:id', protect, requireOwnership, validateUpdateProperty, propertyController.update);
router.delete('/:id', protect, requireOwnership, propertyController.remove);

module.exports = router;
