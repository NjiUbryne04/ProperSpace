const PropertyRepository = require('../repositories/property.repository');

const PropertyService = {
  getAll: async (query) => {
    const { city, minPrice, maxPrice, page = 1, limit = 20 } = query;
    const filter = PropertyRepository.buildFilter({ city, minPrice, maxPrice });
    const [properties, total] = await Promise.all([
      PropertyRepository.findAll(filter, { page: Number(page), limit: Number(limit) }),
      PropertyRepository.countAll(filter),
    ]);
    return { properties, total, page: Number(page), limit: Number(limit) };
  },

  getOne: async (id) => {
    const property = await PropertyRepository.findById(id);
    if (!property) throw Object.assign(new Error('Property not found'), { statusCode: 404 });
    return property;
  },

  getMine: (authorId) => PropertyRepository.findByAuthor(authorId),

  create: (data, authorId) => PropertyRepository.create({ ...data, author: authorId }),

  update: async (id, data) => {
    const property = await PropertyRepository.updateById(id, data);
    if (!property) throw Object.assign(new Error('Property not found'), { statusCode: 404 });
    return property;
  },

  remove: async (id) => {
    const property = await PropertyRepository.deleteById(id);
    if (!property) throw Object.assign(new Error('Property not found'), { statusCode: 404 });
    return property;
  },
};

module.exports = PropertyService;
