import mongoose, { Document, Schema, Model } from "mongoose";
import { genSalt, hash, compare } from "bcrypt";

const LIFETIME = process.env.JWT_LIFETIME;

enum UserRole {
    admin = "admin",
    user = "user",
}
const { admin, user } = UserRole;

interface User extends Document {
    username: string;
    email: string;
    role: UserRole;
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
    password: {
        type: String,
        required: [true, "Please provide password"],
        minLength: [6, "password must be at least 6 characters"],
    },

    role: {
        type: String,
        enum: [admin, user],
        default: user,
    },
});

UserSchema.pre("save", async function () {
    
    if (!this.isModified("password")) {
        return;
    }
    const salt = await genSalt(10);
    this.password = await hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (password: string) {
    const isMatch = await compare(password, this.password);
    return isMatch;
};

const UserModel: Model<User> = mongoose.model<User>("User", UserSchema);

export default UserModel;
