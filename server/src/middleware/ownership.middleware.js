const PropertyRepository = require('../repositories/property.repository');

const requireOwnership = async (req, res, next) => {
  try {
    const property = await PropertyRepository.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    if (property.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Forbidden — you do not own this listing' });
    }
    req.property = property;
    next();
  } catch {
    res.status(500).json({ message: 'Server error during ownership check' });
  }
};

module.exports = { requireOwnership };
