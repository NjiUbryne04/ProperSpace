const UserService = require('../services/user.service');

exports.getProfile = async (req, res, next) => {
  try {
    const user = await UserService.getProfile(req.user._id);
    res.json({ user });
  } catch (err) {
    next(err);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const user = await UserService.updateProfile(req.user._id, req.body);
    res.json({ user });
  } catch (err) {
    next(err);
  }
};
