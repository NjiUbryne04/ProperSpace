const PropertyService = require('../services/property.service');

exports.getAll = async (req, res, next) => {
  try {
    const result = await PropertyService.getAll(req.query);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.getOne = async (req, res, next) => {
  try {
    const property = await PropertyService.getOne(req.params.id);
    res.json({ property });
  } catch (err) {
    next(err);
  }
};

exports.getMine = async (req, res, next) => {
  try {
    const properties = await PropertyService.getMine(req.user._id);
    res.json({ properties });
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const property = await PropertyService.create(req.body, req.user._id);
    res.status(201).json({ property });
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const property = await PropertyService.update(req.params.id, req.body);
    res.json({ property });
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    await PropertyService.remove(req.params.id);
    res.json({ message: 'Property deleted' });
  } catch (err) {
    next(err);
  }
};
