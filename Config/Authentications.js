// eslint-disable-next-line import/no-extraneous-dependencies
const jwt = require('jsonwebtoken');
const apiResponse = require('../Components/apiresponse');
require('dotenv').config();


module.exports = {
  createToken: (_id, userName) => {
    const  secret  = "hgchgchgfcfhfchcfff4drfchgfchg6yhgfhgtfy";
    return jwt.sign({ userName, _id }, secret);
  },

  adminAuth: (req, res, next) => {
    const secret = "hgchgchgfcfhfchcfff4drfchgfchg6yhgfhgtfy";
    const token = req.headers['x-access-token'] || req.headers.authorization; // Express headers are auto converted to lowercase
    if (token) {
      jwt.verify(token, secret, (err, decoded) => {
        if (err) {
          return apiResponse.authenticationToken(res, 'Authentication Token Is Not Valid');
        }
      
          req.decoded = decoded;
          next();
      });
    } else {
      return apiResponse.authenticationToken(res, 'Authentication Token Is Not Supplied');
    }
  },
};
