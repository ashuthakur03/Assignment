const mongoose = require('mongoose');

const schema = mongoose.Schema;
const Register = new schema({
  Name: {
    type: String,
  },
  EmailAddress: {
    type: String,
  },

    Password: {
    type: String,
  }, 
   Imageupload: {
    type: String,
  },
  
},
 { timestamps: true });

module.exports = mongoose.model('Register', Register);
