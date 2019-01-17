const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    email:{
       type: String,
       default: '',
    },
    password: {
        type: String,
        default: '',
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    signUpDate: {
        type: Date,
        default: Date.now(),
    },
    name: {
        type: String,
        default: '',
    },
    propic: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Media',
    },   
    posts: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Post',
    }, 
});

UserSchema.methods.generateHash = (password) => 
    bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);

UserSchema.methods.validPassword = function(password) {
  console.log(this.password);
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);