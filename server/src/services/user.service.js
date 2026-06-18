const UserRepository = require('../repositories/user.repository');

const UserService = {
  getProfile: async (userId) => {
    const user = await UserRepository.findById(userId);
    if (!user) throw Object.assign(new Error('User not found'), { statusCode: 404 });
    return user;
  },

  updateProfile: async (userId, { name, phone, avatarUrl }) => {
    const updates = {};
    if (name !== undefined) updates.name = name;
    if (phone !== undefined) updates.phone = phone;
    if (avatarUrl !== undefined) updates.avatarUrl = avatarUrl;

    const user = await UserRepository.updateById(userId, updates);
    if (!user) throw Object.assign(new Error('User not found'), { statusCode: 404 });
    return user;
  },
};

module.exports = UserService;
