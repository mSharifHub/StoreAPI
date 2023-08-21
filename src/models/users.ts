import mongoose, { Document, Schema } from "mongoose";

interface User extends Document {
    name: string;
    email: string;
    password: string;
}

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^([a-zA-Z0-9]*[^a-zA-Z0-9]){2,}[a-zA-Z0-9]*$/;

const UserSchema: Schema = new Schema({
    name: { type: String, required: [true, "A name is required"], minlength: 3, maxlength: 50 },
    email: {
        type: String,
        required: [true, "A email is required"],
        match: [emailRegex, "Please provide a valid email format"],
        minlength: 3,
        maxlength: 50,
    },
    password: {
        type: String,
        required: [true, "A password is required"],
        match: [passwordRegex, "Password must contain at least 2 special characters"],
        minlength: 6,
        maxlength: 12,
    },
});

const UserModel = mongoose.model<User>("User", UserSchema);

export default UserSchema;
