const User = require('../models/User');

const UserRepository = {
  create: (data) => User.create(data),
  findById: (id) => User.findById(id),
  findByEmail: (email) => User.findOne({ email }),
  findByUsername: (username) => User.findOne({ username }),
  updateById: (id, data) => User.findByIdAndUpdate(id, data, { new: true, runValidators: true }),
  findByIdWithPassword: (id) => User.findById(id).select('+password'),
};

module.exports = UserRepository;
