const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
  // get token header
  const token = req.header('x-auth-token');

  // トークンが取得できているかチェック
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // トークンを確認する
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
