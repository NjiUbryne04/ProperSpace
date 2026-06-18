const AuthService = require('../services/auth.service');

exports.register = async (req, res, next) => {
  try {
    const { user, token } = await AuthService.register(req.body);
    res.cookie('token', token, AuthService.cookieOptions());
    res.status(201).json({ user });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { user, token } = await AuthService.login(req.body);
    res.cookie('token', token, AuthService.cookieOptions());
    res.json({ user });
  } catch (err) {
    next(err);
  }
};

exports.logout = (_req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out' });
};

exports.me = (req, res) => {
  res.json({ user: req.user });
};

exports.changePassword = async (req, res, next) => {
  try {
    await AuthService.changePassword(req.user._id, req.body);
    res.clearCookie('token');
    res.json({ message: 'Password updated — please log in again' });
  } catch (err) {
    next(err);
  }
};
