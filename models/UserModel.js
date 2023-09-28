const mongoose = require('mongoose');
const Retailer = require('./retailerModel'); 
const Client = require('./clientModel'); 




const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  role: {
    type: String,
    enum: ['Client', 'Retailer' , 'Admin'],
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  lastLogin: Date,
});

userSchema.pre('remove', async function (next) {
  const userId = this._id;

  try {
    await Retailer.findOneAndDelete({ userID: userId });
    await Client.findOneAndDelete({ userID: userId });
    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
