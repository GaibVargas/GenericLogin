const jwt = require('jsonwebtoken');
const User = require('../models/User');
const RefreshToken = require('../models/RefreshToken');

module.exports = {
  async login(req, res) {
    const { login, password } = req.body;

    const user = await User.findOne({ login }).select('+password');

    if(!user) return res.status(400).json({ error: 'User not found' });

    if(!(await user.compareHash(password))) {
      return res.status(400).json({ error: 'Invalid password' });
    }

    const refreshToken = jwt.sign({ id: user._id }, 'secretKeyRefreshToken');

    await RefreshToken.create({ token: refreshToken });

    return res.json({
      user,
      accessToken: user.generateToken(),
      refreshToken
    });
  },

  async create(req, res) {
    const { name, login, password } = req.body;

    try {
      const user = await User.create({ name, login, password });

      const refreshToken = jwt.sign({ id: user._id }, 'secretKeyRefreshToken');

      await RefreshToken.create({ token: refreshToken });

      return res.json({
        user, 
        accessToken: user.generateToken(),
        refreshToken,
      });
    } catch(error) {
      if(error.code === 11000) {
        return res.status(400).json({ error: 'Login already exists' });
      }
      return res.json(error);
    }
  },

  async index(req, res) {
    const { userId } = req;

    const user = await User.findById(userId);

    return res.json(user);
  },

  async update(req, res) {
    const { userId } = req;

    if(req.body.password) return res.status(400).json({ error: 'Invalid modification' });

    const user = await User.findByIdAndUpdate({_id: userId}, req.body, { new: true });

    return res.json({ user })
  },

  async delete(req, res) {
    const { userId } = req;

    try {
      await User.findByIdAndDelete(userId);

      return res.status(200)
    } catch(error) {
      return res.status(400).json(error);
    }
  },

  async refreshToken(req, res) {
    const refreshTokenFromUser = req.body.refreshToken;
    const {userId} = req.body;

    if(!(await RefreshToken.findOne({ token: refreshTokenFromUser }))) 
      return res.status(401).json({ error: 'Invalid action' });

    try {
      const user = await User.findById(userId);

      if(!user) return res.status(400).json({ errror: 'User not found' });

      return res.json({
        accessToken: user.generateToken(),
        refreshToken: refreshTokenFromUser,
      });
    } catch(error) {
      return res.status(400).json(error);
    }   
  },

  async logout(req, res) {
    const { refreshToken } = req.body;

    await RefreshToken.findOneAndDelete({ token: refreshToken });

    return res.status(200).json({ message: 'Success' });
  }
}