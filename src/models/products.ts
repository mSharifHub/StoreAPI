import mongoose, { Document, Schema } from "mongoose";

const ALLOWED_VENDORS = ["ebay", "amazon", "walmart"];
const ALLOWED_CATEGORIES = ["self-care", "electronics", "office-supply", "clothing"];

// setting an interface and extend from Documents
interface Product extends Document {
    name: string;
    description: string;
    price: number;
    stock: number;
    category: string;
    createAt: Date;
    vendors: string;
}

const ProductScheme: Schema = new Schema({
    name: { type: String, required: [true, "A name is required"], minlength: 3 },
    description: { type: String, required: [true, "A product description is required"] },
    price: { type: Number, required: [true, "A price is required"] },
    stock: { type: Number, required: [true, "A stock number is required"] },
    category: { type: ALLOWED_CATEGORIES, message: `Select from allowed categories\n${ALLOWED_CATEGORIES}` },
    createdAt: { type: Date, default: Date.now },
    vendors: { type: ALLOWED_VENDORS, message: `Select from allowed vendors\n${ALLOWED_VENDORS}` },
});

const ProductModel = mongoose.model<Product>("Product", ProductScheme);

export default ProductModel;
