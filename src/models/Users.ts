import mongoose, { Model } from 'mongoose';

export interface UserModel extends mongoose.Document{
    user: string,
    password: string,
}


const UserSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

export default module.exports = mongoose.model<UserModel>("User", UserSchema);