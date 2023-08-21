import mongoose, { Document, Schema } from "mongoose";

interface User extends Document {
    username: string;
    email: string;
    password: string;
}

const UserSchema: Schema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
});

const UserModel = mongoose.model<User>("User", UserSchema);

export default UserModel;
