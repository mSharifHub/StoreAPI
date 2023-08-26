import mongoose, { Document, Schema, Model } from "mongoose";
import { genSalt, hash, compare } from "bcrypt";
import { sign } from "jsonwebtoken";
const JWT = process.env.JWT_SECRET;
const LIFETIME = process.env.JWT_LIFETIME;

interface User extends Document {
    username: string;
    email: string;
    password: string;
    createJWT: Function;
    comparePassword: Function;
}

const UserSchema: Schema<User> = new Schema({
    username: { type: String, required: [true, "Please provide user name"], unique: true },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, "Please provide a valid email format"],
        unique: true,
    },
    password: { type: String, required: [true, "Please provide password"], minLength: [6,'password must be at least 6 characters'] },
});

// UserSchema.pre("save", async function () {
//     const salt = await genSalt(10);
//     this.password = await hash(this.password, salt);
// });

// UserSchema.methods.createJWT = function () {
//     return sign({ userId: this._id, username: this.username }, JWT!, { expiresIn: LIFETIME });
// };

// UserSchema.methods.comparePassword = async function (password: string | any) {
//     const isMatch = await compare(password, this.password);
//     return isMatch;
// };

const UserModel: Model<User> = mongoose.model<User>("User", UserSchema);

export default UserModel;
