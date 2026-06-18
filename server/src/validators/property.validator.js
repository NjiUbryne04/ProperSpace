const Joi = require('joi');

const propertySchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(10).required(),
  price: Joi.number().positive().required(),
  city: Joi.string().required(),
  country: Joi.string().required(),
  propertyType: Joi.string().valid('Apartment', 'House', 'Studio').required(),
  imageUrls: Joi.array().items(Joi.string().uri()).default([]),
});

const updatePropertySchema = propertySchema.fork(
  ['title', 'description', 'price', 'city', 'country', 'propertyType'],
  (field) => field.optional()
);

const profileSchema = Joi.object({
  name: Joi.string().max(50).allow(''),
  phone: Joi.string().max(20).allow(''),
  avatarUrl: Joi.string().uri().allow(''),
});

const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      message: 'Validation error',
      details: error.details.map((d) => d.message),
    });
  }
  next();
};

module.exports = {
  validateProperty: validate(propertySchema),
  validateUpdateProperty: validate(updatePropertySchema),
  validateProfile: validate(profileSchema),
};
