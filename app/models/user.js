const mongoose = require('mongoose');
const {Schema} = mongoose;

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        validate: {
            validator: async function(email) {
                const user = await this.constructor.findOne({ email });
                if(user) {
                    if(this.id === user.id) {
                        return true;
                    }
                    return false;
                }
                return true;
            },
            message: 'The specified email address is already in use.'
        }
    },
    password: {
        type: String,
    },
    salt: {
        type: String,
    },
})

const UserModel = mongoose.model('User', UserSchema)
module.exports = UserModel;