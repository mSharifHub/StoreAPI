import mongoose, { Document, Schema } from "mongoose";

//read only tuple so the values can not be changed
const ALLOWED_VENDORS = ["ebay", "amazon", "walmart"] as const;

// AllowedVendors type will be only of Allowed_vendors and the [number] allows index acess
type AllowedVendors = (typeof ALLOWED_VENDORS)[number];

// setting an interface and extend from Documents
interface Product extends Document {
    name: string;
    description: string;
    price: number;
    stock: number;
    categoty: string;
    createAt: Date;
    vendors: AllowedVendors;
}

//setting a scehma
const ProductScheme: Schema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    category: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    // setting vendors to be of only tyoe of ALLOWED_VENDORS
    vendors: {
        type: String,
        enum: {
            value: ALLOWED_VENDORS,
            message: `Vendor is not listed.Please select of allowed vendors:\n${ALLOWED_VENDORS.join(", ")}`,
            required: true,
        },
    },
});

const ProductModel = mongoose.model<Product>("Product", ProductScheme);

export default ProductModel;
