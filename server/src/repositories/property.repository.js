const Property = require('../models/Property');

const PropertyRepository = {
  create: (data) => Property.create(data),

  findAll: (filter = {}, { page = 1, limit = 20 } = {}) => {
    const skip = (page - 1) * limit;
    return Property.find(filter)
      .populate('author', 'username name avatarUrl')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
  },

  countAll: (filter = {}) => Property.countDocuments(filter),

  findById: (id) => Property.findById(id).populate('author', 'username name avatarUrl'),

  findByAuthor: (authorId) =>
    Property.find({ author: authorId })
      .populate('author', 'username name avatarUrl')
      .sort({ createdAt: -1 }),

  updateById: (id, data) =>
    Property.findByIdAndUpdate(id, data, { new: true, runValidators: true }),

  deleteById: (id) => Property.findByIdAndDelete(id),

  buildFilter: ({ city, minPrice, maxPrice }) => {
    const filter = {};
    if (city) filter.city = { $regex: city, $options: 'i' };
    if (minPrice !== undefined || maxPrice !== undefined) {
      filter.price = {};
      if (minPrice !== undefined) filter.price.$gte = Number(minPrice);
      if (maxPrice !== undefined) filter.price.$lte = Number(maxPrice);
    }
    return filter;
  },
};

module.exports = PropertyRepository;
