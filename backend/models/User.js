const {mongoose, Schema, model} = require('mongoose');

const userSchema = new Schema({
    uid: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    mobile: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    tokens: [
        {
          token: {
            type: String,
            required: true,
          }
        }
    ]
}, { timestamps: true });

userSchema.methods.verifyPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;
