const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Please fill all fields']
  },
  email: {
    type: String,
    required: [true, 'email is required'],
    unique: [true, 'email already been used'],
    lowercase: true,
    validate: [isEmail, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Enter your password' ],
    minlength: [6, 'Minimum password length is 6 characters']
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  updatedAt: {
    type: Date,
    default: Date.now()
  }

});

//Hash the password with hooks(pre, post) before saving it to the database
UserSchema.pre('save', async function (next) {
  try {
      const salt = await bcrypt.genSalt(10); //Pass the number of salt rounds (e.g., 10)
      this.password = await bcrypt.hash(this.password, salt);
      next();
  } catch (error) {
      next(error); // Pass any error to the next middleware
  }
});

// static method to logon user
UserSchema.statics.login = async function(email, password){
  const user = await this.findOne( { email } )
  if(user){
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user
    }
    throw Error("incorrect password")
  }
  throw Error('incorrect email')
}
module.exports = mongoose.model('User', UserSchema);
