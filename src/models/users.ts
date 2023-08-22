import mongoose, { Document, Schema } from "mongoose";
import { genSalt, hash } from "bcrypt";
import { sign } from "jsonwebtoken";

interface User extends Document {
    username: string;
    email: string;
    password: string;
    createJWT: Function;
}

const UserSchema: Schema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
});

UserSchema.pre("save", async function () {
    const salt = await genSalt(10);
    this.password = await hash(this.password, salt);
});

UserSchema.methods.createJWT = function () {
    return sign({ userId: this._id, username: this.username }, "jwtSecret", { expiresIn: "7d" });
};

const UserModel = mongoose.model<User>("User", UserSchema);

export default UserModel;
