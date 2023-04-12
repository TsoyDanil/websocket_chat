import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import { nanoid } from "nanoid";

const SALT_WORK_FACTOR = 10;    

const Scheme = mongoose.Schema;

const UserScheme = new Scheme({
    username: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: async value => {
                const user = await User.findOne({username: value});
                if(user) return false;
            },
            message: 'This user is already registered'
        }
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    }
});

UserScheme.pre('save', async function(next) {
    if(!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    const hash = await bcrypt.hash(this.password, salt);

    this.password = hash;

    next();
});

UserScheme.set('toJSON', {
    transform: (doc, ret, options) => {
        delete ret.password;
        return ret;
    }
});

UserScheme.methods.checkPassword = function(password) {
    return bcrypt.compare(password, this.password);
};

UserScheme.methods.generateToken = function() {
    this.token = nanoid();
};

const User = mongoose.model('User', UserScheme);

export default User;