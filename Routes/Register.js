const Register = require('../../task/Services/Register');

module.exports = (app) => {
  app.post('/api/v1/Register', Register.Register);
   app.post('/api/v1/uploadProductImages', Register.uploadProductImages);  
  app.post('/api/v1/login', Register.login);
  app.get('/api/v1/getlist', Register.getlist);
};

