const jwt = require('jsonwebtoken');
const UserRepository = require('../repositories/user.repository');

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });

const cookieOptions = () => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000,
});

const AuthService = {
  register: async ({ username, email, password }) => {
    const existingEmail = await UserRepository.findByEmail(email);
    if (existingEmail) throw Object.assign(new Error('Email already in use'), { statusCode: 400 });

    const existingUsername = await UserRepository.findByUsername(username);
    if (existingUsername)
      throw Object.assign(new Error('Username already in use'), { statusCode: 400 });

    const user = await UserRepository.create({ username, email, password });
    const token = signToken(user._id);
    return { user, token };
  },

  login: async ({ email, password }) => {
    const user = await UserRepository.findByEmail(email);
    if (!user || !(await user.comparePassword(password))) {
      throw Object.assign(new Error('Invalid email or password'), { statusCode: 401 });
    }
    const token = signToken(user._id);
    return { user, token };
  },

  changePassword: async (userId, { oldPassword, newPassword }) => {
    const user = await UserRepository.findById(userId);
    if (!user) throw Object.assign(new Error('User not found'), { statusCode: 404 });

    const valid = await user.comparePassword(oldPassword);
    if (!valid)
      throw Object.assign(new Error('Old password is incorrect'), { statusCode: 401 });

    user.password = newPassword;
    await user.save();
    return true;
  },

  cookieOptions,
};

module.exports = AuthService;
