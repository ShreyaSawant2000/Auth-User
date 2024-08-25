const jwt = require('jsonwebtoken');
const { use } = require('../routes/authRoutes');


const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, 'secret_key', (err, user) => {
    if (err) return res.sendStatus(403);

    req.user = user;
    next();
  });
};

const checkRole = (roleIds) => {
  return (req, res, next) => {
    const userRoleId = req.user.roleId;
    if (roleIds.includes(userRoleId)) {
      next();
    } else {
      res.sendStatus(403);
    }
  };
};

module.exports = { authenticateToken, checkRole};
