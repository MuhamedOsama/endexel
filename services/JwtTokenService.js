const keys = require('../config/keys');
const jwt = require('jsonwebtoken');
const randToken = require('rand-token');
module.exports = {
   generateToken: (user) => {
      const payload = {
         _id: user._id,
         email: user.email,
         accountType: user.accountType,
         roles: user.roles,
         verified: user.verified,
      };
      const accessToken = jwt.sign(payload, keys.jwtSecretKey, {
         algorithm: 'HS256',
         expiresIn: '1h',
      });
      const decoded = jwt.decode(accessToken);
      return {
         account: { ...payload },
         accessToken,
      };
   },
};
